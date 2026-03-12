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
    ornament,
    image[] {
      ...,
      asset -> {
        _id,
        url
      }
    }
  }`
);

export const GET_HERO_QUERY = defineQuery(
    `*[_id == "hero"][0] {
    _id,
    desktopImage {
      ...,
      asset -> {
        _id,
        url
      }
    },
    mobileImage {
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
    ornament,
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

export const GET_TESTIMONIALS_QUERY = defineQuery(
  `*[_id == "testimonials"][0] {
    _id,
    ornament,
    testimonial1 { author, quote, context },
    testimonial2 { author, quote, context },
    testimonial3 { author, quote, context },
  }`
);

export const GET_CONTACT_QUERY = defineQuery(
    `*[_id == "contact"][0] {
    _id,
    heading,
    ornament,
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

