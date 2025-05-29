import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigateRoutesApp } from "../types/Navigation";
import useCart from "../hooks/useCart";

type NavigationProps = NativeStackNavigationProp<NavigateRoutesApp, "Checkout">;

export const CartScreen = () => {
  const { cart, removeFromCart, increment, decrement } = useCart();
  const navigation = useNavigation<NavigationProps>();

  const total = cart.reduce((accum, item) => {
    const subTotal = item.price * item.quantity;
    return accum + subTotal;
  }, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>Tu carrito está vacío</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>
              ${item.price} x {item.quantity}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.buttonContainerActions}
                onPress={() => increment(item.id)}
              >
                <Text style={styles.textButtonActions}>+</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonContainerActions}
                onPress={() => decrement(item.id)}
              >
                <Text style={styles.textButtonActions}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainerActions}
                onPress={() => removeFromCart(item.id)}
              >
                <Text style={styles.textButtonActions}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total.toLocaleString()}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Checkout")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Ir a pagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(43, 43, 4, 1)",
  },
  price: { color: "#FFFFDB", marginTop: 5, letterSpacing: -0.5 },
  empty: { textAlign: "center", marginTop: 20, fontSize: 16, color: "#FFFFDB" },
  item: { marginBottom: 16 },
  name: { fontSize: 16, fontWeight: "bold", color: "#FFFFDB" },
  actions: { flexDirection: "row", gap: 8, marginTop: 20 },
  footer: { marginTop: 20 },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFFFDB",
  },
  checkoutButton: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
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
    fontWeight: "700",
    color: "#000",
  },

  buttonContainerActions: {
    backgroundColor: "#FFFFDB",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  textButtonActions: {
    color: "#2b2b04",
    fontSize: 16,
    fontWeight: "bold",
  },
});
