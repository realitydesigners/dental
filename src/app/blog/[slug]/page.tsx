import { notFound } from "next/navigation";
import { RichText } from "@/src/components/richtext";
import { SanityImage } from "@/src/components/sanity-image";
import { client } from "@/src/sanity/lib/client";
import { sanityFetch } from "@/src/sanity/lib/live";
import { queryBlogPaths, queryBlogSlugPageData } from "@/src/sanity/lib/query";
import { getMetaData } from "@/src/sanity/utils/seo";

async function fetchBlogSlugPageData(slug: string) {
  return await sanityFetch({
    query: queryBlogSlugPageData,
    params: { slug: `/blog/${slug}` },
  });
}

async function fetchBlogPaths() {
  const slugs = await client.fetch(queryBlogPaths);
  const paths: { slug: string }[] = [];
  for (const slug of slugs) {
    if (!slug) continue;
    const [, , path] = slug.split("/");
    if (path) paths.push({ slug: path });
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await fetchBlogSlugPageData(slug);
  if (!data) return getMetaData({});
  return getMetaData(data);
}

export async function generateStaticParams() {
  return await fetchBlogPaths();
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await fetchBlogSlugPageData(slug);
  if (!data) return notFound();
  const { title, description, image, richText } = data ?? {};

  return (
    <div className="container my-16 mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        <main>
          <header className="mb-8">
            <h1 className="mt-2 text-4xl font-bold">{title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{description}</p>
          </header>
          {image && (
            <div className="mb-12">
              <SanityImage
                asset={image}
                alt={title}
                width={1600}
                loading="eager"
                priority
                height={900}
                className="rounded-lg h-auto w-full"
              />
            </div>
          )}
          <RichText richText={richText ?? []} />
        </main>
      </div>
    </div>
  );
}
