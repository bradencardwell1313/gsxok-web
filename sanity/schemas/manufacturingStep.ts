import { defineType, defineField } from 'sanity'

// Ordered steps that compose the "How We Make It" / process section.
// Displayed in the order field ascending.
export const manufacturingStep = defineType({
  name: 'manufacturingStep',
  title: 'Manufacturing Step',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Step Number',
      type: 'number',
      description: 'Controls the order steps appear on-page. Use 10, 20, 30 increments to allow easy reordering.',
      validation: r => r.required().integer().positive(),
    }),
    defineField({
      name: 'title',
      title: 'Step Title',
      type: 'string',
      description: 'Short label, e.g. "Extraction", "Formulation", "Third-Party Testing".',
      validation: r => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Factual explanation of this step. No health claims.',
      validation: r => r.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Image',
      type: 'image',
      options: { hotspot: false },
      description: 'Optional icon or illustration for this step (SVG or PNG, square preferred).',
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
  ],

  orderings: [
    {
      title: 'Step Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      order: 'order',
    },
    prepare: ({ title, order }) => ({
      title: `${order as number}. ${title as string}`,
    }),
  },
})
