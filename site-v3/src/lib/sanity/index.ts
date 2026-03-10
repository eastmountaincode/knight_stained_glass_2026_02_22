import * as SanityClient from '@sanity/client';
import * as SanityImage from '@sanity/image-url';
import { draftMode } from 'next/headers';

import * as Queries from './queries';

const client = SanityClient.createClient({
  projectId: 'ra7jpks1',
  dataset: 'production',
  apiVersion: '2026-03-01',
  useCdn: true,
});

const draftClient = SanityClient.createClient({
  projectId: 'ra7jpks1',
  dataset: 'production',
  apiVersion: '2026-03-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'drafts',
});

export async function sanityFetch<T>(query: string): Promise<T> {
  const { isEnabled } = await draftMode();
  const c = isEnabled ? draftClient : client;
  return c.fetch(query);
}

const builder = SanityImage.createImageUrlBuilder(client);

export function urlFor(source: SanityImage.SanityImageSource) {
  return builder.image(source);
}

export const Settings = {
  get: () => sanityFetch<any>(Queries.GET_SETTINGS_QUERY),
};

export const Hero = {
  get: () => sanityFetch<any>(Queries.GET_HERO_QUERY),
};

export const ClientTypes = {
  get: () => sanityFetch<any[]>(Queries.CLIENT_TYPES_QUERY),
};

export const About = {
  get: () => sanityFetch<any>(Queries.GET_ABOUT_QUERY),
};

export const Contact = {
  get: () => sanityFetch<any>(Queries.GET_CONTACT_QUERY),
};