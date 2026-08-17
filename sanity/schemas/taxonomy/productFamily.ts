import { defineType, defineField } from 'sanity'

// e.g. Crunchers, Bites, Gummies
export const productFamily = defineType({
  name: 'productFamily',
  title: 'Product Family',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
  ],
  preview: { select: { title: 'name' } },
})
