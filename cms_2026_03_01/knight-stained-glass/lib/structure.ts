import * as SanityStructure from 'sanity/structure'
import * as Icons from './icons'

const SINGLETONS = ['settings', 'hero', 'religious', 'commercial', 'residential', 'about', 'contact']

const structure: SanityStructure.StructureResolver = (S) => {
  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(Icons.Settings)
        .child(S.document().schemaType('settings').documentId('settings')),

      S.listItem()
        .title('Hero')
        .icon(Icons.RichImage)
        .child(S.document().schemaType('hero').documentId('hero')),

      S.divider(),
      S.listItem()
        .title('Client Types')
        .icon(Icons.UserIcon)
        .child(
          S.list()
            .title('Client Types')
            .items([
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
        ),

      S.divider(),

      S.listItem()
        .title('About')
        .icon(Icons.Person)
        .child(S.document().schemaType('about').documentId('about')),

      S.listItem()
        .title('Contact')
        .icon(Icons.Phone)
        .child(S.document().schemaType('contact').documentId('contact')),
    ])
}

export default structure
