import { defineType, defineField } from 'sanity'

// e.g. THC, CBD, CBN, CBG
export const cannabinoid = defineType({
  name: 'cannabinoid',
  title: 'Cannabinoid',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'abbreviation', title: 'Abbreviation', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'abbreviation' }, validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3,
      description: 'Factual description only. No health claims, no effect guarantees.' }),
  ],
  preview: { select: { title: 'abbreviation', subtitle: 'name' } },
})
