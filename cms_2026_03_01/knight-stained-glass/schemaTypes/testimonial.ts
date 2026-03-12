import { defineType, defineField } from 'sanity'
import { Megaphone } from 'lucide-react'
import { OrnamentPicker } from '../lib/OrnamentPicker'

const testimonialFields = [
  defineField({ name: 'author', title: 'Name', type: 'string', validation: (r) => r.required() }),
  defineField({ name: 'quote', title: 'Quote', type: 'text', validation: (r) => r.required() }),
  defineField({ name: 'context', title: 'Context', description: 'e.g. "St. Raphael Parish, Cincinnati"', type: 'string' }),
]

const Testimonials = defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'document',
  icon: Megaphone,
  preview: {
    prepare: () => ({ title: 'Testimonials' }),
  },
  fields: [
    defineField({
      name: 'ornament',
      title: 'Section Ornament',
      type: 'string',
      description: 'Decorative symbol shown next to the section heading.',
      components: { input: OrnamentPicker },
    }),
    defineField({
      name: 'testimonial1',
      title: 'Testimonial 1',
      type: 'object',
      fields: testimonialFields,
    }),
    defineField({
      name: 'testimonial2',
      title: 'Testimonial 2',
      type: 'object',
      fields: testimonialFields,
    }),
    defineField({
      name: 'testimonial3',
      title: 'Testimonial 3',
      type: 'object',
      fields: testimonialFields,
    }),
  ],
})

export default Testimonials
