import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  categories: defineTable({
    name: v.string(),
  }),
  products: defineTable({
    name: v.string(),
    imageUrl: v.string(),
    categoryId: v.id("categories"),
    slug: v.string(),
    usos: v.optional(v.string()),
    preparacion: v.optional(v.string()),
    actividad: v.optional(v.string()),
    medidas: v.optional(v.string()),
    fotosDeEjemplos: v.optional(v.array(v.string())),
  }).index("by_slug", ["slug"]),
  serviceTypes: defineTable({
    name: v.string(),
  }),
  services: defineTable({
    name: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    serviceTypeId: v.id("serviceTypes"),
    detalles: v.optional(v.string()),
    fotosDeEjemplos: v.optional(v.array(v.string())),
    precioBase: v.optional(v.string()),
    duracionEstimada: v.optional(v.string()),
    areaDeCobertura: v.optional(v.string()),
    requisitos: v.optional(v.string()),
  }),
  offers: defineTable({
    text: v.string(),
    isActive: v.boolean(),
  }),
});
