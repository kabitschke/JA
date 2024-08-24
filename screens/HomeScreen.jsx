import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Alert } from 'react-native';
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
     
      <Image
        source={require('../assets/trailer.jpg')}
        resizeMode="cover"
        style={styles.hero}
      />

      <Text style={styles.title}>Bem-vindo ao Sistema de Controle de Estoque</Text>
      <Text style={styles.totalSales}>Total Vendido: R$ {totalSales.toFixed(2)}</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddProduct')}
      >
        <Text style={styles.buttonText}>Adicionar Produto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProductList')}
      >
        <Text style={styles.buttonText}>Listar Produtos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SalesRecord')}
      >
        <Text style={styles.buttonText}>Registrar Venda</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonAlert}
        onPress={handleResetSales}
      >
        <Text style={styles.buttonText}>Zerar Vendas</Text>
      </TouchableOpacity>
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
  hero: {
    width: '100%',
    height: 120,
    marginBottom: 20,
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
    padding: 10,
  },
  button: {
    backgroundColor: '#ccffcc', 
    padding: 10,
    marginBottom: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000', 
    fontWeight: '500',
  },
  buttonAlert: {
    backgroundColor: '#ff9999', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  }
});
