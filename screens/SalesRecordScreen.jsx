import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

  const SalesRecordScreen = ({ navigation }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState([]);

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

  const registerSale = async () => {
    if (!selectedProduct || !quantity) {
      Alert.alert('Erro', 'Por favor, selecione um produto e insira a quantidade.');
      return;
    }

    // Encontra o produto selecionado
    const product = products.find(p => p.name === selectedProduct);

    if (!product) {
      Alert.alert('Erro', 'Produto não encontrado.');
      return;
    }

    const totalSale = product.price * parseInt(quantity);

    // Deduz a quantidade do estoque
    const updatedProducts = products.map(p => {
      if (p.name === selectedProduct) {
        return {
          ...p,
          quantity: p.quantity - parseInt(quantity)
        };
      }
      return p;
    });

    await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));

    // Recupera as vendas totais existentes e atualiza
    const storedTotalSales = await AsyncStorage.getItem('totalSales');
    const newTotalSales = storedTotalSales ? parseFloat(storedTotalSales) + totalSale : totalSale;

    await AsyncStorage.setItem('totalSales', newTotalSales.toString());

    Alert.alert('Sucesso', `Venda registrada! Total vendido: R$ ${totalSale.toFixed(2)}`);
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
      <Button title="Registrar Venda" onPress={registerSale} />
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
});
