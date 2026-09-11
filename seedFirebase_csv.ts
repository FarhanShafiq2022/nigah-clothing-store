/**
 * NIGAH CLOTHING — Firebase Firestore CSV Importer
 *
 * Imports all products from:
 *   nigahclothing.csv
 *
 * Firestore:
 *   products/
 *
 * IDs:
 *   nigah-001 ... nigah-024
 *
 * Features:
 * - Cleans product names
 * - Cleans categories
 * - Cleans prices
 * - Preserves original product URLs
 * - Preserves original main image URLs
 * - Preserves original hover image URLs
 * - If hover image is missing, uses main image as fallback
 * - Safe to run multiple times
 */

import "dotenv/config";
import fs from "node:fs";
import path from "node:path";

import { parse } from "csv-parse/sync";

import {
  applicationDefault,
  getApps,
  initializeApp,
} from "firebase-admin/app";

import { getFirestore, FieldValue } from "firebase-admin/firestore";


// ============================================================
// CONFIGURATION
// ============================================================

const PROJECT_ID = "nigah-a20bf";

const CSV_FILENAME = "nigahclothing.csv";

const FIRESTORE_COLLECTION = "products";


// ============================================================
// TYPES
// ============================================================

type CsvRow = Record<string, string | undefined>;


// ============================================================
// TEXT CLEANING
// ============================================================

function text(value: unknown): string {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .replace(/^,+|,+$/g, "")
    .trim();
}


function nullable(value: unknown): string | null {
  const cleaned = text(value);

  return cleaned || null;
}


// ============================================================
// PRICE CLEANING
// ============================================================

