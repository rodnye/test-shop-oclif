import { parseWord } from "../utils/parse.js";
import { getDatabase } from "./database.js";/**

/**
 *
 */
export const addProduct = async (product: Product) => {
  const db = await getDatabase();

  product.name = parseWord(product.name);
  product.section = parseWord(product.section);
  db.data.products.push(product);
};

/**
 *
 */
export const removeProduct = async (name: string) => {
  const db = await getDatabase();

  db.data.products = db.data.products.filter(p => p.name !== name);
};

/**
 *
 */
export const removeSection = async (section: string) => {
  const db = await getDatabase();
  db.data.products = db.data.products.filter(p => p.section !== section);
};

/**
 *
 */
export const getSectionsNames = async () => {
  const db = await getDatabase();
  const sections = [];

  for (const product of db.data.products) {
    if (!sections.includes(product.section)) {
      sections.push(product.section);
    }
  }

  return sections;
};

/**
 *
 */
export const getProduct = async (name: string) => {
  const db = await getDatabase();

  return db.data.products.find(p => p.name === name);
};

/**
 *
 */
export const getProducts = async (section: string) => {
  const db = await getDatabase();

  if (!section) return db.data.products.sort((p1, p2) => {
    if (p1.section == p2.section) return 1;
    return -1;
  });
  return db.data.products.filter(p => p.section === section);
};

