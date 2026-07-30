import { api } from "$convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { PUBLIC_CONVEX_URL } from "$env/static/public";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  try {
    const client = new ConvexHttpClient(PUBLIC_CONVEX_URL);
    
    const [services, serviceTypes] = await Promise.all([
      client.query(api.services.list),
      client.query(api.serviceTypes.list),
    ]);

    return {
      services,
      serviceTypes,
    };
  } catch (error) {
    console.error("Error loading services data:", error);
    return {
      services: [],
      serviceTypes: [],
    };
  }
};