function price(value: unknown): number {
  const cleaned = text(value)
    .replace(/PKR/gi, "")
    .replace(/Rs\.?/gi, "")
    .replace(/,/g, "")
    .trim();

  const parsed = Number(cleaned);

  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid price: "${value}"`);
  }

  return parsed;
}


// ============================================================
// URL / SLUG HELPERS
// ============================================================

function slugFromUrl(productUrl: string): string {
  try {
    const url = new URL(productUrl);

    const parts = url.pathname
      .split("/")
      .filter(Boolean);

    return parts.at(-1) || "";
  } catch {
    return "";
  }
}


function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


// ============================================================
// CATEGORY CLEANING
// ============================================================

function cleanCategories(row: CsvRow) {
  const category = text(row["wd-product-cats 2"]);

  const category2 = text(row["wd-product-cats 3"]);

  const category3 = text(row["wd-product-cats 4"]);


  const categories = [
    category,
    category2,
    category3,
  ].filter(Boolean);


  /*
   * Your CSV structure contains examples like:
   *
   * Kurti + Women's Collection
   *
   * Solids + Women's Collection
   *
   * STITCHED + Printed Shirt + Women's Collection
   *
   * STITCHED + 2 Piece Printed + Women's Collection
   *
   * STITCHED + 3 Piece Printed + Women's Collection
   *
   * Coords sets + Women's Collection
   */


  let primaryCategory = categories[0] || "";

  let subcategory: string | null = null;

  let collection: string | null = null;


  for (const value of categories) {

    const normalized = value.toLowerCase();


    if (normalized === "women's collection") {
      collection = "Women's Collection";

      continue;
    }


    if (
      value !== primaryCategory &&
      !subcategory
    ) {
      subcategory = value;
    }
  }


  return {
    category: primaryCategory,
    subcategory,
    collection,
  };
}


// ============================================================
// BUILD PRODUCT
// ============================================================

function buildProduct(
  row: CsvRow,
  rowNumber: number
) {

  // ----------------------------------------------------------
  // ORIGINAL CSV VALUES
  // ----------------------------------------------------------

  const productUrl = text(
    row["product-image-link href"]
  );


  const image = text(
    row["attachment-woocommerce_thumbnail src"]
  );


  /*
   * IMPORTANT:
   *
   * Some products in your CSV don't have a second image.
   *
   * Instead of stopping the entire import, we use the main
   * product image as the hover image.
   */

  const csvHoverImage = text(
    row["attachment-woocommerce_thumbnail src 2"]
  );


  const hoverImage =
    csvHoverImage || image;


  const name = text(
    row["wd-entities-title"]
  );


  const action =
    text(row["button"]) || "Add to cart";


  const actionUrl =
    text(row["button href"]) || productUrl;


  const categories =
    cleanCategories(row);


  // ----------------------------------------------------------
  // VALIDATION
  // ----------------------------------------------------------

  if (!productUrl) {
    throw new Error(
      `CSV row ${rowNumber}: missing product URL`
    );
  }


  if (!name) {
    throw new Error(
      `CSV row ${rowNumber}: missing product name`
    );
  }


  if (!image) {
    throw new Error(
      `CSV row ${rowNumber}: missing main image URL`
    );
  }


  // ----------------------------------------------------------
  // SLUG
  // ----------------------------------------------------------

  const sourceSlug =
    slugFromUrl(productUrl);


  const slug =
    sourceSlug ||
    slugify(`${name}-${rowNumber}`);


  // ----------------------------------------------------------
  // FIRESTORE ID
  // ----------------------------------------------------------

  const id =
    `nigah-${String(rowNumber).padStart(3, "0")}`;


  // ----------------------------------------------------------
  // PRODUCT OBJECT
  // ----------------------------------------------------------

  return {

    id,

    name,

    slug,


    // --------------------------------------------------------
    // CATEGORY
    // --------------------------------------------------------

    category:
      categories.category || null,

    subcategory:
      categories.subcategory,

    collection:
      categories.collection,


    // --------------------------------------------------------
    // PRICE
    // --------------------------------------------------------

    price:
      price(
        row["woocommerce-Price-amount"]
      ),

    currency: "PKR",


    // --------------------------------------------------------
    // IMAGES
    // --------------------------------------------------------

    image,

    /*
     * If the CSV has a hover image:
     *   use it.
     *
     * If it doesn't:
     *   use the main image.
     */

    hoverImage,


    // --------------------------------------------------------
    // ORIGINAL PRODUCT URL
    // --------------------------------------------------------

    productUrl,

    actionUrl,

    action,


    // --------------------------------------------------------
    // STOCK
    // --------------------------------------------------------

    inStock:
      action.toLowerCase() ===
      "add to cart",


    // --------------------------------------------------------
    // SOURCE INFORMATION
    // --------------------------------------------------------

    source: {

      website:
        "nigahclothing.com",

      csvRow:
        rowNumber,

    },


    // --------------------------------------------------------
    // TIMESTAMPS
    // --------------------------------------------------------

    createdAt:
      FieldValue.serverTimestamp(),

    updatedAt:
      FieldValue.serverTimestamp(),

  };
}


// ============================================================
// FIREBASE INITIALIZATION
// ============================================================

function initFirebase() {

  if (getApps().length === 0) {

    if (
      !process.env.GOOGLE_APPLICATION_CREDENTIALS
    ) {

      throw new Error(
        [
          "GOOGLE_APPLICATION_CREDENTIALS is not set.",
          "",
          "Set it before running the importer:",
          "",
          '$env:GOOGLE_APPLICATION_CREDENTIALS="D:\\path\\to\\service-account.json"',
        ].join("\n")
      );
    }


    initializeApp({

      credential:
        applicationDefault(),

      projectId:
        PROJECT_ID,

    });

  }


  return getFirestore();
}


// ============================================================
// READ CSV
// ============================================================

function readCsv(): CsvRow[] {

  const csvPath =
    path.resolve(
      process.cwd(),
      CSV_FILENAME
    );


  if (!fs.existsSync(csvPath)) {

    throw new Error(
      [
        "CSV file not found:",
        csvPath,
        "",
        `Put ${CSV_FILENAME} in the same folder as this script.`,
      ].join("\n")
    );

  }


  const csv =
    fs.readFileSync(
      csvPath,
      "utf8"
    );


  return parse(csv, {

    columns: true,

    skip_empty_lines: true,

    bom: true,

    relax_column_count: true,

    trim: true,

  }) as CsvRow[];

}


// ============================================================
// UPLOAD PRODUCTS
// ============================================================

async function uploadProducts(
  products: ReturnType<typeof buildProduct>[]
) {

  const db =
    initFirebase();


  /*
   * Firestore supports up to 500 writes
   * in a single batch.
   *
   * Your CSV contains 24 products,
   * so one batch is enough.
   */

  const batch =
    db.batch();


  for (const product of products) {

    const ref =
      db
        .collection(
          FIRESTORE_COLLECTION
        )
        .doc(product.id);


    /*
     * merge: false means the Firestore
     * document is replaced with the
     * current CSV data.
     */

    batch.set(
      ref,
      product,
      {
        merge: false,
      }
    );

  }


  await batch.commit();

}


// ============================================================
// PREVIEW
// ============================================================

function preview(
  products: ReturnType<typeof buildProduct>[]
) {

  console.log(
    "\nProducts prepared:\n"
  );


  for (const product of products) {

    const categories = [

      product.category,

      product.subcategory,

      product.collection,

    ]
      .filter(Boolean)
      .join(" / ");


    const hoverStatus =
      product.image === product.hoverImage
        ? "MAIN IMAGE FALLBACK"
        : "HOVER IMAGE";


    console.log(

      `${product.id} | ` +
      `${product.name} | ` +
      `PKR ${product.price.toLocaleString()} | ` +
      `${categories} | ` +
      `${hoverStatus}`

    );

  }

}


// ============================================================
// MAIN
// ============================================================

async function main() {

  console.log(`

========================================
 NIGAH CLOTHING — Firestore CSV Import
========================================

Firebase project:
${PROJECT_ID}

CSV file:
${CSV_FILENAME}

Firestore collection:
${FIRESTORE_COLLECTION}

`);


  try {

    // --------------------------------------------------------
    // READ CSV
    // --------------------------------------------------------

    const rows =
      readCsv();


    console.log(
      `CSV rows detected: ${rows.length}`
    );


    if (rows.length !== 24) {

      console.warn(

        `⚠ Expected 24 products from your supplied CSV, ` +
        `but found ${rows.length}.`

      );

    }


    // --------------------------------------------------------
    // BUILD PRODUCTS
    // --------------------------------------------------------

    const products =
      rows.map(
        (row, index) =>
          buildProduct(
            row,
            index + 1
          )
      );


    // --------------------------------------------------------
    // PREVIEW
    // --------------------------------------------------------

    preview(products);


    // --------------------------------------------------------
    // UPLOAD
    // --------------------------------------------------------

    console.log(
      "\nUploading to Firestore..."
    );


    await uploadProducts(
      products
    );


    // --------------------------------------------------------
    // SUCCESS
    // --------------------------------------------------------

    console.log(`

========================================
 ✅ IMPORT COMPLETED
========================================

Uploaded:
${products.length} product(s)

Collection:
${FIRESTORE_COLLECTION}

IDs:
nigah-001 ... nigah-${String(
      products.length
    ).padStart(3, "0")}

Images:
Original image URLs preserved.

Hover images:
Original hover URLs preserved where available.
Main image used as fallback where hover image
was missing.

========================================

`);

  } catch (error) {

    console.error(
      "\n❌ Firestore import failed.\n"
    );


    console.error(

      error instanceof Error
        ? error.message
        : error

    );


    process.exitCode = 1;

  }

}


// ============================================================
// START
// ============================================================

void main();