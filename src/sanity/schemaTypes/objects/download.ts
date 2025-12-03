import { defineField, defineType } from "sanity";

export const download = defineType({
  title: "Download",
  name: "download",
  type: "file",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      // options: {
      //   isHighlighted: true, // <-- make this field easily accessible
      // },
    }),

    defineField({
      name: "description",
      type: "string",
      title: "Description",
      // options: {
      //   isHighlighted: true, // <-- make this field easily accessible
      // },
    }),
  ],
});
