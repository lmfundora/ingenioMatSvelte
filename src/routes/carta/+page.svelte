<script lang="ts">
    import type { PageData } from "./$types";

    // Recibimos los datos precargados desde +page.server.ts (SSR)
    let { data }: { data: PageData } = $props();

    // Lógica para imágenes fallback
    function getFallbackImage(name: string): string {
        const lower = name.toLowerCase();
        if (lower.includes("bar"))
            return "/Gemini_Generated_Image_wzsglbwzsglbwzsg.webp";
        if (lower.includes("restaurante")) return "/_QJT1440.webp";
        if (lower.includes("disco")) return "/20260708_154439.webp";
        return "/20260704_184003.webp";
    }

    // Declaración reactiva de Svelte 5
    let sections = $derived(data.sections ?? []);
</script>

<svelte:head>
    <title>Carta - Don Quijote</title>
    <meta
        name="description"
        content="Explora nuestra exclusiva carta de Bar, Restaurante y Discoteca en Don Quijote."
    />
</svelte:head>

<main class="relative min-h-screen overflow-x-hidden bg-[#FAF5EE]">
    <!-- Main Content -->
    <div class="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 md:px-6">
        <!-- Welcome Title -->
        <h1
            class="mb-8 pl-2 text-left font-italianno text-6xl text-[#381d11] md:mb-12 md:pl-4 md:text-7xl lg:text-18xl"
        >
            Nuestra Carta
        </h1>

        <!-- Empty State (No loading state needed thanks to SSR) -->
        {#if sections.length === 0}
            <div class="py-12 text-center font-sans text-stone-500">
                No hay secciones disponibles en este momento.
            </div>
        {:else}
            <!-- Sections Grid / Stack -->
            <div class="flex w-full flex-col gap-6 md:gap-8">
                {#each sections as section (section._id)}
                    {@const bgImage =
                        section.imageUrl || getFallbackImage(section.name)}

                    <a
                        href="/carta/{section.slug}"
                        class="group self-end-safe relative block min-h-[140px] w-full cursor-pointer overflow-hidden rounded-[2px] border-0 bg-transparent p-0 shadow-sm transition-all duration-500 hover:shadow-md md:aspect-[4.8/1] md:min-h-[150px] md:w-3/4"
                    >
                        <img
                            src={bgImage}
                            alt={section.name}
                            class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                        <div
                            class="absolute inset-0 bg-gradient-to-l from-black/90 via-black/50 to-transparent transition-all duration-300 group-hover:from-black/60 group-hover:via-black/40"
                        ></div>

                        <!-- Logo bottom-left -->
                        <div
                            class="absolute bottom-3 left-4 flex items-center md:bottom-5 md:left-6"
                        >
                            <img
                                src="/logoblanco.webp"
                                alt="Don Quijote logo"
                                class="h-10 w-auto object-contain opacity-95 transition-opacity duration-300 group-hover:opacity-100 sm:h-12 md:h-16 lg:h-20"
                            />
                        </div>

                        <!-- Right text container (Ajustes de jerarquía y legibilidad) -->
                        <div
                            class="absolute right-4 top-1/2 flex w-[70%] -translate-y-1/2 flex-col items-end sm:right-6 md:right-10 md:w-[55%] lg:right-12"
                        >
                            <h2
                                class="select-none font-italianno text-4xl leading-none tracking-wide text-white sm:text-5xl md:text-5xl lg:text-6xl"
                            >
                                {section.name}
                            </h2>
                            <div
                                class="my-2 h-[1px] w-full bg-white/70 transition-all duration-500 group-hover:bg-white md:my-2.5"
                            ></div>
                            {#if section.description}
                                <p
                                    class="select-none text-right font-sans text-xs font-normal leading-relaxed tracking-wider text-white/95 sm:text-sm md:text-base lg:text-lg"
                                >
                                    {section.description}
                                </p>
                            {/if}
                        </div>
                    </a>
                {/each}
            </div>
        {/if}
    </div>
</main>
