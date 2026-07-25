// src/routes/carta/[sectionSlug]/+page.server.ts
import type { PageServerLoad } from "./$types";
import { PUBLIC_CONVEX_URL } from "$env/static/public";
import { ConvexHttpClient } from "convex/browser";
import { api } from "$convex/_generated/api";

export const load: PageServerLoad = async ({ params }) => {
  // TypeScript ahora sabe automáticamente que params tiene 'sectionSlug'
  const { sectionSlug } = params;

  const client = new ConvexHttpClient(PUBLIC_CONVEX_URL);

  const [section, categories, products] = await Promise.all([
    client.query(api.sections.getBySlug, { slug: sectionSlug }),
    client.query(api.categories.list, {}),
    client.query(api.products.listBySectionSlug, { sectionSlug }),
  ]);

  return { section, categories, products };
};
