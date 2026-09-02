// lib/products/catalog.ts
// Products page catalog data.
//
// Sanity has a full `product` / `productFamily` schema (see
// sanity/schemas/product.ts) but zero documents exist in the dataset yet, and
// three of the ten known SKUs have no source package artwork on file. Rather
// than invent missing images or author placeholder CMS entries on the user's
// behalf, this file holds the shape Sanity's `getProductsByFamily` already
// returns for the SKUs we do have real, approved artwork for.
//
// Swapping this out for a live Sanity fetch later means: create the
// productFamily + product documents in Studio with these same field values,
// point `image` at these same uploaded assets (or replace them), then have
// app/products/page.tsx call getAllProductFamilies() / getProductsByFamily()
// instead of importing PRODUCT_FAMILIES. The component props below already
// match that schema's field names.

export interface ProductVariant {
  name: string
  slug: string
  imageUrl?: string
  imageWidth?: number
  imageHeight?: number
  imageAlt?: string
  /** Flavor or bar description as printed on the package. */
  flavor?: string
  /** Formulation descriptor as printed on the package (e.g. "Sativa Enhanced"). */
  enhancement?: string
  /** Cannabinoid ratio as printed on the package (e.g. "THC:CBG:CBD 2:1:1"). */
  ratio?: string
  /** Net weight as printed on the package. */
  netWeight?: string
  /** Piece count as printed on the package. */
  pieceCount?: string
  /** Per-piece or per-square potency as printed on the package. */
  perPiece?: string
  /** True when no approved package artwork exists yet. Renders a labeled placeholder instead of inventing artwork. */
  placeholder?: boolean
}

export interface ProductFamily {
  name: string
  slug: string
  description: string
  variants: ProductVariant[]
}

