import { client } from "@/src/sanity/lib/client";
import {
  queryBlogPageOGData,
  queryGenericPageOGData,
  queryHomePageOGData,
  querySlugPageOGData,
} from "@/src/sanity/lib/query";
import { handleErrors } from "@/src/sanity/utils/utils";

export async function getHomePageOGData(id: string) {
  return await handleErrors(client.fetch(queryHomePageOGData, { id }));
}

export async function getSlugPageOGData(id: string) {
  return await handleErrors(client.fetch(querySlugPageOGData, { id }));
}

export async function getBlogPageOGData(id: string) {
  return await handleErrors(client.fetch(queryBlogPageOGData, { id }));
}

export async function getGenericPageOGData(id: string) {
  return await handleErrors(client.fetch(queryGenericPageOGData, { id }));
}
