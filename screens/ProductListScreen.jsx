import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

  const ProductListScreen = () => {
  const [products, setProducts] = React.useState([]);

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

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>Quantidade: {item.quantity}</Text>
          </View>
        )}
      />
    </View>
  );
}


export default ProductListScreen;
