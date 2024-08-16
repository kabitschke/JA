import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

  const AddProductScreen = ({ navigation, route }) => {
  const [name, setName] = useState(route.params?.product?.name || '');
  const [quantity, setQuantity] = useState(route.params?.product?.quantity || '');
  const [price, setPrice] = useState(route.params?.product?.price || '');

  const saveProduct = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem('products');
      const products = storedProducts ? JSON.parse(storedProducts) : [];

      const updatedProducts = products.filter(product => product.name !== name);
      updatedProducts.push({ name, quantity, price });

      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
      navigation.goBack();
    } catch (e) {
      console.error("Erro ao salvar o produto.", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nome do Produto:</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />
      
      <Text>Quantidade:</Text>
      <TextInput value={quantity} onChangeText={setQuantity} style={styles.input} keyboardType="numeric" />
      
      <Text>Preço:</Text>
      <TextInput value={price} onChangeText={setPrice} style={styles.input} keyboardType="numeric" />
      
      <Button title="Salvar Produto" onPress={saveProduct} />
    </View>
  );
}

export default AddProductScreen;

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
});
