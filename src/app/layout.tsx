import "@/src/globals.css";

import { revalidatePath, revalidateTag } from "next/cache";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { Suspense } from "react";
import { preconnect, prefetchDNS } from "react-dom";

import { FooterServer, FooterSkeleton } from "../components/footer";
import { NavbarServer, NavbarSkeleton } from "../components/navbar";
import { PreviewBar } from "../components/preview-bar";
import { SanityLive } from "../sanity/lib/live";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preconnect("https://cdn.sanity.io");
  prefetchDNS("https://cdn.sanity.io");
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-geist antialiased`}>
        <Suspense fallback={<NavbarSkeleton />}>
          <NavbarServer />
        </Suspense>
        {(await draftMode()).isEnabled ? (
          <>
            {children}
            <VisualEditing
              refresh={async (payload) => {
                "use server";
                if (payload.source === "manual") {
                  revalidatePath("/", "layout");
                  return;
                }
                const id = payload?.document?._id?.startsWith("drafts.")
                  ? payload?.document?._id.slice(7)
                  : payload?.document?._id;
                const slug = payload?.document?.slug?.current;
                const type = payload?.document?._type;
                for (const tag of [slug, id, type]) {
                  if (tag) revalidateTag(tag);
                }
              }}
            />
            <PreviewBar />
          </>
        ) : (
          children
        )}
        <Suspense fallback={<FooterSkeleton />}>
          <FooterServer />
        </Suspense>
        <SanityLive />
      </body>
    </html>
  );
}
