import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import {
  productFamily,
  productFormat,
  cannabinoid,
  flavor,
  educationCategory,
  product,
  dispensary,
  educationArticle,
  manufacturingStep,
  siteSettings,
} from './schemas'

// The siteSettings document is a singleton — only one instance allowed.
// We use a fixed document ID and hide it from the "Create new" menu.
const SITE_SETTINGS_ID = 'siteSettings'

export default defineConfig({
  name: 'gsxok',
  title: 'GSX Studio',
    basePath: '/studio',

  // Filled in from environment variables — do not hard-code.
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Content')
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId(SITE_SETTINGS_ID)
              ),
            S.divider(),

            // Products & Catalog
            S.listItem()
              .title('Products')
              .schemaType('product')
              .child(S.documentTypeList('product').title('Products')),

            // Dispensary Map
            S.listItem()
              .title('Dispensaries')
              .schemaType('dispensary')
              .child(S.documentTypeList('dispensary').title('Dispensaries')),

            // Education
            S.listItem()
              .title('Education Articles')
              .schemaType('educationArticle')
              .child(S.documentTypeList('educationArticle').title('Education Articles')),

            // Manufacturing Process
            S.listItem()
              .title('Manufacturing Steps')
              .schemaType('manufacturingStep')
              .child(S.documentTypeList('manufacturingStep').title('Manufacturing Steps')),

            S.divider(),

            // Taxonomy
            S.listItem()
              .title('Taxonomy')
              .child(
                S.list()
                  .title('Taxonomy')
                  .items([
                    S.listItem()
                      .title('Product Families')
                      .schemaType('productFamily')
                      .child(S.documentTypeList('productFamily').title('Product Families')),
                    S.listItem()
                      .title('Product Formats')
                      .schemaType('productFormat')
                      .child(S.documentTypeList('productFormat').title('Product Formats')),
                    S.listItem()
                      .title('Cannabinoids')
                      .schemaType('cannabinoid')
                      .child(S.documentTypeList('cannabinoid').title('Cannabinoids')),
                    S.listItem()
                      .title('Flavors')
                      .schemaType('flavor')
                      .child(S.documentTypeList('flavor').title('Flavors')),
                    S.listItem()
                      .title('Education Categories')
                      .schemaType('educationCategory')
                      .child(S.documentTypeList('educationCategory').title('Education Categories')),
                  ])
              ),
          ]),
    }),
    visionTool(), // GROQ query playground — disable in production if desired
  ],

  schema: {
    types: [
      // Taxonomy
      productFamily,
      productFormat,
      cannabinoid,
      flavor,
      educationCategory,
      // Content
      product,
      dispensary,
      educationArticle,
      manufacturingStep,
      // Singleton
      siteSettings,
    ],
  },
})
