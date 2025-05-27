import React from "react";
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
import { NavigateRoutesApp } from "../types/Navigation";
import { Product } from "../types/Product";

type ProductDetailRouteProp = RouteProp<NavigateRoutesApp, "ProductDetail">;

export const ProductDetailScreen = () => {
  const { addToCart } = useCart();
  const route = useRoute<ProductDetailRouteProp>();
  const { product } = route.params;
  
  const sendToCart = (product: Product) => {
    Alert.alert("¡Pedido confirmado!", "Producto agregado al carrito!", [
      { text: "OK", onPress: () => addToCart(product)},
    ]);
  };

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toLocaleString()}</Text>
      <Text style={styles.description}>
        Esta vela está hecha con ingredientes naturales y aromas suaves para
        crear una atmósfera relajante en tu hogar.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => sendToCart(product)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>AGREGAR AL CARRITO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    experimental_backgroundImage:
      "background: linear-gradient(90deg,rgba(43, 43, 4, 1) 0%, rgba(120, 118, 53, 1) 100%);",

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
    fontWeight: "bold",
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
    letterSpacing: 20
  },
  button: {
    backgroundColor: '#FFFFDB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // Sombras para efecto de elevación
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontWeight: '700',
    color: '#000', // Asegúrate de tener buen contraste
  },
});
