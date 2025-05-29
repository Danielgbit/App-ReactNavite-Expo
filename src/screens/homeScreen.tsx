import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import CartIcon from "../components/CartIcon";
import { NavigateRoutesApp } from "../types/Navigation";
import { ProductCard } from "../components/ProductCard";
import { useDB } from "../hooks/useDB";
import { useCustomHeader } from "../hooks/useCustomHeader";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  NavigateRoutesApp,
  "Home"
>;

export const HomeScreen = () => {

  const { products } = useDB();

  const navigation = useNavigation<HomeScreenNavigationProp>();

  useCustomHeader();

  if (!products || products.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.titleHeader}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.titleHeader, { fontFamily: "Poppins_700Bold" }]}>
        PRODUCTOS
      </Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetail", { product: item })
            }
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
    letterSpacing: -0.8,
    fontSize: 20,
    color: "#FFFFDB",
    fontFamily: "Poppins_400Regular",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(43, 43, 4, 1)",
  },
});
