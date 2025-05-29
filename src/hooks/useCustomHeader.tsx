import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import CartIcon from "../components/CartIcon";

interface UseCustomHeaderOptions {
  title?: string;
  showCartIcon?: boolean;
  backgroundColor?: string;
}

export const useCustomHeader = ({
  title = "CandlesApp",
  showCartIcon = true,
  backgroundColor = "rgb(136, 136, 77)",
}: UseCustomHeaderOptions = {}) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
      headerRight: showCartIcon ? () => <CartIcon /> : undefined,
      headerStyle: {
        backgroundColor,
      },
      headerTitleStyle: {
        fontFamily: "Poppins_700Bold",
      },
    });
  }, [navigation, title, showCartIcon, backgroundColor]);
};
