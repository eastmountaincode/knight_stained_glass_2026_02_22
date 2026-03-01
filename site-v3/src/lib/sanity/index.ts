import * as SanityClient from '@sanity/client';
import * as SanityImage from '@sanity/image-url';

import * as Queries from './queries';

export const client = SanityClient.createClient({
  projectId: 'ra7jpks1',
  dataset: 'production',
  apiVersion: '2026-03-01',
  useCdn: true,
});

const builder = SanityImage.createImageUrlBuilder(client);

export function urlFor(source: SanityImage.SanityImageSource) {
  return builder.image(source);
}

export const Settings = {
  get: async () => {
    const settings = await client.fetch(Queries.GET_SETTINGS_QUERY);
    return settings;
  },
};

export const ClientTypes = {
  get: async () => {
    const clientTypes = await client.fetch(Queries.CLIENT_TYPES_QUERY);
    return clientTypes;
  },
};