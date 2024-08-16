import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

  const HomeScreen = ({ navigation }) => {
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchTotalSales = async () => {
      const storedTotalSales = await AsyncStorage.getItem('totalSales');
      if (storedTotalSales) {
        setTotalSales(parseFloat(storedTotalSales));
      }
    };

    fetchTotalSales();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Sistema de Controle de Estoque</Text>
      <Text style={styles.totalSales}>Total Vendido: R$ {totalSales.toFixed(2)}</Text>
      
      <Button
        title="Adicionar Produto"
        onPress={() => navigation.navigate('AddProduct')}
      />
      <Button
        title="Listar Produtos"
        onPress={() => navigation.navigate('ProductList')}
      />
      <Button
        title="Registrar Venda"
        onPress={() => navigation.navigate('SalesRecord')}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  totalSales: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
