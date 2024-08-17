import React, { useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [totalSales, setTotalSales] = useState(0);

  const fetchTotalSales = useCallback(async () => {
    const storedTotalSales = await AsyncStorage.getItem('totalSales');
    if (storedTotalSales) {
      setTotalSales(parseFloat(storedTotalSales));
    }
  }, []);

  const handleResetSales = async () => {
    Alert.alert(
      'Confirmar',
      'Você tem certeza que deseja zerar as vendas?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Zerar',
          onPress: async () => {
            await AsyncStorage.setItem('totalSales', '0');
            setTotalSales(0);
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  useFocusEffect(
    useCallback(() => {
      fetchTotalSales();
    }, [fetchTotalSales])
  );

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
      <Button
        title="Zerar Vendas"
        onPress={handleResetSales}
        color="red" // Optional: Makes the button color red to indicate it's a destructive action
      />
    </View>
  );
};

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
