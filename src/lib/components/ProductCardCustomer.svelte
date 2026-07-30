<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import type { Doc, Id } from "$convex/_generated/dataModel";

    export type Product = Doc<"products">;

    interface Props {
        product: Product;
        getCategoryName: (
            categoryId: Id<"categories"> | string | null | undefined,
        ) => string;
    }

    let { product, getCategoryName }: Props = $props();
</script>

<a href={`/cataloge/productos/${product.slug}`} class="block no-underline">
<Card.Root
    class="group relative overflow-hidden flex flex-col p-0 transition-all duration-200 hover:shadow-md hover:border-border/80 cursor-pointer h-full"
>
    <!-- Imagen del Producto -->
    {#if product.imageUrl}
        <div
            class="relative w-full h-48 shrink-0 overflow-hidden bg-muted m-0 p-0"
        >
            <img
                src={product.imageUrl}
                alt={product.name}
                class="block w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none"
            ></div>
        </div>
    {/if}

    <!-- Contenido -->
    <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
        <!-- Bloque Superior: Nombre + Categoría -->
        <div class="space-y-2">
            <h3
                class="font-semibold text-base leading-snug line-clamp-2 text-foreground"
                title={product.name}
            >
                {product.name}
            </h3>

            <!-- Badge de Categoría -->
            {#if product.categoryId}
                <Badge
                    variant="secondary"
                    class="font-normal text-xs px-2 py-1 h-5 w-fit"
                >
                    {getCategoryName(product.categoryId)}
                </Badge>
            {/if}
        </div>
    </div>
</Card.Root>
</a>
