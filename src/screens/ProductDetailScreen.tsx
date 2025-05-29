import React from "react";
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import useCart from "../hooks/useCart";
import { NavigateRoutesApp } from "../types/Navigation";
import { Product } from "../types/Product";
import { useCustomHeader } from "../hooks/useCustomHeader";


type ProductDetailRouteProp = RouteProp<NavigateRoutesApp, "ProductDetail">;


export const ProductDetailScreen = () => {

  useCustomHeader();

  const { addToCart } = useCart();
  const route = useRoute<ProductDetailRouteProp>();
  const { product } = route.params;

  const sendToCart = (product: Product) => {
    Alert.alert("¡Pedido confirmado!", "Producto agregado al carrito!", [
      { text: "OK", onPress: () => addToCart(product) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={[styles.name, { fontFamily: "Poppins_500Medium" }]}>{product.name}</Text>
      <Text style={[styles.price, { fontFamily: "Poppins_700Bold" }]}>${product.price.toLocaleString()}</Text>
      <Text style={[styles.description, { fontFamily: "Poppins_400Regular" }]}>
        {product.description || "Sin descripción"}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => sendToCart(product)}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, { fontFamily: "Poppins_700Bold" }]}>AGREGAR AL CARRITO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(43, 43, 4, 1)",
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    marginBottom: 6,
    color: "#FFFFDB",
  },
  price: {
    fontSize: 18,
    marginBottom: 12,
    color: "#FFFFCF",
  },
  description: {
    fontSize: 16,
    color: "#FFFFCF",
    marginBottom: 20,
    letterSpacing: -0.8,
  },
  button: {
    backgroundColor: "#FFFFDB",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#000",
  },
});
