/**
 * One-time
 * Firestore seed script for NIGAH Clothes Store
 *
 * Creates:
 *   categories
 *     ├── women
 *     │   └── subcategories
 *     │       ├── eastern
 *     │       │   └── kurtis / 2-piece / 3-piece
 *     │       ├── western
 *     │       │   └── tops / dresses / trousers
 *     │       ├── footwear
 *     │       ├── fragrances
 *     │       └── accessories
 *     │
 *     ├── men
 *     │   └── subcategories
 *     │       ├── eastern
 *     │       │   └── kurta / shalwar-kameez / waistcoat
 *     │       ├── western
 *     │       │   └── shirts / t-shirts / jeans / trousers
 *     │       ├── footwear
 *     │       ├── fragrances
 *     │       └── accessories
 *     │
 *     ├── new-arrivals
 *     ├── best-sellers
 *     └── east-meets-west
 *
 * Run:
 *   npx tsx seedFirebase.ts
 *
 * IMPORTANT:
 * Keep the Firebase service-account JSON private.
 */

import {
  cert,
  getApps,
  initializeApp,
} from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ==================================================
// FIREBASE CONFIGURATION
// ==================================================

const PROJECT_ID = "nigah-a20bf";

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Service account JSON should be beside this file:
//
// nigah-a20bf/
// ├── seedFirebase.ts
// ├── nigah-clothes-store-firebase-adminsdk.json
// └── package.json

const serviceAccountPath = path.join(
  __dirname,
  "nigah-a20bf-firebase-adminsdk-fbsvc-3770b0a8f1.json"
);

// ==================================================
// FIREBASE INITIALIZATION
// ==================================================

function initializeFirebaseAdmin() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(
      [
        "",
        "❌ Firebase service-account JSON file was not found.",
        "",
        `Expected location:`,
        serviceAccountPath,
        "",
        "Make sure your JSON file is in the same folder as seedFirebase.ts.",
        "",
      ].join("\n")
    );
  }

  const serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, "utf8")
  );

  return initializeApp({
    credential: cert(serviceAccount),
    projectId: PROJECT_ID,
  });
}

const app = initializeFirebaseAdmin();
const db = getFirestore(app);

// ==================================================
// TYPES
// ==================================================

type ChildCategory = {
  id: string;
  name: string;
  sortOrder: number;
};

type Category = {
  id: string;
  name: string;
  sortOrder: number;
  children: ChildCategory[];
};

// ==================================================
// MAIN CATEGORIES
// ==================================================

const mainCategories = {
  women: {
    name: "WOMEN",
    slug: "women",
    type: "main",
    active: true,
    sortOrder: 1,
    parentId: null,
  },

  men: {
    name: "MEN",
    slug: "men",
    type: "main",
    active: true,
    sortOrder: 2,
    parentId: null,
  },
};

// ==================================================
// WOMEN CATEGORIES
// ==================================================

const womenCategories: Category[] = [
  {
    id: "eastern",
    name: "EASTERN",
    sortOrder: 1,
    children: [
      {
        id: "kurtis",
        name: "KURTIS",
        sortOrder: 1,
      },
      {
        id: "2-piece",
        name: "2 PIECE",
        sortOrder: 2,
      },
      {
        id: "3-piece",
        name: "3 PIECE",
        sortOrder: 3,
      },
    ],
  },

  {
    id: "western",
    name: "WESTERN",
    sortOrder: 2,
    children: [
      {
        id: "tops",
        name: "TOPS",
        sortOrder: 1,
      },
      {
        id: "dresses",
        name: "DRESSES",
        sortOrder: 2,
      },
      {
        id: "trousers",
        name: "TROUSERS",
        sortOrder: 3,
      },
    ],
  },

  {
    id: "footwear",
    name: "FOOTWEAR",
    sortOrder: 3,
    children: [],
  },

  {
    id: "fragrances",
    name: "FRAGRANCES",
    sortOrder: 4,
    children: [],
  },

  {
    id: "accessories",
    name: "ACCESSORIES",
    sortOrder: 5,
    children: [],
  },
];

// ==================================================
// MEN CATEGORIES
// ==================================================

