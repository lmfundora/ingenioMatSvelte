<script lang="ts">
    import { onMount } from "svelte";
    import { ChevronRight, Home, Package } from "@lucide/svelte";
    import ProductCardCustomer from "$lib/components/ProductCardCustomer.svelte";
    import SearchAndFilters from "$lib/components/SearchAndFilters.svelte";
    import type { Doc, Id } from "$convex/_generated/dataModel";

    interface PageData {
        products: Doc<"products">[];
        categories: Doc<"categories">[];
    }

    let { data }: { data: PageData } = $props();

    // Estado de filtros
    let searchQuery = $state("");
    let filterCategory = $state("");

    // Productos filtrados
    let filteredProducts = $derived.by(() => {
        if (!data.products) return [];
        
        return data.products.filter((product: Doc<"products">) => {
            const matchesSearch = searchQuery === "" || 
                product.name.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesCategory = filterCategory === "" || 
                product.categoryId === filterCategory;

            return matchesSearch && matchesCategory;
        });
    });

    // Helper para obtener nombre de categoría
    function getCategoryName(categoryId: Id<"categories"> | string | null | undefined): string {
        if (!categoryId || !data.categories) return "Sin categoría";
        const category = data.categories.find((cat) => cat._id === categoryId);
        return category?.name || "Sin categoría";
    }

    // Verificar si hay filtros activos
    let hasActiveFilters = $derived(searchQuery !== "" || filterCategory !== "");

    // Limpiar filtros
    function clearFilters() {
        searchQuery = "";
        filterCategory = "";
    }

    // Scroll al top al cargar
    onMount(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
</script>

<svelte:head>
    <title>Productos | Catálogo</title>
    <meta
        name="description"
        content="Explora nuestro catálogo completo de productos: materiales de construcción, equipos de energía solar y perfilería de aluminio."
    />
</svelte:head>

    <!-- Filtros -->
        <div class="mb-8">
            <SearchAndFilters
                bind:searchQuery
                bind:filterCategory
                categories={data.categories ?? []}
                {hasActiveFilters}
                onClearFilters={clearFilters}
                {getCategoryName}
            />
        </div>

        <!-- Grid de Productos -->
        {#if filteredProducts.length === 0}
            <div class="text-center py-20">
                <Package class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 class="text-lg font-semibold text-foreground mb-2">
                    No se encontraron productos
                </h3>
                <p class="text-muted-foreground">
                    {hasActiveFilters
                        ? "Intenta ajustar los filtros para ver más resultados."
                        : "No hay productos disponibles en este momento."}
                </p>
                {#if hasActiveFilters}
                    <button
                        onclick={clearFilters}
                        class="mt-4 text-primary hover:underline font-medium"
                    >
                        Limpiar filtros
                    </button>
                {/if}
            </div>
        {:else}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {#each filteredProducts as product (product._id)}
                    <ProductCardCustomer
                        {product}
                        {getCategoryName}
                    />
                {/each}
            </div>

            <!-- Contador de resultados -->
            <div class="mt-8 text-center text-sm text-muted-foreground">
                Mostrando {filteredProducts.length} de {data.products.length} productos
                {#if hasActiveFilters}
                    (filtrados)
                {/if}
            </div>
        {/if}
