import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

  const AddProductScreen = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const productToEdit = route.params?.product;

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setQuantity(String(productToEdit.quantity));
    }
  }, [productToEdit]);

  const saveProduct = async () => {
    if (!name || !quantity) {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const storedProducts = await AsyncStorage.getItem('products');
      let products = storedProducts ? JSON.parse(storedProducts) : [];

      if (productToEdit) {
        // Remove o produto antigo da lista
        products = products.filter(product => product.name !== productToEdit.name);
      }

      // Adiciona o produto atualizado ou novo à lista
      products.push({ name, quantity: parseInt(quantity) });

      await AsyncStorage.setItem('products', JSON.stringify(products));
      Alert.alert('Produto salvo com sucesso!');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro ao salvar o produto.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome do Produto"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Salvar" onPress={saveProduct} />
    </View>
  );
}

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
