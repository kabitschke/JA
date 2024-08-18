import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={styles.productName}>{item.name}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.productName}>{item.quantity}</Text>
      </View>
      <View style={styles.cell}>
        <TouchableOpacity style={styles.buttonEdit} onPress={() => navigation.navigate('AddProduct', { product: item })}>
          <Icon name="pencil" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.cell}>
        <TouchableOpacity style={styles.buttonRemove} onPress={() => confirmDeleteProduct(item.name)}>
          <Icon name="trash" size={20} color="#ffffff" />
        </TouchableOpacity>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
  },
  buttonRemove: {
    backgroundColor: '#ff9999',
    padding: 10,
    borderRadius: 5,
  },
  buttonEdit: {
    backgroundColor: '#ccffcc', 
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
