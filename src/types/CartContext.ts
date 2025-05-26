import { Product } from "./Product";

type CartItem = Product & { quantity: number };

export interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;
}
