import { defineType, defineField } from 'sanity'

const Hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Hero' }
    },
  },
  fields: [
    defineField({
      name: 'desktopImage',
      title: 'Desktop Hero Image',
      description: 'Shown on screens wider than 1024px',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile Hero Image',
      description: 'Shown on screens narrower than 1024px',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
  ],
})

export default Hero
