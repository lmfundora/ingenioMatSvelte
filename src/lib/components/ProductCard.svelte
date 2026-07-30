<script lang="ts">
    import { Edit, Trash2, ChevronDown, ChevronUp } from "@lucide/svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import type { Doc, Id } from "$convex/_generated/dataModel";

    // Usamos directamente el tipo del documento generado por Convex
    export type Product = Doc<"products">;

    interface Props {
        product: Product;
        getCategoryName: (
            categoryId: Id<"categories"> | string | null | undefined,
        ) => string;
        onEdit: (product: Product) => void;
        onDelete: (id: Id<"products">) => void;
    }

    let { product, getCategoryName, onEdit, onDelete }: Props = $props();
</script>

<Card.Root
    class="group relative overflow-hidden flex flex-col p-0 transition-all duration-200 hover:shadow-md hover:border-border/80"
>
    <!-- Imagen del Producto -->
    {#if product.imageUrl}
        <div
            class="relative w-full h-32 shrink-0 overflow-hidden bg-muted m-0 p-0"
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
    <div class="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
        <!-- Bloque Superior: Nombre + Precio -->
        <div class="space-y-1">
            <div class="flex items-start justify-between gap-2">
                <h3
                    class="font-semibold text-sm leading-snug line-clamp-1 text-foreground"
                    title={product.name}
                >
                    {product.name}
                </h3>
            </div>

            <!-- Badges (Sección & Categoría) -->
            <div class="flex flex-wrap gap-1 pt-0.5">
                {#if product.categoryId}
                    <Badge
                        variant="outline"
                        class="font-normal text-[10px] px-1.5 py-0 h-4 text-muted-foreground"
                    >
                        {getCategoryName(product.categoryId)}
                    </Badge>
                {/if}
            </div>
        </div>

        <!-- Footer / Acciones -->
        <div
            class="pt-1.5 flex items-center justify-between gap-2 border-t border-border/40 mt-auto"
        >
            <!-- Botones -->
            <div class="flex items-center gap-1 shrink-0">
                <Button
                    variant="ghost"
                    size="icon"
                    onclick={() => onEdit(product)}
                    class="h-7 w-7 text-muted-foreground hover:text-foreground"
                    title="Editar producto"
                >
                    <Edit size={13} />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onclick={() => onDelete(product._id)}
                    class="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    title="Eliminar producto"
                >
                    <Trash2 size={13} />
                </Button>
            </div>
        </div>
    </div>
</Card.Root>
