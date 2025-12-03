import { defineArrayMember, defineField, defineType } from "sanity";

export const homepageSingleton = defineType({
  name: "homepageSingleton",
  title: "Home Page",
  type: "document",
  // @ts-expect-error will need to be fixed in the future
  __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],

  fields: [
    defineField({
      name: "title",
      title: "Home Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      title: "Background Artwork",
      name: "artworks",
      type: "array",
      description:
        "Add images and video - only the first is used, but sometimes its handy to keep some others",
      of: [
        defineArrayMember({
          title: "Image",
          name: "imageItem",
          type: "imageItem",
        }),
        defineArrayMember({
          title: "Video",
          name: "videoItem",
          type: "videoItem",
        }),
      ],
    }),
    // defineField({
    //   title: "Artwork",
    //   name: "artworkReference",
    //   type: "reference",
    //   weak: true,
    //   to: [{ type: "artwork" }],
    // }),
  ],
});
