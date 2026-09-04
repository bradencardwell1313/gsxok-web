// lib/about/content.ts
// About page content.
//
// Sanity already has a `manufacturingStep` document schema (see
// sanity/schemas/manufacturingStep.ts) but zero documents exist in the
// dataset yet. This file holds the same shape for the four process steps
// shown on the About page's "From formulation to final package" section.
// Swapping to live Sanity data later means: create manufacturingStep
// documents in Studio with these same order/title/description values, then
// have app/about/page.tsx call getManufacturingSteps() from
// lib/sanity/queries instead of importing PROCESS_STEPS.

export interface ProcessStep {
  order: number
  title: string
  description: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    order: 1,
    title: 'Formulate',
    description: 'Products begin with formulation and product development by GSX.',
  },
  {
    order: 2,
    title: 'Manufacture',
    description: 'The product is made in the Chelsea production facility.',
  },
  {
    order: 3,
    title: 'Package',
    description: 'Finished product moves into its final GSX packaging.',
  },
  {
    order: 4,
    title: 'Ready for Retail',
    description: 'Completed products are prepared for Oklahoma dispensary distribution.',
  },
]

// No corresponding Sanity schema exists for these yet — they are three short
// editorial statements, not a document collection. Kept here (rather than
// inline in the page) so the page component stays focused on layout.
export interface OperatingPillar {
  title: string
  description: string
}

export const OPERATING_PILLARS: OperatingPillar[] = [
  {
    title: 'Formulated In-House',
    description: 'Product development stays with the GSX team.',
  },
  {
    title: 'Manufactured In-House',
    description: 'GSX products are produced in our Chelsea operation.',
  },
  {
    title: 'Packaged In-House',
    description: 'Finished products are packaged by the same company that made them.',
  },
]
