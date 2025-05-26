import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { Product } from '../types/Product';
import { products } from '../data/products';
import CartIcon from '../components/CartIcon';
import { NavigateRoutesApp } from '../types/Navigation';


type HomeScreenNavigationProp = NativeStackNavigationProp<NavigateRoutesApp, 'Home'>;


export const HomeScreen = () => {

  const navigation = useNavigation<HomeScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <CartIcon/>,
    });
  }, [navigation]);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price.toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  image: { width: '100%', height: 150, borderRadius: 8 },
  name: { marginTop: 8, fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#555' },
});
