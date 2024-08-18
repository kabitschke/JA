import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddProductScreen from './screens/AddProductScreen';
import ProductListScreen from './screens/ProductListScreen';
import SalesRecordScreen from './screens/SalesRecordScreen';
import { Image, StyleSheet, StatusBar } from 'react-native';


const Stack = createStackNavigator();



const App = () => {
  return (
    <NavigationContainer>

      <Image source={require('./assets/foodtruck.jpg')}
        resizeMode='cover'
        style={styles.hero}
      />

      <Stack.Navigator
        initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'JA Lanches', headerStyle: { backgroundColor: '#ccffcc', }, headerTintColor: '#000', headerTitleStyle: {
              fontWeight: '400'
            }, headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProductScreen}
          options={{
            title: 'Adicionar Produto', headerStyle: { backgroundColor: '#ccffcc', }, headerTintColor: '#000', headerTitleStyle: {
              fontWeight: '400',
            },
          }}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{
            title: 'Lista de Produtos', headerStyle: { backgroundColor: '#ccffcc', }, headerTintColor: '#000', headerTitleStyle: {
              fontWeight: '400',
            },
          }}
        />
        <Stack.Screen
          name="SalesRecord"
          component={SalesRecordScreen}
          options={{
            title: 'Registro de Vendas', headerStyle: { backgroundColor: '#ccffcc', }, headerTintColor: '#000', headerTitleStyle: {
              fontWeight: '400',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0
  },
  hero: {
    marginTop: 40,
    width: '100%',
    height: 120
  }

})

export default App;
