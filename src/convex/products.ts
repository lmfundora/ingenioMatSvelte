import { v } from "convex/values";
import { mutation, query, type QueryCtx } from "./_generated/server";
import { type Doc } from "./_generated/dataModel.d";

// Helper interno para resolver la URL del storage
async function resolveProductImage(ctx: QueryCtx, product: Doc<"products">) {
  if (!product.imageUrl) return product;

  // Limpiar espacios en blanco o barras iniciales/finales
  let cleanId = product.imageUrl.trim();

  // Si por alguna razón se guardó la URL antigua completa, extraer el ID
  if (cleanId.startsWith("http")) {
    cleanId = cleanId.split("/api/storage/")[1] || cleanId;
  }

  try {
    // castear a Id<"_storage"> de Convex
    const url = await ctx.storage.getUrl(cleanId as any);

    if (!url) {
      console.log(
        `[Convex] El storageId '${cleanId}' no existe en el almacenamiento.`,
      );
    }

    return { ...product, imageUrl: url ?? undefined };
  } catch (error) {
    console.error(
      `[Convex] Error resolviendo imagen para '${cleanId}':`,
      error,
    );
    return { ...product, imageUrl: undefined };
  }
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    return await Promise.all(
      products.map((product) => resolveProductImage(ctx, product)),
    );
  },
});

export const getById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id);
    if (!product) return null;
    return await resolveProductImage(ctx, product);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const product = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!product) return null;
    return await resolveProductImage(ctx, product);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    imageUrl: v.string(),
    categoryId: v.id("categories"),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (existing) {
      throw new Error("El slug ya está en uso por otro producto.");
    }

    const newProduct = {
      name: args.name,
      imageUrl: args.imageUrl,
      categoryId: args.categoryId,
      slug: args.slug,
    };
    const id = await ctx.db.insert("products", newProduct);
    return { id };
  },
});

export const update = mutation({
  args: {
    id: v.id("products"),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    categoryId: v.optional(v.id("categories")),
    slug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    if (updates.slug !== undefined) {
      const existing = await ctx.db
        .query("products")
        .withIndex("by_slug", (q) => q.eq("slug", updates.slug!))
        .first();
      if (existing && existing._id !== id) {
        throw new Error("El slug ya está en uso por otro producto.");
      }
    }

    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: {
    id: v.id("products"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
