
import { Low } from "lowdb-js";
import { JSONFilePreset } from "lowdb-js/node";
import env from "../../env.js";
import { parseWord } from "../utils/parse.js";

let db: Low<{ products: Array<Product> }>;

export const connectDatabase = async () => {
  db = await JSONFilePreset(env.DB_DIR + "/db.json", { products: [] });
  await db.read();
}

export const getDatabase = async () => {
  if (!db) await connectDatabase();
  return db;
}

export const addProduct = async (product: Product) => {
  product.name = parseWord(product.name);
  product.section = parseWord(product.section);
  db.data.products.push(product);
}

export const removeProduct = async (name: string) => {
  db.data.products = db.data.products.filter(p => p.name !== name);
}

export const removeSection = async (section: string) => {
  db.data.products = db.data.products.filter(p => p.section !== section);
}

export const getSectionsNames = async () => {
  const sections = [];

  for (const product of db.data.products) {
    if (!sections.includes(product.section)) {
        sections.push(product.section);
    }
  }

  return sections;
}

export const getProduct = async (name: string) => {
  return db.data.products.find(p => p.name === name);
}

export const getProducts = async (section: string) => {
  if (!section) return db.data.products.sort((p1, p2) => {
    if (p1.section == p2.section) return 1;
    return -1;
  });
  return db.data.products.filter(p => p.section === section);
}
