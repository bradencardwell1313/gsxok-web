import { defineType, defineField } from 'sanity'

export const dispensary = defineType({
  name: 'dispensary',
  title: 'Dispensary',
  type: 'document',
  fields: [
    // ── Identity ──────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Dispensary Name',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: r => r.required(),
    }),

    // ── Location ──────────────────────────────────────────
    defineField({
      name: 'address',
      title: 'Street Address',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      initialValue: 'OK',
      validation: r => r.required().length(2),
    }),
    defineField({
      name: 'zip',
      title: 'ZIP Code',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint',
      description: 'Used to place the pin on the interactive dispensary map.',
      validation: r => r.required(),
    }),

    // ── Contact & external links ───────────────────────────
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'orderingUrl',
      title: 'Online Ordering URL',
      type: 'url',
      description: 'Direct link to the dispensary\'s ordering page (Dutchie, Jane, etc.).',
    }),
    defineField({
      name: 'directionsUrl',
      title: 'Google Maps Directions URL',
      type: 'url',
      description: 'Pre-built Google Maps link used on the dispensary card "Directions" button.',
    }),

    // ── Card display ──────────────────────────────────────
    defineField({
      name: 'availabilityStatus',
      title: 'GSX Product Availability',
      type: 'string',
      description: 'Shown as a badge on the interactive dispensary card.',
      options: {
        list: [
          { title: 'Carries GSX', value: 'carries' },
          { title: 'Intermittent', value: 'intermittent' },
          { title: 'Temporarily Out', value: 'out' },
        ],
        layout: 'radio',
      },
      initialValue: 'carries',
      validation: r => r.required(),
    }),
    defineField({
      name: 'featuredProducts',
      title: 'Featured GSX Products',
      type: 'array',
      description: 'Products this dispensary actively carries (shown on card, optional).',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
      description: 'Not shown publicly. Account notes, contact name, reorder history, etc.',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      city: 'city',
      state: 'state',
      status: 'availabilityStatus',
    },
    prepare: ({
      title,
      city,
      state,
      status,
    }: {
      title: string
      city: string
      state: string
      status: string
    }) => ({
      title,
      subtitle: `${city}, ${state} · ${status}`,
    }),
  },
})
