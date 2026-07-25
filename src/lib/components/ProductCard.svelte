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
        getSectionName: (sectionSlug: string) => string;
        // Permite string, Id<"categories"> o null/undefined
        getCategoryName: (
            categoryId: Id<"categories"> | string | null | undefined,
        ) => string;
        onEdit: (product: Product) => void;
        onDelete: (id: Id<"products">) => void;
    }

    let { product, getSectionName, getCategoryName, onEdit, onDelete }: Props =
        $props();

    let isDescriptionExpanded = $state(false);

    let shouldShowExpandButton = $derived(
        Boolean(product.description && product.description.length > 70),
    );
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
                <span
                    class="font-bold text-sm tracking-tight text-foreground shrink-0"
                >
                    ${product.price.toFixed(2)}
                </span>
            </div>

            <!-- Badges (Sección & Categoría) -->
            <div class="flex flex-wrap gap-1 pt-0.5">
                <Badge
                    variant="secondary"
                    class="font-normal text-[10px] px-1.5 py-0 h-4"
                >
                    <!-- Ajustado a product.sectionSlug -->
                    {getSectionName(product.sectionSlug)}
                </Badge>
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

        <!-- Descripción -->
        {#if product.description}
            <div class="text-xs text-muted-foreground leading-relaxed">
                <p class={isDescriptionExpanded ? "" : "line-clamp-2"}>
                    {product.description}
                </p>
                {#if shouldShowExpandButton}
                    <button
                        type="button"
                        onclick={() =>
                            (isDescriptionExpanded = !isDescriptionExpanded)}
                        class="mt-0.5 inline-flex items-center gap-0.5 text-[11px] text-primary font-medium hover:underline focus:outline-none"
                    >
                        {#if isDescriptionExpanded}
                            Ver menos <ChevronUp size={11} />
                        {:else}
                            Ver más <ChevronDown size={11} />
                        {/if}
                    </button>
                {/if}
            </div>
        {/if}

        <!-- Footer / Acciones -->
        <div
            class="pt-1.5 flex items-center justify-between gap-2 border-t border-border/40 mt-auto"
        >
            <!-- Alérgenos -->
            <div class="min-w-0 flex-1">
                {#if product.allergens && product.allergens.length > 0}
                    <p class="truncate text-[11px] text-muted-foreground">
                        <span class="font-medium text-foreground/70"
                            >Alérgenos:</span
                        >
                        {product.allergens.join(", ")}
                    </p>
                {:else}
                    <span class="text-[11px] text-muted-foreground/50 italic"
                        >Sin alérgenos</span
                    >
                {/if}
            </div>

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