const menCategories: Category[] = [
  {
    id: "eastern",
    name: "EASTERN",
    sortOrder: 1,
    children: [
      {
        id: "kurta",
        name: "KURTA",
        sortOrder: 1,
      },
      {
        id: "shalwar-kameez",
        name: "SHALWAR KAMEEZ",
        sortOrder: 2,
      },
      {
        id: "waistcoat",
        name: "WAISTCOAT",
        sortOrder: 3,
      },
    ],
  },

  {
    id: "western",
    name: "WESTERN",
    sortOrder: 2,
    children: [
      {
        id: "shirts",
        name: "SHIRTS",
        sortOrder: 1,
      },
      {
        id: "t-shirts",
        name: "T-SHIRTS",
        sortOrder: 2,
      },
      {
        id: "jeans",
        name: "JEANS",
        sortOrder: 3,
      },
      {
        id: "trousers",
        name: "TROUSERS",
        sortOrder: 4,
      },
    ],
  },

  {
    id: "footwear",
    name: "FOOTWEAR",
    sortOrder: 3,
    children: [],
  },

  {
    id: "fragrances",
    name: "FRAGRANCES",
    sortOrder: 4,
    children: [],
  },

  {
    id: "accessories",
    name: "ACCESSORIES",
    sortOrder: 5,
    children: [],
  },
];

// ==================================================
// SPECIAL COLLECTIONS
// ==================================================

const specialCollections = [
  {
    id: "new-arrivals",
    name: "NEW ARRIVALS",
    sortOrder: 1,
  },

  {
    id: "best-sellers",
    name: "BEST SELLERS",
    sortOrder: 2,
  },

  {
    id: "east-meets-west",
    name: "EAST MEETS WEST",
    sortOrder: 3,
  },
];

// ==================================================
// CREATE MAIN CATEGORY
// ==================================================

async function createMainCategory(
  id: string,
  data: Record<string, unknown>
) {
  await db
    .collection("categories")
    .doc(id)
    .set(data, { merge: true });

  console.log(`✓ Main category: ${data.name}`);
}

// ==================================================
// CREATE GENDER CATEGORIES
// ==================================================

async function seedGenderCategories(
  gender: "women" | "men",
  categories: Category[]
) {
  for (const category of categories) {
    const categoryRef = db
      .collection("categories")
      .doc(gender)
      .collection("subcategories")
      .doc(category.id);

    await categoryRef.set(
      {
        name: category.name,
        slug: category.id,
        type: "subcategory",
        parentId: gender,
        gender,
        active: true,
        sortOrder: category.sortOrder,
      },
      { merge: true }
    );

    console.log(
      `✓ ${gender.toUpperCase()} → ${category.name}`
    );

    // Nested subcategories
    for (const child of category.children) {
      const childRef = categoryRef
        .collection("subcategories")
        .doc(child.id);

      await childRef.set(
        {
          name: child.name,
          slug: child.id,
          type: "subcategory",
          parentId: category.id,
          gender,
          active: true,
          sortOrder: child.sortOrder,
        },
        { merge: true }
      );

      console.log(
        `  ✓ ${gender.toUpperCase()} → ${category.name} → ${child.name}`
      );
    }
  }
}

// ==================================================
// CREATE SPECIAL COLLECTIONS
// ==================================================

async function seedSpecialCollections() {
  for (const collection of specialCollections) {
    await db
      .collection("categories")
      .doc(collection.id)
      .set(
        {
          name: collection.name,
          slug: collection.id,
          type: "collection",
          active: true,
          sortOrder: collection.sortOrder,
          parentId: null,
        },
        { merge: true }
      );

    console.log(
      `✓ Collection: ${collection.name}`
    );
  }
}

// ==================================================
// MAIN SEED FUNCTION
// ==================================================

async function seedFirebase() {
  try {
    console.log("");
    console.log("==========================================");
    console.log("     NIGAH FIREBASE CATEGORY SEED");
    console.log("==========================================");
    console.log("");

    // ------------------------------------------
    // MAIN CATEGORIES
    // ------------------------------------------

    console.log("Creating main categories...\n");

    for (const [id, category] of Object.entries(
      mainCategories
    )) {
      await createMainCategory(id, category);
    }

    // ------------------------------------------
    // WOMEN
    // ------------------------------------------

    console.log(
      "\nCreating WOMEN categories...\n"
    );

    await seedGenderCategories(
      "women",
      womenCategories
    );

    // ------------------------------------------
    // MEN
    // ------------------------------------------

    console.log(
      "\nCreating MEN categories...\n"
    );

    await seedGenderCategories(
      "men",
      menCategories
    );

    // ------------------------------------------
    // SPECIAL COLLECTIONS
    // ------------------------------------------

    console.log(
      "\nCreating special collections...\n"
    );

    await seedSpecialCollections();

    // ------------------------------------------
    // COMPLETE
    // ------------------------------------------

    console.log("");
    console.log("==========================================");
    console.log("   ✓ FIREBASE SEEDING COMPLETED");
    console.log("==========================================");
    console.log("");

    process.exit(0);
  } catch (error) {
    console.error("");
    console.error("==========================================");
    console.error("   ❌ FIREBASE SEEDING FAILED");
    console.error("==========================================");
    console.error("");

    console.error(error);

    process.exit(1);
  }
}

// ==================================================
// RUN
// ==================================================

seedFirebase();