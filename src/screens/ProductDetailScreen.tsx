import React from 'react';
import { Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';



type RootStackParamList = {
  ProductDetail: { product: Product };
};

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

export const ProductDetailScreen = () => {
  const { addToCart } = useCart();
  const route = useRoute<ProductDetailRouteProp>();
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toLocaleString()}</Text>
      <Text style={styles.description}>
        Esta vela está hecha con ingredientes naturales y aromas suaves para crear una atmósfera relajante en tu hogar.
      </Text>
      <Button title="Agregar al carrito" onPress={() => addToCart(product)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    color: '#444',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
});
