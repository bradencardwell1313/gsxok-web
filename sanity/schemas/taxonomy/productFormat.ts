import { defineType, defineField } from 'sanity'

// e.g. Bag, Single, Bar
export const productFormat = defineType({
  name: 'productFormat',
  title: 'Product Format',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
  ],
  preview: { select: { title: 'name' } },
})
