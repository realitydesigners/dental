import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { createSlug } from "../../utils/slug";
import { pageBuilderField } from "../common";

export const homePage = defineType({
  name: "homePage",
  type: "document",
  title: "Home Page",
  icon: HomeIcon,
  description:
    "This is where you create the main page visitors see when they first come to your website. Think of it like the front door to your online home - you can add a welcoming title, a short description, and build the page with different sections like pictures, text, and buttons.",
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      type: "string",
      description:
        "The main heading that will appear at the top of your home page",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description:
        "A short summary that tells visitors what your website is about. This text also helps your page show up in Google searches.",
      rows: 3,
      group: GROUP.MAIN_CONTENT,
      validation: (rule) => [
        rule
          .min(140)
          .warning(
            "The meta description should be at least 140 characters for optimal SEO visibility in search results"
          ),
        rule
          .max(160)
          .warning(
            "The meta description should not exceed 160 characters as it will be truncated in search results"
          ),
      ],
    }),
    defineField({
      name: "slug",
      type: "slug",
      description:
        "The web address for your home page. Usually this is just '/' for the main page of your website.",
      group: GROUP.MAIN_CONTENT,
      options: {
        source: "title",
        slugify: createSlug,
      },
      validation: (Rule) => Rule.required(),
    }),
    {
      ...pageBuilderField,
      initialValue: [
        {
          _type: "cta",
          style: "gradient",
          eyebrow: "Special Offer",
          title: "Transform Your Practice with Premium Dental Equipment",
          subtitle: "Get exclusive deals on our most popular dental supplies",
          richText: [
            {
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "Join thousands of dental professionals who trust us for their equipment and supply needs. Enjoy premium quality, competitive prices, and exceptional service.",
                },
              ],
            },
          ],
          stats: [
            { value: "5000+", label: "Products" },
            { value: "24/7", label: "Support" },
            { value: "98%", label: "Satisfaction" },
            { value: "Next Day", label: "Delivery" },
          ],
          buttons: [
            {
              _type: "button",
              label: "Browse Products",
              variant: "default",
              link: { href: "/products", type: "internal" },
            },
            {
              _type: "button",
              label: "Contact Sales",
              variant: "outline",
              link: { href: "/contact", type: "internal" },
            },
          ],
        },
      ],
    },
    ...seoFields.filter(
      (field) => !["seoNoIndex", "seoHideFromLists"].includes(field.name)
    ),
    ...ogFields,
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      slug: "slug.current",
    },
    prepare: ({ title, description, slug }) => ({
      title: title || "Untitled Home Page",
      media: HomeIcon,
      subtitle: slug || "Home Page",
    }),
  },
});
