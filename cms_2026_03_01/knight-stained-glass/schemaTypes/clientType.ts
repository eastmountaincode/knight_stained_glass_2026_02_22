import * as Sanity from 'sanity';
import * as Icons from '../lib/icons';
import { defineField } from 'sanity';

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
                title: 'Alt',
                type: 'string',
            }),
            defineField({
                name: 'caption',
                title: 'Caption',
                type: 'string',
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