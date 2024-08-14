import * as React from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

  const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = React.useState([]);

  

  // Carregar produtos do AsyncStorage
  useFocusEffect(
    React.useCallback(() => {
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
    }, [])
  );

  const deleteProduct = async (productName) => {
    const updatedProducts = products.filter(product => product.name !== productName);

    try {
      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      Alert.alert('Produto excluído com sucesso!');
    } catch (e) {
      Alert.alert('Erro ao excluir produto.');
    }
  };

  const editProduct = (product) => {
    navigation.navigate('AddProduct', { product });
  };

  

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text>{item.name} - {item.quantity} unidades</Text>
      <View style={styles.buttonContainer}>
        <Button title="Editar" onPress={() => editProduct(item)} />
        <Button title="Excluir" onPress={() => deleteProduct(item.name)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </View>
  );
}

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 150,
  },
});
