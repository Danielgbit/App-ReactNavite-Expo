import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard = ({ product, onPress }: ProductCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={[styles.name, {fontFamily: 'Poppins_400Regular'}]}>{product.name}</Text>
      <Text style={[styles.price, {fontFamily: 'Poppins_700Bold'}]}>${product.price.toLocaleString()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#C2C293",
    borderRadius: 12,
    padding: 10,
    marginBottom: 30,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  name: {
    marginTop: 8,
    fontSize: 16,
    color: "#3D3D0B",
    letterSpacing: -0.5
  },
  price: {
    fontSize: 16,
    color: "#3D3D0B",
  },
});
