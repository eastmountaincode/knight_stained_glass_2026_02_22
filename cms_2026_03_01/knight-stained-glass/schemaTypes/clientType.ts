import * as Sanity from 'sanity';
import * as Icons from '../lib/icons';
import { defineField } from 'sanity';
import { OrnamentPicker } from '../lib/OrnamentPicker';

const ClientType = Sanity.defineType({
  name: 'clientType',
  title: 'Client Type',
  type: 'document',
  icon: Icons.UserIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    defineField({
      name: 'ornament',
      title: 'Section Ornament',
      type: 'string',
      description: 'Decorative symbol shown next to the section heading.',
      components: { input: OrnamentPicker },
    }),
    {
      name: 'image',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            defineField({
                name: 'alt',
                title: 'Alt Text',
                type: 'string',
                description: 'Describes the image for screen readers and SEO. Not visible on the site.',
            }),
            defineField({
                name: 'caption',
                title: 'Caption',
                type: 'string',
                description: 'Visible text that appears beneath the image on the site.',
            }),
          ],
          preview: {
            select: {
              title: 'asset.originalFilename',
              media: 'asset',
            },
          },
        },
      ],
    },
  ]
})

export default ClientType;