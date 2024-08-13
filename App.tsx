import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import AddProductScreen from './screens/AddProductScreen';
import ProductListScreen from './screens/ProductListScreen';
import SalesRecordScreen from './screens/SalesRecordScreen';

const Stack = createStackNavigator();



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"

      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'JA Lanches' }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProductScreen}
          options={{ title: 'Adicionar Produto' }}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{ title: 'Lista de Produtos' }}
        />
        <Stack.Screen
          name="SalesRecord"
          component={SalesRecordScreen}
          options={{ title: 'Registro de Vendas' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