export const PRODUCT_FAMILIES: ProductFamily[] = [
  {
    name: 'Chocolate Bites',
    slug: 'chocolate-bites',
    description: 'GSX’s flagship chocolate line, produced in-house in Chelsea, Oklahoma in Caramel, Solid Milk Chocolate, and Peanut Butter varieties.',
    variants: [
      {
        name: 'Caramel Bites',
        slug: 'caramel-bites',
        imageUrl: 'https://cdn.sanity.io/images/o7wavkxv/production/f4840525afd1ec270784a9f56840516516fd15e9-1840x1812.png',
        imageWidth: 1840,
        imageHeight: 1812,
        imageAlt: 'GSX Milk Chocolate Caramel Bites package',
        flavor: 'Milk Chocolate Caramel',
        netWeight: '80g',
        pieceCount: '10 Pieces',
      },
      {
        name: 'Solid Milk Chocolate Bites',
        slug: 'solid-milk-chocolate-bites',
        imageUrl: 'https://cdn.sanity.io/images/o7wavkxv/production/3a27570a8ef6a47d5315e461bb33e0d92aac2494-1840x1812.png',
        imageWidth: 1840,
        imageHeight: 1812,
        imageAlt: 'GSX Solid Milk Chocolate Bites package',
        flavor: 'Solid Milk Chocolate',
        netWeight: '80g',
        pieceCount: '10 Pieces',
      },
      {
        name: 'Peanut Butter Bites',
        slug: 'peanut-butter-bites',
        imageUrl: 'https://cdn.sanity.io/images/o7wavkxv/production/ba4ae5231c72ff395cee6e52c09d3cd73f7e9678-1840x1812.png',
        imageWidth: 1840,
        imageHeight: 1812,
        imageAlt: 'GSX Milk Chocolate Peanut Butter Bites package',
        flavor: 'Milk Chocolate Peanut Butter',
        netWeight: '80g',
        pieceCount: '10 Pieces',
      },
    ],
  },
  {
    name: 'Chocolate Bites Singles',
    slug: 'chocolate-bites-singles',
    description: 'Single-serve versions of the GSX Chocolate Bites lineup, made for a smaller individual format.',
    variants: [
      {
        name: 'Caramel Bite',
        slug: 'caramel-bites-single',
        imageUrl: 'https://cdn.sanity.io/images/o7wavkxv/production/481b833fb738240568922d24d168cc38e7271627-1166x2000.png',
        imageWidth: 1166,
        imageHeight: 2000,
        imageAlt: 'GSX Milk Chocolate Caramel Bites, single-serve package',
        flavor: 'Milk Chocolate Caramel',
        netWeight: '8g (0.28oz)',
        pieceCount: '1 Piece',
        perPiece: '100mg THC',
      },
      {
        name: 'Solid Milk Chocolate Bite',
        slug: 'solid-milk-chocolate-bites-single',
        flavor: 'Solid Milk Chocolate',
        netWeight: '8g (0.28oz)',
        pieceCount: '1 Piece',
        perPiece: '100mg THC',
        placeholder: true,
      },
      {
        name: 'Peanut Butter Bite',
        slug: 'peanut-butter-bite-single',
        imageUrl: 'https://cdn.sanity.io/images/o7wavkxv/production/a59a76ccb36798f62297f853494751b5b7bb2967-1164x2000.png',
        imageWidth: 1164,
        imageHeight: 2000,
        imageAlt: 'GSX Milk Chocolate Peanut Butter Bite, single-serve package',
        flavor: 'Milk Chocolate Peanut Butter',
        netWeight: '8g (0.28oz)',
        pieceCount: '1 Piece',
        perPiece: '100mg THC',
      },
    ],
  },
  {
    name: 'Precision Crafted Gummies',
    slug: 'precision-crafted-gummies',
    description: 'Three gummy formulations in distinct cannabinoid ratios, with Focus, Relax, and Balance varieties.',
    variants: [
      {
        name: 'Focus',
        slug: 'focus',
        imageUrl: 'https://cdn.sanity.io/images/o7wavkxv/production/642f1bec68400ec93d8c30bc752775cf29508755-1840x1812.png',
        imageWidth: 1840,
        imageHeight: 1812,
        imageAlt: 'GSX Precision Crafted Gummies, Focus, Wild Berry package',
        flavor: 'Wild Berry',
        enhancement: 'Sativa Enhanced',
        ratio: 'THC:CBG:CBD 2:1:1',
        netWeight: '1.75oz (50g)',
      },
      {
        name: 'Relax',
        slug: 'relax',
        imageUrl: 'https://cdn.sanity.io/images/o7wavkxv/production/700d25707bcc7fbd61ca0a7b69021cfb300b89f6-1840x1812.png',
        imageWidth: 1840,
        imageHeight: 1812,
        imageAlt: 'GSX Precision Crafted Gummies, Relax, Cherry Berry package',
        flavor: 'Cherry Berry',
        enhancement: 'Indica Enhanced',
        ratio: 'THC:CBN:CBD 2:1:1',
        netWeight: '1.75oz (50g)',
      },
      {
        name: 'Balance',
        slug: 'balance',
        imageUrl: 'https://cdn.sanity.io/images/o7wavkxv/production/a58f9591f98e011ab78255b76fbc296a025eea00-1840x1812.png',
        imageWidth: 1840,
        imageHeight: 1812,
        imageAlt: 'GSX Precision Crafted Gummies, Balance, Strawberry Watermelon package',
        flavor: 'Strawberry-Watermelon',
        enhancement: 'Hybrid Enhanced',
        ratio: 'THC:CBD 1:1',
        netWeight: '1.75oz (50g)',
      },
    ],
  },
  {
    name: 'Fruit Crunchers',
    slug: 'fruit-crunchers',
    description: 'GSX’s freeze-dried candy line, available in Elevate, Relax, and Boost varieties.',
    variants: [
      {
        name: 'Elevate',
        slug: 'elevate',
        imageUrl: 'https://cdn.sanity.io/images/o7wavkxv/production/dc14997eb175b6bf90d4f65a803c0325e542dbc8-1840x1812.png',
        imageWidth: 1840,
        imageHeight: 1812,
        imageAlt: 'GSX Fruit Crunchers, Elevate package',
        netWeight: '60g (2.12oz)',
        pieceCount: '40 Pieces',
        perPiece: '25mg THC / 10mg CBD per piece',
      },
      {
        name: 'Relax',
        slug: 'relax',
        imageUrl: 'https://cdn.sanity.io/images/o7wavkxv/production/90c382b40c49a7bc3db2c12adfa7210149eaab79-1840x1812.png',
        imageWidth: 1840,
        imageHeight: 1812,
        imageAlt: 'GSX Fruit Crunchers, Relax package',
        netWeight: '60g (2.12oz)',
        pieceCount: '40 Pieces',
        perPiece: '25mg THC / 10mg CBN per piece',
      },
      {
        name: 'Boost',
        slug: 'boost',
        imageUrl: 'https://cdn.sanity.io/images/o7wavkxv/production/9ec0def04e8836f773a41b3bddf0bd50e1980aaf-1840x1812.png',
        imageWidth: 1840,
        imageHeight: 1812,
        imageAlt: 'GSX Fruit Crunchers, Boost package',
        netWeight: '60g (2.12oz)',
        pieceCount: '40 Pieces',
        perPiece: '25mg THC / 10mg CBG per piece',
      },
    ],
  },
  {
    name: 'The Hammer',
    slug: 'the-hammer',
    description: 'A high-potency chocolate bar divided into individual squares for clearly portioned servings.',
    variants: [
      {
        name: 'The Hammer',
        slug: 'the-hammer',
        imageUrl: 'https://cdn.sanity.io/images/o7wavkxv/production/b02174bf96aee1e13349637609c3b42225e876c5-619x541.png',
        imageWidth: 619,
        imageHeight: 541,
        imageAlt: 'The Hammer chocolate bar package',
        netWeight: '8g (2.82oz)',
        pieceCount: '1 Bar, 24 Squares',
        perPiece: '175mg THC / 40mg CBD per square',
      },
    ],
  },
]
