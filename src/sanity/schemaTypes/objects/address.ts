import { defineField, defineType } from "sanity";

export const address = defineType({
  title: "Address",
  name: "address",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", title: "Location name" }),
    defineField({ name: "street", type: "string", title: "Street" }),
    defineField({ name: "city", type: "string", title: "City" }),
    defineField({ name: "postcode", type: "string", title: "Post Code / ZIP" }),
    defineField({ name: "country", type: "string", title: "Country" }),
  ],
});
