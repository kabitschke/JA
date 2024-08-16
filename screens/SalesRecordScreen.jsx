import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

  const SalesRecordScreen = ({ navigation }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const storedProducts = await AsyncStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    };

    fetchProducts();
  }, []);

  const registerSale = async () => {
    const product = products.find(prod => prod.name === selectedProduct);
    if (product && quantity) {
      const newQuantity = product.quantity - parseInt(quantity);
      const updatedProducts = products.map(prod => 
        prod.name === selectedProduct ? { ...prod, quantity: newQuantity } : prod
      );

      const saleValue = parseFloat(product.price) * parseInt(quantity);
      const newTotalSales = totalSales + saleValue;

      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      setTotalSales(newTotalSales);
      await AsyncStorage.setItem('totalSales', JSON.stringify(newTotalSales));

      navigation.goBack();
    } else {
      alert("Por favor, selecione um produto e insira uma quantidade válida.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Produto:</Text>
      <Picker selectedValue={selectedProduct} onValueChange={itemValue => setSelectedProduct(itemValue)}>
        {products.map(product => (
          <Picker.Item key={product.name} label={product.name} value={product.name} />
        ))}
      </Picker>

      <Text>Quantidade:</Text>
      <TextInput value={quantity} onChangeText={setQuantity} style={styles.input} keyboardType="numeric" />
      
      <Button title="Registrar Venda" onPress={registerSale} />

      <View style={styles.salesContainer}>
        <Text>Total Vendido: R$ {totalSales.toFixed(2)}</Text>
      </View>
    </View>
  );
}

export default SalesRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
  salesContainer: {
    marginTop: 20,
  },
});
