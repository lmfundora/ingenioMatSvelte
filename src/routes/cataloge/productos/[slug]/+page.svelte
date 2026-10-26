<script lang="ts">
    import type { PageData } from "./$types";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Package, ShieldCheck, Truck } from "@lucide/svelte";
    import SEOMetaTags from "$lib/components/SEOMetaTags.svelte";
    import StructuredData from "$lib/components/StructuredData.svelte";

    let { data }: { data: PageData } = $props();
    let product = $derived(data.product);
    let category = $derived(data.category);

    // Generar descripción dinámica para SEO
    let seoDescription = $derived(
        `${product.name} ${category ? `- ${category.name}` : ''}. ${product.usos || 'Producto de alta calidad para construcción.'} ${product.medidas ? `Medidas: ${product.medidas}.` : ''} IngenioMat - Materiales de construcción certificados.`
    );
</script>

<svelte:head>
    <SEOMetaTags
        title={`${product.name} | IngenioMat Catálogo`}
        description={seoDescription}
        image={product.imageUrl || '/dream_house_3.webp'}
        type="product"
        keywords={`${product.name}, ${category?.name || ''}, materiales de construcción, ${product.usos || ''}`}
    />
    <StructuredData
        schema={{
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: seoDescription,
            image: product.imageUrl,
            category: category?.name,
            offers: {
                '@type': 'Offer',
                availability: 'https://schema.org/InStock',
                priceCurrency: 'EUR',
                url: `https://tu-dominio.com/cataloge/productos/${product.slug}`
            }
        }}
    />
</svelte:head>

<div class="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <!-- Imagen -->
        <div
            class="bg-muted relative aspect-square lg:aspect-auto lg:h-full flex items-center justify-center p-8"
        >
            {#if product.imageUrl}
                <img
                    src={product.imageUrl}
                    alt={`${product.name} - ${category?.name || 'Producto de construcción'}`}
                    width="800"
                    height="800"
                    loading="eager"
                    class="max-w-full max-h-full object-contain drop-shadow-md rounded-lg"
                />
            {:else}
                <Package class="w-32 h-32 text-muted-foreground/30" />
            {/if}
        </div>

        <!-- Detalles -->
        <div class="p-8 lg:p-12 flex flex-col justify-center">
            {#if category}
                <Badge variant="secondary" class="w-fit mb-6 text-sm py-1 px-3">
                    {category.name}
                </Badge>
            {/if}

            <h1
                class="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight"
            >
                {product.name}
            </h1>

            <div class="space-y-6">
                <!-- Ficha Técnica -->
                {#if product.usos || product.preparacion || product.actividad || product.medidas}
                    <div class="pt-6 border-t border-border">
                        <h3 class="font-semibold text-lg mb-4">
                            Ficha Técnica
                        </h3>
                        <div class="space-y-4">
                            {#if product.usos}
                                <div>
                                    <h4
                                        class="font-medium text-sm text-foreground mb-1"
                                    >
                                        Usos
                                    </h4>
                                    <p
                                        class="text-muted-foreground text-sm leading-relaxed"
                                    >
                                        {product.usos}
                                    </p>
                                </div>
                            {/if}

                            {#if product.preparacion}
                                <div>
                                    <h4
                                        class="font-medium text-sm text-foreground mb-1"
                                    >
                                        Preparación
                                    </h4>
                                    <p
                                        class="text-muted-foreground text-sm leading-relaxed"
                                    >
                                        {product.preparacion}
                                    </p>
                                </div>
                            {/if}

                            {#if product.actividad}
                                <div>
                                    <h4
                                        class="font-medium text-sm text-foreground mb-1"
                                    >
                                        Actividad
                                    </h4>
                                    <p
                                        class="text-muted-foreground text-sm leading-relaxed"
                                    >
                                        {product.actividad}
                                    </p>
                                </div>
                            {/if}

                            {#if product.medidas}
                                <div>
                                    <h4
                                        class="font-medium text-sm text-foreground mb-1"
                                    >
                                        Medidas
                                    </h4>
                                    <p
                                        class="text-muted-foreground text-sm leading-relaxed"
                                    >
                                        {product.medidas}
                                    </p>
                                </div>
                            {/if}
                        </div>
                    </div>
                {/if}

                <!-- Fotos de Ejemplos -->
                {#if product.fotosDeEjemplos && product.fotosDeEjemplos.length > 0}
                    <div class="pt-6 border-t border-border">
                        <h3 class="font-semibold text-lg mb-4">
                            Fotos de Ejemplos
                        </h3>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {#each product.fotosDeEjemplos as photoUrl}
                                <div
                                    class="aspect-square rounded-lg overflow-hidden bg-muted border border-border"
                                >
                                    <img
                                        src={photoUrl}
                                        alt={`Ejemplo de aplicación de ${product.name}`}
                                        width="400"
                                        height="400"
                                        loading="lazy"
                                        class="w-full h-full object-cover"
                                    />
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>

            <div class="mt-10 pt-8 border-t border-border">
                <p
                    class="text-xs text-center sm:text-left text-muted-foreground mt-4"
                >
                    Comunícate con nosotros para consultar precios y
                    disponibilidad.
                </p>
            </div>
        </div>
    </div>
</div>
