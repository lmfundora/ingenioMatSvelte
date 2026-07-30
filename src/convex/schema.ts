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
  }).index("by_slug", ["slug"]),
  serviceTypes: defineTable({
    name: v.string(),
  }),
  services: defineTable({
    name: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    serviceTypeId: v.id("serviceTypes"),
  }),
  offers: defineTable({
    text: v.string(),
    isActive: v.boolean(),
  }),
});
