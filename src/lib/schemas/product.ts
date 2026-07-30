import * as v from "valibot";

export const productSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("El nombre es requerido")),
  slug: v.optional(v.string(), ""),
  categoryId: v.pipe(v.string(), v.nonEmpty("La categoría es requerida")),
  imageUrl: v.pipe(v.string(), v.nonEmpty("La imagen es requerida")),
});

export type ProductSchema = typeof productSchema;
