import { defineField, defineType } from "sanity";

export const dimensions = defineType({
  title: "Dimensions",
  name: "dimensions",
  type: "object",
  fields: [
    defineField({ name: "width", type: "string", title: "Width" }),
    defineField({ name: "height", type: "string", title: "Height" }),
    defineField({ name: "depth", type: "string", title: "Depth" }),
    defineField({
      title: "Units",
      name: "units",
      type: "string",
      // validation: (Rule) =>
      // Rule.required().warning("please select a dimension"),
      options: {
        layout: "radio",
        direction: "horizontal",
        list: [
          { title: "mm", value: "mm" },
          { title: "cm", value: "cm" },
          { title: "m", value: "m" },
        ],
      },
    }),
  ],
});
