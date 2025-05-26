import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigateRoutesApp } from '../types/Navigation';

type NavigationProps = NativeStackNavigationProp<NavigateRoutesApp, 'Checkout'>

export const CartScreen = () => {
  const { cart, removeFromCart, increment, decrement } = useCart();
  const navigation = useNavigation<NavigationProps>();

  const total = cart.reduce((accum, item) => {
    const subTotal = item.price * item.quantity;
    return accum + subTotal;
  }, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Tu carrito está vacío</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>${item.price} x {item.quantity}</Text>
            <View style={styles.actions}>
              <Button title="+" onPress={() => increment(item.id)} />
              <Button title="-" onPress={() => decrement(item.id)} />
              <Button title="Eliminar" onPress={() => removeFromCart(item.id)} />
            </View>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total.toLocaleString()}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Checkout')} style={styles.checkoutButton}>
          <Text  style={styles.checkoutText}>Ir a pagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  empty: { textAlign: 'center', marginTop: 20, fontSize: 16 },
  item: { marginBottom: 16 },
  name: { fontSize: 16, fontWeight: 'bold' },
  actions: { flexDirection: 'row', gap: 8, marginTop: 6 },
  footer: { marginTop: 20 },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  checkoutButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontSize: 16 },
});
