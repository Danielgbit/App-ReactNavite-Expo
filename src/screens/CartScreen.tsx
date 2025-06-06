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
import { useCustomHeader } from "../hooks/useCustomHeader";

type NavigationProps = NativeStackNavigationProp<NavigateRoutesApp, "Checkout">;

export const CartScreen = () => {
  const { cart, removeFromCart, increment, decrement } = useCart();
  const navigation = useNavigation<NavigationProps>();
  useCustomHeader();

  const total = cart.reduce((accum, item) => {
    const subTotal = item.price * item.quantity;
    return accum + subTotal;
  }, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={[styles.empty, { fontFamily: "Poppins_400Regular" }]}>
            Tu carrito está vacío
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={[styles.name, { fontFamily: "Poppins_500Medium" }]}>
              {item.name}
            </Text>
            <Text style={[styles.price, { fontFamily: "Poppins_700Bold" }]}>
              ${item.price} x {item.quantity}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.buttonContainerActions}
                onPress={() => increment(item.id.toLocaleString())}
              >
                <Text style={styles.textButtonActions}>+</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonContainerActions}
                onPress={() => decrement(item.id.toString())}
              >
                <Text style={styles.textButtonActions}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainerActions}
                onPress={() => removeFromCart(item.id.toString())}
              >
                <Text
                  style={[
                    styles.textButtonActions,
                    { fontFamily: "Poppins_700Bold" },
                  ]}
                >
                  Eliminar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={[styles.total, { fontFamily: "Poppins_700Bold" }]}>
          {total > 0 && `Total: ${total.toLocaleString()}`}
        </Text>
        {cart.length > 0 && (
          <TouchableOpacity
            onPress={() => navigation.navigate("Checkout")}
            style={styles.button}
          >
            <Text
              style={[styles.buttonText, { fontFamily: "Poppins_700Bold" }]}
            >
              Ir a pagar
            </Text>
          </TouchableOpacity>
        )}
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
  price: { color: "#FFFFDB", marginTop: 5, letterSpacing: 1, fontSize: 16 },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#FFFFDB",
    letterSpacing: -0.8,
  },
  item: { marginBottom: 16 },
  name: {
    fontSize: 16,
    color: "#FFFFDB",
    letterSpacing: -0.5,
  },
  actions: { flexDirection: "row", gap: 8, marginTop: 20 },
  footer: { marginTop: 20 },
  total: {
    fontSize: 20,
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
  },
});
