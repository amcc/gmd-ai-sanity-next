import { defineField, defineType } from "sanity";

export const linkPageItem = defineType({
  title: "Link with Description",
  name: "linkPageItem",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Link title",
      description:
        "This title will override related artwork or biography title if present.",
    }),
    defineField({
      name: "url",
      type: "url",
      title: "URL",
    }),
    defineField({
      name: "newTab",
      title: "Open in new tab",
      type: "boolean",
      initialValue: true,
    }),
    // defineField({
    //   title: "Related artwork",
    //   name: "artworkReference",
    //   type: "artworkReference",
    //   description: "This field will override the URL field if present.",
    // }),
    // defineField({
    //   title: "Related biography",
    //   name: "biographyReference",
    //   type: "biographyReference",
    //   description: "This field will override the URL field if present.",
    // }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
  ],
});
