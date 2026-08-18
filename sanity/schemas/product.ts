import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'details', title: 'Details', default: true },
    { name: 'formulation', title: 'Formulation' },
    { name: 'content', title: 'Content' },
    { name: 'media', title: 'Media' },
    { name: 'commerce', title: 'Commerce' },
  ],
  fields: [
    // ── Identity ──────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      group: 'details',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      options: { source: 'name', maxLength: 96 },
      validation: r => r.required(),
    }),

    // ── Taxonomy ──────────────────────────────────────────
    defineField({
      name: 'productFamily',
      title: 'Product Family',
      type: 'reference',
      to: [{ type: 'productFamily' }],
      group: 'details',
    }),
    defineField({
      name: 'productFormat',
      title: 'Product Format',
      type: 'reference',
      to: [{ type: 'productFormat' }],
      group: 'details',
    }),
    defineField({
      name: 'flavors',
      title: 'Flavors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'flavor' }] }],
      group: 'details',
    }),

    // ── Formulation ───────────────────────────────────────
    defineField({
      name: 'cannabinoidProfile',
      title: 'Cannabinoid Profile',
      type: 'array',
      group: 'formulation',
      description: 'List each cannabinoid and its amount per piece in mg.',
      of: [
        {
          type: 'object',
          name: 'cannabinoidEntry',
          fields: [
            {
              name: 'cannabinoid',
              title: 'Cannabinoid',
              type: 'reference',
              to: [{ type: 'cannabinoid' }],
              validation: r => r.required(),
            },
            {
              name: 'amountMg',
              title: 'Amount (mg per piece)',
              type: 'number',
              validation: r => r.required().positive(),
            },
          ],
          preview: {
            select: { title: 'cannabinoid.abbreviation', subtitle: 'amountMg' },
            prepare: ({ title, subtitle }: { title: string; subtitle: number }) => ({
              title,
              subtitle: subtitle ? `${subtitle}mg per piece` : '',
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'piecesPerUnit',
      title: 'Pieces per Unit',
      type: 'number',
      group: 'formulation',
      description: 'How many pieces are in one bag/bar/box.',
      validation: r => r.positive().integer(),
    }),
    defineField({
      name: 'totalMgPerUnit',
      title: 'Total mg per Unit',
      type: 'number',
      group: 'formulation',
      description: 'Total THC mg in one bag/bar/box (used in product name and catalog).',
      validation: r => r.positive(),
    }),

    // ── Content ───────────────────────────────────────────
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      group: 'content',
      description: 'Max 140 characters. Factual only — no effect claims.',
      validation: r => r.max(140),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'array',
      group: 'content',
      description: 'Factual copy only. No health claims, no effect guarantees.',
      of: [{ type: 'block' }],
    }),

    // ── Media ─────────────────────────────────────────────
    defineField({
      name: 'image',
      title: 'Primary Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: r => r.required() }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: r => r.required() }),
          ],
        },
      ],
    }),

    // ── Commerce ──────────────────────────────────────────
    defineField({
      name: 'wholesalePrice',
      title: 'Wholesale Price ($)',
      type: 'number',
      group: 'commerce',
      description: 'B2B price shown in the dispensary buyer portal.',
      validation: r => r.positive(),
    }),
    defineField({
      name: 'availabilityStatus',
      title: 'Availability',
      type: 'string',
      group: 'commerce',
      options: {
        list: [
          { title: 'In Stock', value: 'in_stock' },
          { title: 'Limited', value: 'limited' },
          { title: 'Out of Stock', value: 'out_of_stock' },
          { title: 'Discontinued', value: 'discontinued' },
        ],
        layout: 'radio',
      },
      initialValue: 'in_stock',
      validation: r => r.required(),
    }),

    // ── Migration reference ───────────────────────────────
    defineField({
      name: 'legacyPid',
      title: 'Legacy PID (migration)',
      type: 'string',
      group: 'details',
      description: 'Original pid from the MySQL database. For reference only.',
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'image',
      status: 'availabilityStatus',
    },
    prepare: ({ title, media, status }) => ({
      title,
      subtitle: (status as string)?.replace('_', ' '),
      media,
    }),
  },
})
