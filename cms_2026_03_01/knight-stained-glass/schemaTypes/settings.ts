import * as Sanity from 'sanity';
import * as Icons from '../lib/icons';

const Settings = Sanity.defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: Icons.Settings,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the site. Will be displayed in the browser tab.',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'The description of the site. Used in search engine results and social media previews.',
    },
  ]
})

export default Settings;