<script lang="ts">
    import { page } from "$app/stores";
    import type { Doc } from "$convex/_generated/dataModel";

    let {
        data,
    }: {
        data: {
            section: Doc<"sections"> | null;
            categories: Doc<"categories">[];
            products: Doc<"products">[];
        };
    } = $props();

    let sectionSlug = $derived($page.params.sectionSlug);
    let selectedCategory = $state<string | null>(null);

    // Agrupar productos por categoría
    let productsByCategory = $derived(
        (data.products || []).reduce<Record<string, Doc<"products">[]>>(
            (acc, product) => {
                const categoryId =
                    product.categoryId && product.categoryId !== ""
                        ? product.categoryId
                        : "uncategorized";
                if (!acc[categoryId]) {
                    acc[categoryId] = [];
                }
                acc[categoryId].push(product);
                return acc;
            },
            {},
        ),
    );

    // Nombre de categoría auxiliar
    function getCategoryName(categoryId: string): string {
        if (categoryId === "uncategorized") return "Sin categoría";
        const category = data.categories?.find((c) => c._id === categoryId);
        return category?.name || "Sin categoría";
    }

    // Filtrar productos por la categoría seleccionada
    let filteredProducts = $derived(
        selectedCategory
            ? data.products?.filter((p) => p.categoryId === selectedCategory)
            : data.products,
    );

    const defaultImageUrl =
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200";
</script>

<svelte:head>
    <title
        >{data.section
            ? `${data.section.name} - Don Quijote`
            : "Sección no encontrada - Don Quijote"}</title
    >
    <meta
        name="description"
        content="Explora nuestra selección de productos en Don Quijote"
    />
</svelte:head>

<main class="min-h-screen bg-[#FAF4ED] text-[#332211]">
    {#if !data.section}
        <div class="flex min-h-[50vh] items-center justify-center">
            <div class="text-center">
                <h1 class="mb-4 font-italianno text-4xl">
                    Sección no encontrada
                </h1>
                <p class="tracking-wide text-stone-500">
                    La sección que buscas no existe.
                </p>
            </div>
        </div>
    {:else}
        <!-- Section Header -->
        <div
            style="background-image: url({data.section.imageUrl ||
                defaultImageUrl});"
            class="relative flex h-[260px] w-full flex-col justify-between border-b-4 bg-cover bg-center p-6 md:h-[260px] md:p-10"
        >
            <div
                class="absolute inset-0 bg-gradient-to-l from-black via-black/40 to-transparent"
                aria-hidden="true"
            ></div>
            <div
                class="relative z-10 flex w-2/3 max-w-7xl flex-col items-end justify-end self-end text-right text-white md:items-end"
            >
                <h1
                    class="font-italianno text-6xl font-normal leading-none tracking-wide text-white drop-shadow-md md:text-8xl"
                >
                    {data.section.name}
                </h1>
                <div class="mb-18 my-2 h-[1px] w-full bg-white/20"></div>
                {#if data.section.description}
                    <p
                        class="mt-2 max-w-md font-sans text-xs font-light tracking-widest text-stone-200 md:max-w-xl md:text-sm"
                    >
                        {data.section.description}
                    </p>
                {/if}
            </div>
        </div>

        <!-- Section Content -->
        <div class="mx-auto w-full max-w-7xl px-4 pt-4 pb-16 md:px-6">
            <!-- Selector de Categorías -->
            <div
                class="no-scrollbar flex items-center justify-start gap-3 overflow-x-auto pb-4"
            >
                <button
                    onclick={() => (selectedCategory = null)}
                    class="min-w-[130px] border px-6 py-1 text-center font-italianno text-2xl transition-colors shadow-sm {selectedCategory ===
                    null
                        ? 'border-[#4A2E1B] bg-[#4A2E1B] text-white'
                        : 'border-[#5A3A24]/40 bg-white/80 text-[#4A2E1B] hover:bg-white'}"
                >
                    Todos
                </button>

                {#each Object.keys(productsByCategory).filter((catId) => catId !== "uncategorized") as categoryId (categoryId)}
                    <button
                        onclick={() => (selectedCategory = categoryId)}
                        class="min-w-[130px] border px-6 py-1 text-center font-italianno text-2xl transition-colors shadow-sm {selectedCategory ===
                        categoryId
                            ? 'border-[#4A2E1B] bg-[#4A2E1B] text-white'
                            : 'border-[#5A3A24]/40 bg-white/80 text-[#4A2E1B] hover:bg-white'}"
                    >
                        {getCategoryName(categoryId)}
                    </button>
                {/each}
            </div>

            <!-- Grid de Productos -->
            {#if !filteredProducts || filteredProducts.length === 0}
                <div class="py-12 text-center">
                    <p
                        class="font-italianno text-3xl tracking-wide text-stone-500"
                    >
                        {selectedCategory
                            ? "No hay productos en esta categoría"
                            : "No hay productos disponibles en esta sección"}
                    </p>
                </div>
            {:else}
                <div
                    class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    {#each filteredProducts as product (product._id)}
                        {#if product.slug}
                            <a
                                href="/carta/{sectionSlug}/{product.slug}"
                                class="aspect-[1.5/1] flex cursor-pointer overflow-hidden border border-[#4A2E1B] bg-white shadow-sm transition-shadow hover:shadow-md"
                            >
                                <!-- Izquierda: Imagen (50%) -->
                                <div
                                    class="relative w-1/2 border-r border-[#4A2E1B]/10 bg-stone-100"
                                >
                                    {#if product.imageUrl}
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            class="h-full w-full object-cover"
                                        />
                                    {:else}
                                        <div
                                            class="flex h-full w-full items-center justify-center text-xs italic text-stone-300"
                                        >
                                            Sin imagen
                                        </div>
                                    {/if}
                                    <div
                                        class="absolute bottom-2 left-2 origin-bottom-left scale-75 rounded bg-black/20 px-1.5 py-0.5 font-serif text-[10px] uppercase tracking-widest text-white opacity-60 backdrop-blur-[1px]"
                                    >
                                        Don Quijote
                                    </div>
                                </div>

                                <!-- Derecha: Detalles (50%) -->
                                <div
                                    class="flex w-1/2 flex-col justify-between bg-[#FCF8F4] p-4"
                                >
                                    <div class="space-y-1 text-end">
                                        <h3
                                            class="font-italianno text-4xl leading-tight text-[#4A2E1B] md:text-3xl"
                                        >
                                            {product.name}
                                        </h3>
                                        <p
                                            class="mx-auto max-w-[95%] line-clamp-4 font-sans text-[11px] font-light leading-relaxed text-stone-500 md:text-xs"
                                        >
                                            {product.description}
                                        </p>
                                    </div>

                                    <!-- Línea decorativa + Precio -->
                                    <div
                                        class="mt-2 flex items-center justify-end gap-2"
                                    >
                                        <div
                                            class="mb-1 flex-grow border-b border-[#4A2E1B]/20"
                                        ></div>
                                        <span
                                            class="pl-1 font-italianno text-2xl font-medium text-[#4A2E1B] md:text-3xl"
                                        >
                                            ${product.price.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        {/if}
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
</main>
