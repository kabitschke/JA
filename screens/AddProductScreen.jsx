import * as React from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

  const  AddProductScreen = ({ navigation }) => {
  const [productName, setProductName] = React.useState('');
  const [productQuantity, setProductQuantity] = React.useState('');

  const addProduct = async () => {
    if (productName === '' || productQuantity === '') {
      Alert.alert('Por favor preencha todos os campos.');
      return;
    }

    try {
      const product = { name: productName, quantity: parseInt(productQuantity) };
      const storedProducts = await AsyncStorage.getItem('products');
      const products = storedProducts ? JSON.parse(storedProducts) : [];
      products.push(product);
      await AsyncStorage.setItem('products', JSON.stringify(products));
      Alert.alert('Produto adicionado com sucesso.');
      navigation.goBack(); // Navega de volta à lista de produtos
    } catch (e) {
      Alert.alert('Falha ao salvar o produto');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nome"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        placeholder="Quantidade"
        value={productQuantity}
        onChangeText={setProductQuantity}
        keyboardType="numeric"
      />
      <Button title="Adicionar Produto" onPress={addProduct} />
    </View>
  );
}


export default AddProductScreen;
