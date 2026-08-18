import { defineType, defineField } from 'sanity'

export const educationArticle = defineType({
  name: 'educationArticle',
  title: 'Education Article',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Meta' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'educationCategory' }],
      group: 'content',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'One or two sentences shown in article cards and meta description. Factual only.',
      validation: r => r.required().max(280),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      description: 'Factual, informational copy only. No health claims.',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: r => r.required() }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'meta',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: r => r.required() }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'meta',
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      group: 'meta',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'meta',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string', validation: r => r.max(60) }),
        defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2, validation: r => r.max(160) }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
      category: 'category.name',
    },
    prepare: ({ title, media, category }) => ({
      title,
      subtitle: category,
      media,
    }),
  },
})
