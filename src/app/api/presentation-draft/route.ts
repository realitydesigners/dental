import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { client } from "@/src/sanity/lib/client";
import { token } from "@/src/sanity/lib/token";

// Helper to manage draft mode
const enabler = defineEnableDraftMode({
  client: client.withConfig({ token }),
});

// Store last revalidation time
let lastRevalidationTime = 0;
const REVALIDATION_THRESHOLD = 2000; // 2 seconds between revalidations

export async function GET(req: NextRequest) {
  const now = Date.now();

  // Get the response from the draft mode enabler
  const response = await enabler.GET(req);

  // If it's been less than the threshold since the last revalidation,
  // just return the response without revalidating
  if (now - lastRevalidationTime < REVALIDATION_THRESHOLD) {
    return response;
  }

  // Otherwise, update the last revalidation time
  lastRevalidationTime = now;

  // Add cache control headers to prevent excessive revalidation
  response.headers.set("Cache-Control", "no-store, max-age=0");

  return response;
}
