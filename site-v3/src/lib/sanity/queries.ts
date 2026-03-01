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

