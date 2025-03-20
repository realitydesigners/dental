import { Megaphone } from "lucide-react";
import { defineField, defineType } from "sanity";

import {
  buttonsField,
  richTextField,
} from "../../../sanity/schemaTypes/common";

export const cta = defineType({
  name: "cta",
  type: "object",
  icon: Megaphone,
  fields: [
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      description: "Choose the visual style of the CTA block",
      options: {
        list: [
          { title: "Simple Center", value: "simple" },
          { title: "Split with Image", value: "split" },
          { title: "Gradient Background", value: "gradient" },
          { title: "Card Style", value: "card" },
        ],
      },
      initialValue: "gradient",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description:
        "Optional small text above the title (e.g., 'Limited Time Offer')",
      initialValue: "Special Offer",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The main heading of your CTA",
      validation: (Rule) => Rule.required(),
      initialValue: "Transform Your Practice with Premium Dental Equipment",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Optional secondary heading below the title",
      initialValue: "Get exclusive deals on our most popular dental supplies",
    }),
    {
      ...richTextField,
      initialValue: [
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
    },
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Optional image for split or card layouts",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      description: "Optional background image (works best with gradient style)",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      description:
        "Optional statistics to display (e.g., '1000+ Products', '24/7 Support')",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "value",
              type: "string",
              title: "Value",
              description: "The numerical or text value (e.g., '1000+')",
            }),
            defineField({
              name: "label",
              type: "string",
              title: "Label",
              description: "Description of the value (e.g., 'Products')",
            }),
          ],
        },
      ],
      initialValue: [
        { value: "5000+", label: "Products" },
        { value: "24/7", label: "Support" },
        { value: "98%", label: "Satisfaction" },
        { value: "Next Day", label: "Delivery" },
      ],
    }),
    {
      ...buttonsField,
      initialValue: [
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
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      style: "style",
    },
    prepare: ({ title, subtitle, style }) => ({
      title: title || "CTA Block",
      subtitle: style
        ? `${style.charAt(0).toUpperCase() + style.slice(1)} Style${subtitle ? ` - ${subtitle}` : ""}`
        : "Simple Style",
      media: Megaphone,
    }),
  },
});
