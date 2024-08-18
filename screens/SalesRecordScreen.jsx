import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

  const SalesRecordScreen = ({ navigation }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);

  // Carrega os produtos do AsyncStorage quando o componente é montado
  useEffect(() => {
    const loadProducts = async () => {
      const storedProducts = await AsyncStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    };
    loadProducts();
  }, []);

  const addProductToOrder = () => {
    if (!selectedProduct || !quantity) {
      Alert.alert('Erro', 'Por favor, selecione um produto e insira a quantidade.');
      return;
    }
  
    // Busca o produto selecionado na lista de produtos
    const product = products.find(p => p.name === selectedProduct);
    if (!product) {
      Alert.alert('Erro', 'Produto não encontrado.');
      return;
    }
  
    // Verifica se a quantidade solicitada está disponível no estoque
    if (parseInt(quantity) > product.quantity) {
      Alert.alert('Erro', `Quantidade solicitada para ${product.name} excede o estoque disponível.`);
      return;
    }
  
    // Verifica se o produto já foi adicionado ao pedido
    const existingProduct = order.find(p => p.name === selectedProduct);
    if (existingProduct) {
      Alert.alert('Erro', 'Produto já adicionado ao pedido. Altere a quantidade se necessário.');
      return;
    }
  
    // Adiciona o produto ao pedido
    setOrder([...order, { name: selectedProduct, quantity: parseInt(quantity), price: product.price }]);
    setSelectedProduct('');
    setQuantity('');
  };
  

  const registerSale = async () => {
    if (order.length === 0) {
      Alert.alert('Erro', 'Nenhum produto adicionado ao pedido.');
      return;
    }

    let totalSale = 0;
    const updatedProducts = products.map(p => {
      const orderedProduct = order.find(op => op.name === p.name);
      if (orderedProduct) {
        totalSale += orderedProduct.price * orderedProduct.quantity;
        return {
          ...p,
          quantity: p.quantity - orderedProduct.quantity
        };
      }
      return p;
    });

    await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));

    const storedTotalSales = await AsyncStorage.getItem('totalSales');
    const newTotalSales = storedTotalSales ? parseFloat(storedTotalSales) + totalSale : totalSale;

    await AsyncStorage.setItem('totalSales', newTotalSales.toString());

    Alert.alert('Sucesso', `Venda registrada! Total vendido: R$ ${totalSale.toFixed(2)}`);
    setOrder([]);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text>Registrar Venda</Text>
      <Picker
        selectedValue={selectedProduct}
        onValueChange={(itemValue) => setSelectedProduct(itemValue)}>
        <Picker.Item label="Selecione um produto" value="" />
        {products.map((product, index) => (
          <Picker.Item key={index} label={product.name} value={product.name} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
     

      <TouchableOpacity
          style={styles.button}
          onPress={addProductToOrder}
        >
        <Text style={styles.buttonText}>Adicionar Produto ao Pedido</Text>
     </TouchableOpacity>

      <View style={styles.orderList}>
        {order.map((item, index) => (
          <Text key={index}>{item.name} - Quantidade: {item.quantity}</Text>
        ))}
      </View>      

      <TouchableOpacity
          style={styles.button}
          onPress={registerSale}
        >
        <Text style={styles.buttonText}>Registrar Venda</Text>
    </TouchableOpacity>
    </View>
  );
}

export default SalesRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  orderList: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#ccffcc', // Cor de fundo do botão
    padding: 10,   
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000', // Cor do texto
    fontSize: 16,
    fontWeight: '500',
  },
});
