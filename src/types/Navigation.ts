import { Product } from './Product';

export type NavigateRoutesApp = {
  Home: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
  Checkout: undefined;
};
