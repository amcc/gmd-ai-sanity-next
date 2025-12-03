import { defineQuery } from "next-sanity";

export const REDIRECTS_QUERY = defineQuery(`*[_type == "redirect"]{
  _id, short, destination, description
}`);

export const REDIRECT_QUERY =
  defineQuery(`*[_type == "artwork" && short == $slug][0]{
  _id, short, slug
}`);

export const FAQS_QUERY =
  defineQuery(`*[_type == "faq" && defined(question) && defined(answer) && !(_id in path("drafts.**"))] | order(coalesce(order, 9999) asc, _createdAt asc){
  _id,
  question,
  answer,
  order
}`);

export const ARTWORKS_QUERY =
  defineQuery(`*[_type == "artwork"] | order(dateTime(publishedAt) desc){
  _id, 
  title, 
  slug,
  publishedAt,
  artworkDate,
  priority,
  major,
  categories[]->{
    _id,
    title
  },
  mainImage{
    asset->{
      _id,
      _ref,
      url,
      metadata
    },
  },
  description,
  briefDescription,
}`);

export const ARTWORK_QUERY =
  defineQuery(`*[_type == "artwork" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  shortTitle,
  publishedAt,
  artworkDate,
  mainImage{
    asset->{
      _id,
      _ref,
      url,
      metadata
    },
  },
  artworks[] {
    ...,
    asset->{
      _id,
      _ref,
      url,
      metadata
    },
  },
  categories[]->{
    _id,
    title
  },
  material,
  dimensions {
    width,
    height,
    depth,
    units
  },
  description[] {
    ...,
    _type == "image" => {
      ...,
      asset->{
        _id,
        _ref,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          },
          lqip,
          blurHash,
          hasAlpha,
          isOpaque,
          palette
        }
      }
    }
  },

  links[] {
    title,
    url
  },
  downloads[] {
    asset->{
      _id,
      url
    }
  },
  "relatedArtworks": relatedArtworks[].artwork->{
    _id,
    title,
    slug,
    shortTitle,
    artworkDate,
    mainImage{
      asset->{
        _id,
        _ref,
        url,
        metadata
      }
    },
  },
  "relatedBiography": relatedBiography[].biography->{
    _id,
    title,
    slug,
    shortTitle,
    startDate,
    endDate,
    type,
    mainImage{
      asset->{
        _id,
        _ref,
        url,
        metadata
      }
    },
  },
}`);

export const BIOGRAPHY_QUERY =
  defineQuery(`*[_type == "biography" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  shortTitle,
  startDate,
  endDate,
  type,
  mainImage{
    asset->{
      _id,
      _ref,
      url,
      metadata
    },
  },
  artworks[] {
    ...,
    asset->{
      _id,
      _ref,
      url,
      metadata
    },
  },
  address,
  description[] {
    ...,
    _type == "image" => {
      ...,
      asset->{
        _id,
        _ref,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          },
          lqip,
          blurHash,
          hasAlpha,
          isOpaque,
          palette
        }
      }
    }
  },
  "relatedArtworks": relatedArtworks[].artwork->{
    _id,
    title,
    slug,
    mainImage{
      asset->{
        _id,
        _ref,
        url,
        metadata
      }
    },
  },
  "relatedBiography": relatedBiography[].biography->{
    _id,
    title,
    slug,
    type,
    mainImage{
      asset->{
        _id,
        _ref,
        url,
        metadata
      }
    },
  },
  categories[]->{
    _id,
    title
  },
  links[] {
    title,
    url
  },
  downloads[] {
    asset->{
      _id,
      url
    }
  }
}`);

export const BIOGRAPHIES_QUERY =
  defineQuery(`*[_type == "biography"] | order(dateTime(startDate) desc){
    _id,
    title,
    startDate,
    endDate,
    slug,
    description,
    type,
    address,
    mainImage{
      asset->{
        _id,
        _ref,
        url,
        metadata
      }
    },
}`);

export const CURRENT_BIOGRAPHIES_QUERY =
  defineQuery(`*[_type == "biography" && (type == "group" || type == "solo") && startDate <= now() && endDate >= now()] | order(dateTime(startDate) asc){
    _id,
    title,
    startDate,
    endDate,
    slug,
    mainImage{
      asset->{
        _id,
        _ref,
        url,
        metadata
      }
    },
}`);

export const UPCOMING_BIOGRAPHIES_QUERY =
  defineQuery(`*[_type == "biography" && (type == "group" || type == "solo") && startDate > now()] | order(dateTime(startDate) asc){
    _id,
    title,
    startDate,
    endDate,
    slug,
    mainImage{
      asset->{
        _id,
        _ref,
        url,
        metadata
      }
    },
}`);

export const ALL_SHOWS_QUERY =
  defineQuery(`*[_type == "biography" && (type == "group" || type == "solo")] | order(dateTime(startDate) asc){
    _id,
    title,
    startDate,
    endDate,
    slug,
    mainImage{
      asset->{
        _id,
        _ref,
        url,
        metadata
      }
    },
}`);

export const HOMEPAGE_QUERY = defineQuery(`*[_type == "homepageSingleton"][0]{
  _id,
  title,
  description,
  artworks[] {
    _type,
    _type == "imageItem" => {
      asset->{
        _id,
        _ref,
        url,
        metadata
      },
      alt,
      caption
    },
    _type == "videoItem" => {
      asset->{
        _id,
        _ref,
        url
      },
      alt,
      caption
    }
  },
   artworkReference->{
    _id,
    title,
    slug,
    mainImage{
      asset->{
        _id,
        _ref,
        url,
        metadata
      }
    },
  },
}`);

export const STUDIOS_QUERY =
  defineQuery(`*[_type == "studio"] | order(dateTime(publishedAt) desc){
  _id, 
  title, 
  slug,
  publishedAt,
  categories[]->{
    _id,
    title
  },
  mainImage{
    asset->{
      _id,
      _ref,
      url,
      metadata
    },
  },
  description,
}`);

export const STUDIO_QUERY =
  defineQuery(`*[_type == "studio" && slug.current == $slug][0]{
  _id, 
  title, 
  slug,
  publishedAt,
  mainImage{
    asset->{
      _id,
      _ref,
      url,
      metadata
    },
  },
  media[] {
    ...,
    asset->{
      _id,
      _ref,
      url,
      metadata
    },
  },
  description[] {
    ...,
    _type == "block" => {
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          href,
          _type
        }
      }
    },
    _type == "image" => {
      ...,
      asset->{
        _id,
        _ref,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          },
          lqip,
          blurHash,
          hasAlpha,
          isOpaque,
          palette
        }
      }
    },
    _type == "artworkReference" => {
      ...,
      artwork->{
        _id,
        title,
        slug,
        artworkDate,
        mainImage{
          asset->{
            _id,
            _ref,
            url,
            metadata
          }
        }
      }
    }
  },
  "relatedArtworks": relatedArtworks[].artwork->{
    _id,
    title,
    slug,
    mainImage{
      asset->{
        _id,
        _ref,
        url,
        metadata
      }
    },
  },
  "relatedBiography": relatedBiography[].biography->{
    _id,
    title,
    slug,
    type,
    mainImage{
      asset->{
        _id,
        _ref,
        url,
        metadata
      }
    },
  },
  categories[]->{
    _id,
    title
  },
  links[] {
    title,
    url
  },
  downloads[] {
    asset->{
      _id,
      url
    }
  }
}`);
