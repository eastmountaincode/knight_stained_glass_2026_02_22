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
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ]
})

export default Settings;