import { assist } from "@sanity/assist";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import {
  unsplashAssetSource,
  unsplashImageAsset,
} from "sanity-plugin-asset-source-unsplash";

// import { iconPicker } from "sanity-plugin-icon-picker";
// import { media, mediaAssetSource } from "sanity-plugin-media";

import { StudioLogo } from "./src/components/studio-logo";
import { locations } from "./src/sanity/utils/location";
import { presentationUrl } from "./src/sanity/utils/presentation-url";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/utils/structure";
import { createPageTemplate } from "./src/sanity/utils/helper";
import {
  dataset,
  projectId,
  title,
  presentationOriginUrl,
} from "@/src/sanity/lib/api";

// Get the preview URL based on environment
const getPreviewUrl = () => {
  // Production environment
  if (process.env.VERCEL_ENV === "production") {
    return process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : undefined;
  }
  // Preview environment
  if (process.env.VERCEL_ENV === "preview") {
    return process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : undefined;
  }
  // Local development
  return "http://localhost:3000";
};

export default defineConfig({
  name: "default",
  title: title ?? "My Studio",
  projectId: projectId,
  basePath: "/studio",
  icon: StudioLogo,
  dataset: dataset ?? "production",
  plugins: [
    presentationTool({
      resolve: {
        locations,
      },
      previewUrl: {
        origin: getPreviewUrl(),
        previewMode: {
          enable: "/api/presentation-draft",
        },
        draftMode: {
          enable: "/api/presentation-draft",
        },
      },
    }),
    assist(),
    structureTool({
      structure,
    }),
    visionTool(),
    // iconPicker(), // Temporarily disabled due to compatibility issues
    // media(), // Temporarily disabled
    presentationUrl(),
    unsplashImageAsset(),
  ],

  form: {
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter(
          (assetSource) =>
            // assetSource === mediaAssetSource || // Temporarily disabled
            assetSource === unsplashAssetSource
        );
      },
    },
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      const { type } = creationContext;
      if (type === "global") return [];
      return prev;
    },
  },
  schema: {
    types: schemaTypes,
    templates: createPageTemplate(),
  },
});
