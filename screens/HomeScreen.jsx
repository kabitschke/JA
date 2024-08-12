import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  
  return (
    <View>
      <Button title="Adicionar Produto" onPress={() => navigation.navigate('AddProduct')} />
      <Button title="Lista de Produtos" onPress={() => navigation.navigate('ProductList')} />
      <Button title="Registrar Venda" onPress={() => navigation.navigate('SalesRecord')} />
    </View>
  );
};

export default HomeScreen;
