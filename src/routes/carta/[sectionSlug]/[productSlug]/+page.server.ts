import { PUBLIC_CONVEX_URL } from "$env/static/public";
import { api } from "$convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import type { PageLoad } from "./$types";

// Cliente HTTP de Convex para realizar consultas en SSR
const convex = new ConvexHttpClient(PUBLIC_CONVEX_URL);

export const load: PageLoad = async ({ params }) => {
  const { productSlug } = params;

  try {
    const product = await convex.query(api.products.getBySlug, {
      slug: productSlug,
    });

    return {
      product,
    };
  } catch (error) {
    console.error(
      `[SSR Error] No se pudo obtener el producto '${productSlug}':`,
      error,
    );
    return {
      product: null,
    };
  }
};
