import { api } from "$convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { PUBLIC_CONVEX_URL } from "$env/static/public";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  try {
    console.log("Loading catalog data from server...");
    
    // Crear cliente Convex para el servidor
    const client = new ConvexHttpClient(PUBLIC_CONVEX_URL);
    
    // Cargar productos y categorías desde Convex en el servidor
    const [products, categories] = await Promise.all([
      client.query(api.products.list),
      client.query(api.categories.list),
    ]);

    console.log("Products loaded:", products?.length || 0);
    console.log("Categories loaded:", categories?.length || 0);

    return {
      products,
      categories,
    };
  } catch (error) {
    console.error("Error loading catalog data:", error);
    return {
      products: [],
      categories: [],
    };
  }
};
