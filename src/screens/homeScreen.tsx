import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import CartIcon from "../components/CartIcon";
import { NavigateRoutesApp } from "../types/Navigation";
import { ProductCard } from "../components/ProductCard";
import { useDB } from "../hooks/useDB";  // <-- Aquí importas el hook

type HomeScreenNavigationProp = NativeStackNavigationProp<
  NavigateRoutesApp,
  "Home"
>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const { products } = useDB();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <CartIcon />,
    });
  }, [navigation]);

  if (!products || products.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.titleHeader}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleHeader}>PRODUCTOS</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
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
    color: "#FFFFDB",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(43, 43, 4, 1)",
  },
});
