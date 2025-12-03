import { defineType } from "sanity";

export const biographyReference = defineType({
  name: "biographyReference",
  type: "object",
  fields: [
    {
      title: "Biography",
      name: "biography",
      type: "reference",
      weak: true,
      to: [{ type: "biography" }],
    },
  ],
  preview: {
    select: {
      title: "biography.title",
    },
  },
});
