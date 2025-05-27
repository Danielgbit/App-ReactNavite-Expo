export interface Candle {
  id?: number; // Auto-incrementado por SQLite
  name: string;
  price: number;
  description: string;
  discount: number;
  image: string; // URL externa
}