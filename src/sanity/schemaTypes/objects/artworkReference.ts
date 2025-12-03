import { defineField, defineType } from "sanity";

export const artworkReference = defineType({
  name: "artworkReference",
  type: "object",
  fields: [
    defineField({
      title: "Artwork",
      name: "artwork",
      type: "reference",
      weak: true,
      to: [{ type: "artwork" }],
    }),
  ],
  preview: {
    select: {
      title: "artwork.title",
    },
  },
});
