import * as SanityClient from '@sanity/client';
import * as SanityImage from '@sanity/image-url';

import * as Queries from './queries';

export const client = SanityClient.createClient({
  projectId: 'ra7jpks1',
  dataset: 'production',
  apiVersion: '2026-03-01',
  useCdn: true,
});

export const draftClient = SanityClient.createClient({
  projectId: 'ra7jpks1',
  dataset: 'production',
  apiVersion: '2026-03-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'drafts',
});

const builder = SanityImage.createImageUrlBuilder(client);

export function urlFor(source: SanityImage.SanityImageSource) {
  return builder.image(source);
}

export const Settings = {
  get: async (c = client) => {
    const settings = await c.fetch(Queries.GET_SETTINGS_QUERY);
    return settings;
  },
};

export const ClientTypes = {
  get: async (c = client) => {
    const clientTypes = await c.fetch(Queries.CLIENT_TYPES_QUERY);
    return clientTypes;
  },
};