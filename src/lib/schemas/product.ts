import * as v from "valibot";

export const productSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("El nombre es requerido")),
  slug: v.optional(v.string(), ""),
  description: v.pipe(v.string(), v.nonEmpty("La descripción es requerida")),
  price: v.pipe(
    v.number("El precio debe ser un número"),
    v.minValue(0.01, "El precio debe ser un número positivo"),
  ),
  sectionSlug: v.pipe(v.string(), v.nonEmpty("La sección es requerida")),
  categoryId: v.pipe(v.string(), v.nonEmpty("La categoría es requerida")),
  imageUrl: v.pipe(v.string(), v.nonEmpty("La imagen es requerida")),
  allergens: v.array(v.string()),
});

export type ProductSchema = typeof productSchema;
