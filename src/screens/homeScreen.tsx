import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo de Velas</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => {
              console.log('Ir al detalle de:', item.name);
              // Aquí luego vamos a navegar al detalle
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
