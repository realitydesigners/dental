import { LayoutPanelTop, Link, PanelTop } from "lucide-react";
import { defineField, defineType } from "sanity";

const navbarLink = defineField({
  name: "navbarLink",
  type: "object",
  icon: Link,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "Name for the link",
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Description",
      description: "Optional description for mega menu items",
    }),
    defineField({
      name: "url",
      type: "customUrl",
    }),
  ],
  preview: {
    select: {
      title: "name",
      externalUrl: "url.external",
      urlType: "url.type",
      internalUrl: "url.internal.slug.current",
      openInNewTab: "url.openInNewTab",
    },
    prepare({ title, externalUrl, urlType, internalUrl, openInNewTab }) {
      const url = urlType === "external" ? externalUrl : internalUrl;
      const newTabIndicator = openInNewTab ? " ↗" : "";
      const truncatedUrl =
        url?.length > 30 ? `${url.substring(0, 30)}...` : url;

      return {
        title: title || "Untitled Link",
        subtitle: `${urlType === "external" ? "External" : "Internal"} • ${truncatedUrl}${newTabIndicator}`,
        media: Link,
      };
    },
  },
});

const navbarColumn = defineField({
  name: "navbarColumn",
  type: "object",
  icon: LayoutPanelTop,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Title for the dropdown/mega menu",
    }),
    defineField({
      name: "links",
      type: "array",
      title: "Links",
      description: "Links for the dropdown/mega menu",
      of: [navbarLink],
    }),
  ],
  preview: {
    select: {
      title: "title",
      links: "links",
    },
    prepare({ title, links = [] }) {
      return {
        title: title || "Untitled Menu",
        subtitle: `${links.length} link${links.length === 1 ? "" : "s"}`,
      };
    },
  },
});

export const navbar = defineType({
  name: "navbar",
  type: "document",
  title: "Navigation",
  icon: PanelTop,
  fields: [
    defineField({
      name: "label",
      type: "string",
      initialValue: "Navigation",
      title: "Label",
      description: "Label used to identify navigation in the CMS",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "columns",
      type: "array",
      title: "Menu Items",
      description:
        "Add main navigation items (can be simple links or dropdown menus)",
      of: [navbarColumn, navbarLink],
    }),
    defineField({
      name: "buttons",
      type: "array",
      title: "CTA Buttons",
      description: "Add call-to-action buttons to the navbar",
      of: [{ type: "button" }],
    }),
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare: ({ title }) => ({
      title: title || "Navigation",
      media: PanelTop,
    }),
  },
});
