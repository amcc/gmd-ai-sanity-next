import { defineField, defineType } from "sanity";

export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    defineField({
      name: "short",
      type: "string",
      title: "Short link url",
      description:
        "Only use letters, numbers, and dashes (hypens). Try to use a standard pattern like: current year - GMD year - brief - description, e.g. 24-y1-colour-1",
      validation: (Rule) => [
        Rule.regex(/^[A-Za-z0-9-]+$/, {
          name: "short-url", // Error message is "Does not match email-pattern"
          invert: false, // Boolean to allow any value that does NOT match pattern
        }).error("Only use letters, numbers, and dashes (hypens)"),
        Rule.required().error("You must complete this field"),
      ],
    }),
    defineField({
      name: "destination",
      type: "url",
      title: "Destination",
      description:
        "This must be a valid url (starting with http:// or https://)",
      validation: (Rule) =>
        Rule.required().error("You must complete this field"),
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Description",
      description: "A brief description of the destination page",
    }),
  ],
  preview: {
    select: {
      title: "short",
      subtitle: "destination",
    },
  },
});
