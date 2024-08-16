import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

  const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const storedProducts = await AsyncStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchProducts);

    return unsubscribe;
  }, [navigation]);

  const confirmDeleteProduct = (productName) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza de que deseja excluir o produto "${productName}"?`,
      [
        {
          text: "Não",
          onPress: () => console.log("Exclusão cancelada"),
          style: "cancel"
        },
        { text: "Sim", onPress: () => deleteProduct(productName) }
      ]
    );
  };

  const deleteProduct = async (productName) => {
    try {
      const updatedProducts = products.filter(product => product.name !== productName);
      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      Alert.alert("Produto excluído com sucesso!");
    } catch (e) {
      Alert.alert("Erro ao excluir o produto.");
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>{item.name} - {item.quantity}</Text>
      <View style={styles.productContainer}>
        <Button title="Editar" color="#50b63f" onPress={() => navigation.navigate('AddProduct', { product: item })} />
        <Button title="Excluir" color="red" onPress={() => confirmDeleteProduct(item.name)} />
      </View>  
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.name}
        renderItem={renderProduct}
      />
    </View>
  );
}

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
  },
});
