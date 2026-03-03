import { defineQuery } from 'groq';

export const GET_SETTINGS_QUERY = defineQuery(
    `*[_type == "settings"] {
    _id,
    title,
    description,
}`
);

export const CLIENT_TYPES_QUERY = defineQuery(
    `*[_type == "clientType"] {
    _id,
    title,
    description,
    image[] {
      ...,
      asset -> {
        _id,
        url
      }
    }
  }`
);

export const GET_ABOUT_QUERY = defineQuery(
    `*[_id == "about"][0] {
    _id,
    heading,
    body,
    image {
      ...,
      asset -> {
        _id,
        url
      }
    }
  }`
);

export const GET_CONTACT_QUERY = defineQuery(
    `*[_id == "contact"][0] {
    _id,
    heading,
    phone,
    email,
    address,
    body,
    image {
      ...,
      asset -> {
        _id,
        url
      }
    }
  }`
);

