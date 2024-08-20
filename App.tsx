import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddProductScreen from './screens/AddProductScreen';
import ProductListScreen from './screens/ProductListScreen';
import SalesRecordScreen from './screens/SalesRecordScreen';
import { StyleSheet, StatusBar, View } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'JA Lanches',
              headerStyle: { backgroundColor: '#ccffcc' },
              headerTintColor: '#000',
              headerTitleStyle: { fontWeight: '400' },
              headerTitleAlign: 'center'
            }}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={{
              title: 'Adicionar Produto',
              headerStyle: { backgroundColor: '#ccffcc' },
              headerTintColor: '#000',
              headerTitleStyle: { fontWeight: '400' },
            }}
          />
          <Stack.Screen
            name="ProductList"
            component={ProductListScreen}
            options={{
              title: 'Lista de Produtos',
              headerStyle: { backgroundColor: '#ccffcc' },
              headerTintColor: '#000',
              headerTitleStyle: { fontWeight: '400' },
            }}
          />
          <Stack.Screen
            name="SalesRecord"
            component={SalesRecordScreen}
            options={{
              title: 'Registro de Vendas',
              headerStyle: { backgroundColor: '#ccffcc' },
              headerTintColor: '#000',
              headerTitleStyle: { fontWeight: '400' },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0
  }
});

export default App;
