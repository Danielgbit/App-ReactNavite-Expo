import React from "react";
import { View, FlatList, Text, StyleSheet, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import { products } from "../data/products";
import CartIcon from "../components/CartIcon";
import { NavigateRoutesApp } from "../types/Navigation";
import { ProductCard } from "../components/ProductCard";

type HomeScreenNavigationProp = NativeStackNavigationProp< NavigateRoutesApp, "Home" >;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <CartIcon />,
    });
  }, [navigation]);


  return (
    <View style={styles.container}>
      <Text style={styles.titleHeader}>PRODUCTOS</Text>
      <FlatList data={products} keyExtractor={(item) => item.id} renderItem={({ item }) => (
          <ProductCard 
            product={item} 
            onPress={() => navigation.navigate("ProductDetail", { product: item })}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  titleHeader: {
    textAlign: "center",
    marginVertical: 60,
    fontWeight: "800",
    letterSpacing: -0.8,
    fontSize: 20,
    color: '#FFFFDB'
  },
  container: {
    flex: 1,
    experimental_backgroundImage: 'background: linear-gradient(90deg,rgba(43, 43, 4, 1) 0%, rgba(120, 118, 53, 1) 100%);',
  },
});
