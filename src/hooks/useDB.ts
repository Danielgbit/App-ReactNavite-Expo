import * as SQLite from "expo-sqlite";

export const useDB = () => {
  const openDataBase = async () => {
    const db = await SQLite.openDatabaseAsync("candles.db");
    return db;
  };

  const initDB = async () => {
    const db = await openDataBase();
    const sql = `
        CREATE TABLE IF NOT EXISTS candles (
          id TEXT PRIMARY KEY NOT NULL,
          symbol TEXT NOT NULL,         // Ej: 'BTC/USD', 'AAPL'
          timeframe TEXT NOT NULL,      // Ej: '1h', '4h', '1d'
          open REAL NOT NULL,          // Precio de apertura
          high REAL NOT NULL,          // Precio máximo
          low REAL NOT NULL,           // Precio mínimo
          close REAL NOT NULL,         // Precio de cierre
          volume REAL NOT NULL,        // Volumen operado
          timestamp INTEGER NOT NULL,   // Fecha/hora en timestamp
          UNIQUE(symbol, timeframe, timestamp)  // Evita duplicados
        )
      `;
    const res = await db.execAsync(sql);
    console.log("DB INITIALIZED", res);
    return res;
  };
  

  return {
    initDB,
  };
};
