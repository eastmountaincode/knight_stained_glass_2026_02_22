import * as SanityStructure from 'sanity/structure'
import * as Icons from './icons'

const SINGLETONS = ['settings', 'religious', 'commercial', 'residential']

const structure: SanityStructure.StructureResolver = (S) => {
  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(Icons.Settings)
        .child(S.document().schemaType('settings').documentId('settings')),

      S.divider(),

      S.listItem()
        .title('Religious')
        .icon(Icons.UserIcon)
        .child(S.document().schemaType('clientType').documentId('religious')),

      S.listItem()
        .title('Commercial')
        .icon(Icons.UserIcon)
        .child(S.document().schemaType('clientType').documentId('commercial')),

      S.listItem()
        .title('Residential')
        .icon(Icons.UserIcon)
        .child(S.document().schemaType('clientType').documentId('residential')),
    ])
}

export default structure
