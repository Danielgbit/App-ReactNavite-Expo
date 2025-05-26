import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { NavigateRoutesApp } from '../types/Navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const CartIcon = () => {
  const navigation = useNavigation<NativeStackNavigationProp<NavigateRoutesApp>>();
  const { cart } = useCart();

  return (
    <TouchableOpacity
      style={styles.cartButton}
      onPress={() => navigation.navigate('Cart')} 
    >
      <Text style={styles.icon}>🛒</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>CART{cart.length}</Text>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartButton: {
    marginRight: 16,
    padding: 5,
  },
  icon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -4,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CartIcon;
