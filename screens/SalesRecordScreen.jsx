import * as React from 'react';
import { View, Button, TextInput, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';


  const  SalesRecordScreen = ({ navigation }) => {
  const [selectedProduct, setSelectedProduct] = React.useState('');
  const [quantitySold, setQuantitySold] = React.useState('');
  const [products, setProducts] = React.useState([]);

  // Carregar produtos do AsyncStorage
  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem('products');
        const products = storedProducts ? JSON.parse(storedProducts) : [];
        setProducts(products);
      } catch (e) {
        console.error('Failed to load products', e);
      }
    };

    loadProducts();
  }, []);

  const registerSale = async () => {
    if (!selectedProduct || quantitySold === '') {
      Alert.alert('Por favor, selecione um produto e insira a quantidade vendida.');
      return;
    }

    const productIndex = products.findIndex(product => product.name === selectedProduct);
    if (productIndex === -1) {
      Alert.alert('Produto não encontrado.');
      return;
    }

    const selectedProductData = products[productIndex];
    const newQuantity = selectedProductData.quantity - parseInt(quantitySold);

    if (newQuantity < 0) {
      Alert.alert('Quantidade insuficiente em estoque.');
      return;
    }

    // Atualiza o produto com a nova quantidade
    const updatedProducts = [...products];
    updatedProducts[productIndex] = { ...selectedProductData, quantity: newQuantity };

    // Salva os produtos atualizados no AsyncStorage
    try {
      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
      Alert.alert('Venda registrada com sucesso!');
      navigation.goBack(); // Navega de volta à tela anterior
    } catch (e) {
      Alert.alert('Erro ao registrar venda.');
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedProduct}
        onValueChange={(itemValue) => setSelectedProduct(itemValue)}
      >
        <Picker.Item label="Selecione um produto" value="" />
        {products.map((product, index) => (
          <Picker.Item key={index} label={product.name} value={product.name} />
        ))}
      </Picker>
      <TextInput
        placeholder="Quantidade Vendida"
        value={quantitySold}
        onChangeText={setQuantitySold}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Registrar Venda" onPress={registerSale} />
    </View>
  );
}
export default SalesRecordScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
