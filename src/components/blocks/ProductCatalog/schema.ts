import { defineField, defineType } from "sanity";
import { Stethoscope } from "lucide-react";

export const productCatalog = defineType({
  name: "productCatalog",
  title: "Product Catalog",
  icon: Stethoscope,
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Main heading for this section",
    }),
    defineField({
      name: "subtitle",
      type: "string",
      title: "Subtitle",
      description: "A supporting headline",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      description: "Detailed content for this section",
      rows: 3,
    }),
    // Add more fields as needed
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
    prepare: ({ title, subtitle }) => ({
      title: title || "Untitled",
      subtitle: subtitle || "ProductCatalog Block",
    }),
  },
});
