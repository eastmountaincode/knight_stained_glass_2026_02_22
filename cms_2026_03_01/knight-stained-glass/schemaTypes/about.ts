import { defineType, defineField } from 'sanity'
import * as Icons from '../lib/icons'
import { OrnamentPicker } from '../lib/OrnamentPicker'

const About = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: Icons.Person,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'ornament',
      title: 'Section Ornament',
      type: 'string',
      description: 'Decorative symbol shown next to the section heading.',
      components: { input: OrnamentPicker },
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describes the image for screen readers and SEO. Not visible on the site.',
        }),
      ],
    }),
  ],
})

export default About
