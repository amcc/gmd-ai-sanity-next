import { defineField, defineType } from "sanity";

export const linkItem = defineType({
  title: "Link",
  name: "linkItem",
  type: "object",
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "URL",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Link title",
    }),
  ],
});
