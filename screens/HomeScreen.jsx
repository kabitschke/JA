import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
         
      <Pressable style={styles.btn} onPress={() => navigation.navigate('AddProduct')}>
        <Text style={styles.btnText}>Adicionar Produto</Text>
      </Pressable>

      <Pressable style={styles.btn} onPress={() => navigation.navigate('ProductList')}>
        <Text style={styles.btnText}>Lista de Produtos</Text>
      </Pressable>

      <Pressable style={styles.btn} onPress={() => navigation.navigate('SalesRecord')}>
        <Text style={styles.btnText}>Registrar Venda</Text>
      </Pressable>

     
    
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f5e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 200,
    height: 40,
    marginBottom: 10,
    backgroundColor: '#50b63f',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'

  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16

  }
});
export default HomeScreen;
