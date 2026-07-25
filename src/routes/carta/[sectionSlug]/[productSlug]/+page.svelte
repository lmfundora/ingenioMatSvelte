<script lang="ts">
    import { page } from "$app/stores";
    import type { PageData } from "./$types";
    import { ArrowLeft, ChevronDown, ChevronUp } from "@lucide/svelte";

    let { data }: { data: PageData } = $props();

    // 1. Derivamos `product` desde `data` para mantener la reactividad en Svelte 5
    let product = $derived(data.product);

    let sectionSlug = $derived($page.params.sectionSlug);

    const defaultImageUrl =
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200";

    // 2. Derivamos la imagen leyendo directamente del `product` derivado
    let imageUrl = $derived(
        product?.imageUrl?.trim() ? product.imageUrl : defaultImageUrl,
    );

    // Estados locales para los desplegables de información
    let openPrep = $state(false);
    let openIngr = $state(false);
    let openAllerg = $state(false);
</script>

<svelte:head>
    <title>
        {product
            ? `${product.name} - Don Quijote`
            : "Producto no encontrado - Don Quijote"}
    </title>
    <meta
        name="description"
        content={product?.description ||
            "Descubre nuestro catálogo de productos en Don Quijote"}
    />
</svelte:head>

{#if !product}
    <main
        class="flex min-h-screen items-center justify-center bg-[#FAF4ED] p-4 text-[#332211]"
    >
        <div class="text-center">
            <h1 class="mb-4 font-italianno text-4xl text-[#4A2E1B]">
                Producto no encontrado
            </h1>
            <p class="mb-6 tracking-wide text-stone-500">
                El producto que buscas no existe o no está disponible.
            </p>
            <a
                href="/carta/{sectionSlug || ''}"
                class="inline-flex items-center gap-2 text-[#4A2E1B] underline underline-offset-4"
            >
                <ArrowLeft size={16} /> Volver a la sección
            </a>
        </div>
    </main>
{:else}
    <main
        class="relative min-h-screen overflow-x-hidden bg-[#FAF4ED] text-[#332211]"
    >
        <!-- Botón flotante para regresar -->
        <a
            href="/carta/{sectionSlug}"
            class="absolute left-4 top-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-black/40"
        >
            <ArrowLeft size={20} />
        </a>

        <!-- ========================================================================= -->
        <!-- 1. ESTRUCTURA DESKTOP (lg:flex) -->
        <!-- ========================================================================= -->
        <div class="hidden min-h-screen w-full lg:flex">
            <!-- LADO IZQUIERDO: Detalles del producto (40% ancho) -->
            <div
                class="relative flex w-[40%] select-none flex-col justify-between bg-background"
            >
                <!-- Marca de agua de fondo -->
                <div
                    class="pointer-events-none absolute z-0 flex h-screen w-screen overflow-hidden ms-[25%] opacity-40"
                >
                    <img
                        src="/logofill.svg"
                        alt="Don Quijote"
                        class="h-auto select-none"
                    />
                </div>

                <!-- Textos Principales -->
                <div class="relative z-10 space-y-8 pt-10 text-end pe-8">
                    <h1
                        class="font-italianno text-7xl tracking-wide text-[#4A2E1B]"
                    >
                        {product.name}
                    </h1>
                    <p
                        class="mx-auto font-sans text-lg font-light leading-relaxed tracking-widest text-stone-700"
                    >
                        {product.description}
                    </p>
                </div>

                <!-- Precio -->
                <div class="relative z-10 w-full pb-4 pr-4 text-right">
                    <span
                        class="font-italianno text-6xl font-light tracking-wider text-[#4A2E1B]"
                    >
                        ${product.price}
                    </span>
                </div>
            </div>

            <!-- LADO DERECHO: Imagen de fondo y Acordeones (60% ancho) -->
            <div
                class="relative flex w-[60%] flex-col justify-end bg-cover bg-center p-5 text-white"
                style="background-image: url('{imageUrl}');"
            >
                <div
                    class="pointer-events-none absolute inset-0 bg-linear-to-r from-black/80 via-black/20 to-transparent"
                ></div>

                <div class="relative z-10 mb-3 w-1/3 space-y-3">
                    {#if product.preparation}
                        <button
                            type="button"
                            onclick={() => (openPrep = !openPrep)}
                            class="flex w-full items-center justify-between border-b border-white/20 pb-2 text-left text-white/95 hover:text-white"
                        >
                            <h2 class="font-italianno text-4xl tracking-wide">
                                Preparación
                            </h2>
                            {#if openPrep}<ChevronUp
                                    size={24}
                                />{:else}<ChevronDown size={24} />{/if}
                        </button>
                        {#if openPrep}
                            <p
                                class="mt-2 font-sans text-base font-light leading-relaxed tracking-wider text-stone-200"
                            >
                                {product.preparation}
                            </p>
                        {/if}
                    {/if}

                    {#if product.ingredients && product.ingredients.length > 0}
                        <button
                            type="button"
                            onclick={() => (openIngr = !openIngr)}
                            class="flex w-full items-center justify-between border-b border-white/20 pb-2 text-left text-white/95 hover:text-white"
                        >
                            <h2 class="font-italianno text-4xl tracking-wide">
                                Ingredientes
                            </h2>
                            {#if openIngr}<ChevronUp
                                    size={24}
                                />{:else}<ChevronDown size={24} />{/if}
                        </button>
                        {#if openIngr}
                            <p
                                class="mt-2 font-sans text-base font-light leading-relaxed tracking-wider text-stone-200"
                            >
                                {product.ingredients.join(", ")}
                            </p>
                        {/if}
                    {/if}

                    {#if product.allergens && product.allergens.length > 0}
                        <button
                            type="button"
                            onclick={() => (openAllerg = !openAllerg)}
                            class="flex w-full items-center justify-between border-b border-white/20 pb-2 text-left text-white/95 hover:text-white"
                        >
                            <h2 class="font-italianno text-4xl tracking-wide">
                                Alérgenos
                            </h2>
                            {#if openAllerg}<ChevronUp
                                    size={24}
                                />{:else}<ChevronDown size={24} />{/if}
                        </button>
                        {#if openAllerg}
                            <p
                                class="mt-2 font-sans text-base font-light leading-relaxed tracking-wider text-stone-200"
                            >
                                {product.allergens.join(", ")}
                            </p>
                        {/if}
                    {/if}
                </div>
            </div>
        </div>

        <!-- ========================================================================= -->
        <!-- 2. ESTRUCTURA MÓVIL (lg:hidden) -->
        <!-- ========================================================================= -->
        <div
            class="flex min-h-screen w-full flex-col justify-between pb-12 lg:hidden"
        >
            <div
                class="relative h-[45vh] w-full bg-cover bg-center"
                style="background-image: url('{imageUrl}');"
            ></div>

            <div
                class="relative flex grow flex-col justify-between overflow-x-hidden bg-[#FAF4ED] px-6 pb-6 pt-10"
            >
                <div
                    class="pointer-events-none absolute inset-0 z-10 flex w-full overflow-hidden"
                >
                    <img
                        src="/logofill.svg"
                        alt="Don Quijote"
                        class="h-auto translate-x-1/2 select-none"
                    />
                </div>

                <div class="relative z-10 space-y-6">
                    <h1
                        class="font-italianno text-5xl tracking-wide text-[#4A2E1B]"
                    >
                        {product.name}
                    </h1>
                    <p
                        class="font-sans text-base font-light leading-relaxed tracking-widest text-stone-700"
                    >
                        {product.description}
                    </p>

                    <!-- Acordeones Móviles -->
                    <div class="space-y-3 pt-4">
                        {#if product.preparation}
                            <button
                                type="button"
                                onclick={() => (openPrep = !openPrep)}
                                class="flex w-full items-center justify-between rounded-xl border border-[#4A2E1B]/40 bg-white/40 px-6 py-3 text-left text-[#4A2E1B] backdrop-blur-xs"
                            >
                                <h2 class="font-italianno text-3xl">
                                    Preparación
                                </h2>
                                {#if openPrep}<ChevronUp
                                        size={20}
                                    />{:else}<ChevronDown size={20} />{/if}
                            </button>
                            {#if openPrep}
                                <p
                                    class="mt-2 font-sans text-xs font-light leading-relaxed tracking-wider text-stone-600"
                                >
                                    {product.preparation}
                                </p>
                            {/if}
                        {/if}

                        {#if product.ingredients && product.ingredients.length > 0}
                            <button
                                type="button"
                                onclick={() => (openIngr = !openIngr)}
                                class="flex w-full items-center justify-between rounded-xl border border-[#4A2E1B]/40 bg-white/40 px-6 py-3 text-left text-[#4A2E1B] backdrop-blur-xs"
                            >
                                <h2 class="font-italianno text-3xl">
                                    Ingredientes
                                </h2>
                                {#if openIngr}<ChevronUp
                                        size={20}
                                    />{:else}<ChevronDown size={20} />{/if}
                            </button>
                            {#if openIngr}
                                <p
                                    class="mt-2 font-sans text-xs font-light leading-relaxed tracking-wider text-stone-600"
                                >
                                    {product.ingredients.join(", ")}
                                </p>
                            {/if}
                        {/if}

                        {#if product.allergens && product.allergens.length > 0}
                            <button
                                type="button"
                                onclick={() => (openAllerg = !openAllerg)}
                                class="flex w-full items-center justify-between rounded-xl border border-[#4A2E1B]/40 bg-white/40 px-6 py-3 text-left text-[#4A2E1B] backdrop-blur-xs"
                            >
                                <h2 class="font-italianno text-3xl">
                                    Alérgenos
                                </h2>
                                {#if openAllerg}<ChevronUp
                                        size={20}
                                    />{:else}<ChevronDown size={20} />{/if}
                            </button>
                            {#if openAllerg}
                                <p
                                    class="mt-2 font-sans text-xs font-light leading-relaxed tracking-wider text-stone-600"
                                >
                                    {product.allergens.join(", ")}
                                </p>
                            {/if}
                        {/if}
                    </div>
                </div>

                <div class="relative z-10 mt-10 w-full pr-4 text-right">
                    <span
                        class="font-italianno text-5xl font-light tracking-wider text-[#4A2E1B]"
                    >
                        ${product.price}
                    </span>
                </div>
            </div>
        </div>
    </main>
{/if}
