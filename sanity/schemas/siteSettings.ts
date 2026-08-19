import { defineType, defineField } from 'sanity'

// Singleton document — one instance, accessed via a fixed document ID.
// Convention: use ID "siteSettings" in the studio config.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identity', default: true },
    { name: 'seo', title: 'SEO & Social' },
    { name: 'contact', title: 'Contact' },
    { name: 'banners', title: 'Banners' },
  ],
  fields: [
    // ── Identity ──────────────────────────────────────────
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'identity',
      initialValue: 'Green Science Extracts',
      validation: r => r.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'identity',
      description: 'Used in meta titles and hero copy.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'identity',
      options: { hotspot: false },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string', initialValue: 'Green Science Extracts' }),
      ],
    }),
    defineField({
      name: 'logoLight',
      title: 'Logo (Light / Inverted)',
      type: 'image',
      group: 'identity',
      description: 'Used on dark backgrounds.',
      options: { hotspot: false },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string', initialValue: 'Green Science Extracts' }),
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Homepage Hero Image',
      type: 'image',
      group: 'identity',
      description: 'Full-bleed hero image on the homepage. Best options: 56E9BD64 or 55323CB6 from the media library.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string', initialValue: 'Green Science Extracts facility' }),
      ],
    }),
    defineField({
      name: 'processImage',
      title: 'Manufacturing Process Image',
      type: 'image',
      group: 'identity',
      description: 'Split-panel image on the homepage manufacturing section. Best option: F1ABAA24 (horizontal process shot).',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string', initialValue: 'GSX manufacturing process' }),
      ],
    }),

    // ── SEO & Social ──────────────────────────────────────
    defineField({
      name: 'defaultMetaTitle',
      title: 'Default Meta Title',
      type: 'string',
      group: 'seo',
      validation: r => r.max(60),
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 2,
      group: 'seo',
      validation: r => r.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Default OG Image',
      type: 'image',
      group: 'seo',
      description: 'Fallback Open Graph image for link previews. 1200×630px recommended.',
      options: { hotspot: true },
    }),

    // ── Contact ───────────────────────────────────────────
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      group: 'contact',
      initialValue: 'sales@gsxok.com',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'address',
      title: 'Mailing Address',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({ name: 'street', title: 'Street', type: 'string' }),
        defineField({ name: 'city', title: 'City', type: 'string', initialValue: 'Chelsea' }),
        defineField({ name: 'state', title: 'State', type: 'string', initialValue: 'OK' }),
        defineField({ name: 'zip', title: 'ZIP', type: 'string', initialValue: '74016' }),
      ],
    }),

    // ── Banners ───────────────────────────────────────────
    defineField({
      name: 'siteBanner',
      title: 'Site-Wide Banner',
      type: 'object',
      group: 'banners',
      description: 'Optional announcement banner shown at the top of every page.',
      fields: [
        defineField({ name: 'enabled', title: 'Show Banner', type: 'boolean', initialValue: false }),
        defineField({ name: 'message', title: 'Message', type: 'string' }),
        defineField({
          name: 'variant',
          title: 'Variant',
          type: 'string',
          options: {
            list: [
              { title: 'Neutral', value: 'neutral' },
              { title: 'Alert', value: 'alert' },
            ],
          },
          initialValue: 'neutral',
        }),
      ],
    }),
  ],

  preview: {
    select: { title: 'siteName' },
  },
})
