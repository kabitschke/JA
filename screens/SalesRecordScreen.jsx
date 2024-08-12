import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const SalesRecordScreen = ({ navigation }) => {
  const [productName, setProductName] = useState('');
  const [quantitySold, setQuantitySold] = useState('');

  const recordSale = () => {
    // Lógica para registrar a venda e atualizar o estoque
    navigation.goBack();
  };

  return (
    <View>
      <TextInput placeholder="Nome do Produto" value={productName} onChangeText={setProductName} />
      <TextInput placeholder="Quantidade Vendida" value={quantitySold} onChangeText={setQuantitySold} keyboardType="numeric" />
      <Button title="Registrar Venda" onPress={recordSale} />
    </View>
  );
};

export default SalesRecordScreen;
