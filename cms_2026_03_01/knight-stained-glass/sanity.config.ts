import {createElement} from 'react'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemaTypes'
import structure from './lib/structure'

export default defineConfig({
  name: 'default',
  title: 'Knight Stained Glass',

  projectId: 'ra7jpks1',
  dataset: 'production',

  icon: () => createElement('img', {
    src: '/static/shield-logo.png',
    alt: 'Knight Stained Glass',
    style: {width: '100%', height: '100%', objectFit: 'contain' as const},
  }),

  plugins: [structureTool({structure}), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
})
