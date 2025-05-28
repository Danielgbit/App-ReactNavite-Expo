import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import { products as initialProducts } from '../data/products'; // productos precargados
import { Product } from '../types/Product';

export function useDB() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const init = async () => {
      const dbInstance = await SQLite.openDatabaseAsync('app.db');
      setDb(dbInstance);

      await dbInstance.execAsync(`
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          price INTEGER NOT NULL,
          image TEXT
        );
      `);

      const existing = await dbInstance.getAllAsync(`SELECT * FROM products;`);

      if (existing.length === 0) {
        // Insertar productos precargados
        for (const p of initialProducts) {
          const asset = Asset.fromModule(p.image);
          await asset.downloadAsync();
          const imageUrl = asset.localUri || asset.uri;

          await dbInstance.runAsync(
            `INSERT INTO products (name, price, image) VALUES (?, ?, ?)`, // <-- Solo 3 signos
            [p.name, p.price, imageUrl]  // <-- No pases el id ni un 1
          );
        }
      }

      await fetchProducts(dbInstance);
    };

    init();
  }, []);

  const fetchProducts = async (dbOverride?: SQLite.SQLiteDatabase) => {
    const activeDB = dbOverride ?? db;
    if (!activeDB) return;

    const rows = await activeDB.getAllAsync<Product>(`SELECT * FROM products;`);
    setProducts(rows);
  };

  const addProduct = async (name: string, price: number, image: string) => {
    if (!db) return;
    await db.runAsync(
      `INSERT INTO products (name, price, image) VALUES (?, ?, ?)`, // 3 signos
      [name, price, image]
    );
    await fetchProducts();
  };

  const deleteProduct = async (id: number) => {
    if (!db) return;
    await db.runAsync(`DELETE FROM products WHERE id = ?`, [id]);
    await fetchProducts();
  };

  return {
    products,
    addProduct,
    deleteProduct,
    fetchProducts,
  };
}
