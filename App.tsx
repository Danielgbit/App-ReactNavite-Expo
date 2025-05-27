import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { CartProvider } from "./src/context/CartContext";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./src/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <CartProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      <Toast />
    </CartProvider>
  );
}
