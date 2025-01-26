
import { Low } from "lowdb-js";
import { JSONFilePreset } from "lowdb-js/node";
import defaultData from "./_default_data.js"
import env from "../../env.js";

let db: Low<ProductDB>;

/**
 * Start connection to db
 */
export const connectDatabase = async () => {
  db = await JSONFilePreset(env.DB_DIR + "/db.json", defaultData);
  await db.read();
}

/**
 * Get db instance
 */
export const getDatabase = async () => {
  if (!db) await connectDatabase();
  return db;
}