import * as React from 'react';
import { View, TextInput, TouchableOpacity, Text,  Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddProductScreen = ({ route, navigation }) => {
  const [name, setName] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [price, setPrice] = React.useState('');
  const productToEdit = route.params?.product;

  React.useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setQuantity(String(productToEdit.quantity));
      setPrice(productToEdit.price);
    }
  }, [productToEdit]);

  const saveProduct = async () => {
    if (!name || !quantity || !price) {  // Adicionando a verificação do preço
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      const product = { 
        name, 
        quantity: parseInt(quantity), 
        price: parseFloat(price) // Adicionando o preço ao produto
      };
      const storedProducts = await AsyncStorage.getItem('products');
      let products = storedProducts ? JSON.parse(storedProducts) : [];
  
      if (productToEdit) {
        // Remove o produto antigo da lista
        products = products.filter(product => product.name !== productToEdit.name);
      }
  
      // Adiciona o produto atualizado ou novo à lista
      products.push(product);
  
      await AsyncStorage.setItem('products', JSON.stringify(products));
      Alert.alert('Produto salvo com sucesso!');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro ao salvar o produto.');
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
        
      
      <TouchableOpacity
        style={styles.button}
        onPress={saveProduct}
      >
        <Text style={styles.buttonText}>Salvar Produto</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#ccffcc', // Cor de fundo do botão
    padding: 10,
    marginBottom: 4,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000', // Cor do texto
    fontSize: 16,
    fontWeight: '500',       
  }
});
