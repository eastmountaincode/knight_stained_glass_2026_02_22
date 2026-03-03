import { defineType, defineField } from 'sanity'
import * as Icons from '../lib/icons'

const Contact = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  icon: Icons.Phone,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Additional Text',
      type: 'text',
      description: 'Any extra text to display in the contact section',
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
        }),
      ],
    }),
  ],
})

export default Contact
