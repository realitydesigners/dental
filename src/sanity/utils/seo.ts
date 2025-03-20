import type { Metadata } from "next";

export const getBaseUrl = () => {
  if (process.env.VERCEL_ENV === "production") {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_ENV === "preview") {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};

interface OgImageOptions {
  type?: string;
  id?: string;
}

function getOgImage({ type, id }: OgImageOptions = {}): string {
  const params = new URLSearchParams();
  if (id) params.set("id", id);
  if (type) params.set("type", type);
  const baseUrl = getBaseUrl();
  const logoUrl = `${baseUrl}/api/og?${params.toString()}`;
  return logoUrl;
}

// Define a type for Sanity slug
interface SanitySlug {
  _type?: string;
  current: string;
}

interface MetaDataInput {
  _type?: string | null;
  seoDescription?: string | null;
  seoTitle?: string | null;
  slug?: string | SanitySlug | null;
  title?: string | null;
  description?: string | null;
  _id?: string | null;
}

export function getMetaData(data: MetaDataInput): Metadata {
  const { _type, seoDescription, seoTitle, slug, title, description, _id } =
    data ?? {};

  const baseUrl = getBaseUrl();
  const pageSlug = typeof slug === "string" ? slug : (slug?.current ?? "");
  const pageUrl = `${baseUrl}${pageSlug}`;

  const meta = {
    title: seoTitle ?? title ?? "",
    description: seoDescription ?? description ?? "",
  };

  const ogImage = getOgImage({
    type: _type ?? undefined,
    id: _id ?? undefined,
  });

  return {
    title: `${meta.title} | Roboto Studio Demo`,
    description: meta.description,
    metadataBase: new URL(baseUrl),
    creator: "Roboto Studio Demo",
    authors: [{ name: "Roboto" }],
    icons: {
      icon: `${baseUrl}/favicon.ico`,
    },
    keywords: [
      "roboto",
      "studio",
      "demo",
      "sanity",
      "next",
      "react",
      "template",
    ],
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
      creator: "@studioroboto",
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      countryName: "UK",
      description: meta.description,
      title: meta.title,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: meta.title,
          secureUrl: ogImage,
        },
      ],
      url: pageUrl,
    },
  };
}
