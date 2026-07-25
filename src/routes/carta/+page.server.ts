import { PUBLIC_CONVEX_URL } from "$env/static/public";
import { ConvexHttpClient } from "convex/browser";
import { api } from "$convex/_generated/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // Evaluamos e instanciamos dentro de la ejecución de la ruta
  const convexUrl = PUBLIC_CONVEX_URL;

  if (!convexUrl) {
    console.error("PUBLIC_CONVEX_URL no está definida en el archivo .env");
    return { sections: [] };
  }

  const client = new ConvexHttpClient(convexUrl);

  try {
    const sections = await client.query(api.sections.list, {});
    return {
      sections,
    };
  } catch (error) {
    console.error("Error cargando secciones en SSR:", error);
    return {
      sections: [],
    };
  }
};
