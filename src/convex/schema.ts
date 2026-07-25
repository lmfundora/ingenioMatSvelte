import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sections: defineTable({
    name: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    order: v.number(),
    slug: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_order", ["order"]),
  categories: defineTable({
    name: v.string(),
  }),
  products: defineTable({
    name: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    price: v.number(),
    categoryId: v.id("categories"),
    // 1. Cambiamos de v.id("sections") a string para almacenar el slug
    sectionSlug: v.string(),
    allergens: v.optional(v.array(v.string())),
    preparation: v.optional(v.string()),
    ingredients: v.optional(v.array(v.string())),
    slug: v.string(),
  })
    // 2. Indexamos por sectionSlug en lugar de sectionId
    .index("by_section_slug", ["sectionSlug"])
    .index("by_slug", ["slug"]),
});
