import { defineArrayMember, defineField, defineType } from "sanity";

export const linkPageSingleton = defineType({
  name: "linkPageSingleton",
  title: "Link Page",
  type: "document",
  // @ts-expect-error will need to be fixed in the future
  __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],

  fields: [
    defineField({
      name: "title",
      title: "Link Page Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      title: "Links",
      name: "links",
      type: "array",
      description: "Add a link, or choose a related artwork or biography item.",
      of: [
        defineArrayMember({
          title: "Link",
          name: "linkPageItem",
          type: "linkPageItem",
        }),
      ],
    }),
  ],
});
