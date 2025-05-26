import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/homeScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CartScreen } from '../screens/CartScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { NavigateRoutesApp } from '../types/Navigation';


const Stack = createNativeStackNavigator<NavigateRoutesApp>();


export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Detalle del producto' }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Carrito' }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
    </Stack.Navigator>
  );
};
