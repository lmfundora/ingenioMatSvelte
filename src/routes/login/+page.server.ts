import { superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";
import { loginSchema } from "$lib/schemas/auth";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const form = await superValidate(valibot(loginSchema));
  return { form };
};
