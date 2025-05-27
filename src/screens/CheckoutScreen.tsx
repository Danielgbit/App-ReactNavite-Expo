// src/screens/CheckoutScreen.tsx
import React from "react";
import { View, Text, Button, StyleSheet, Alert, FlatList } from "react-native";
import { useCart } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import { NavigateRoutesApp } from "../types/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const CheckoutScreen = () => {
  const { cart, clearCart } = useCart();
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigateRoutesApp>>();

  const total = cart.reduce((acumm, item) => {
    const subTotal = item.price * item.quantity;
    return acumm + subTotal;
  }, 0);

  const handleConfirm = () => {
    Alert.alert("¡Pedido confirmado!", "Gracias por tu compra 🕯️", [
      { text: "OK", onPress: () => clearCart() },
    ]);
    navigation.navigate("Home");
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
      <Text style={styles.price}>Precio: ${item.price.toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen del pedido</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <Text style={styles.total}>Total: ${total.toLocaleString()}</Text>
      <Button title="Confirmar pedido" onPress={handleConfirm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  item: {
    marginBottom: 12,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: "bold" },
  quantity: { fontSize: 14, color: "#666" },
  price: { fontSize: 14, color: "#333" },
  total: { fontSize: 20, fontWeight: "bold", marginVertical: 20 },
});
