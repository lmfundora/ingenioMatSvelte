<script lang="ts">
    import type { PageData } from "./$types";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import {
        Wrench,
        ArrowLeft,
        ShieldCheck,
        Clock,
        DollarSign,
        MapPin,
        ClipboardList,
        Image as ImageIcon,
    } from "@lucide/svelte";

    let { data }: { data: PageData } = $props();
    let service = $derived(data.service);
    let serviceType = $derived(data.serviceType);
</script>

<svelte:head>
    <title>{service.name} | Servicios</title>
    <meta name="description" content="Detalles de {service.name}" />
</svelte:head>

<div class="mb-6">
    <a
        href="/cataloge/servicios"
        class="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
    >
        <ArrowLeft size={16} class="mr-2" />
        Volver a servicios
    </a>
</div>

<div class="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <!-- Imagen -->
        <div
            class="bg-muted relative aspect-square lg:aspect-auto lg:h-full flex items-center justify-center p-8"
        >
            {#if service.imageUrl}
                <img
                    src={service.imageUrl}
                    alt={service.name}
                    class="max-w-full max-h-full object-contain drop-shadow-md rounded-lg"
                />
            {:else}
                <Wrench class="w-32 h-32 text-muted-foreground/30" />
            {/if}
        </div>

        <!-- Detalles -->
        <div class="p-8 lg:p-12 flex flex-col justify-center">
            {#if serviceType}
                <Badge variant="secondary" class="w-fit mb-6 text-sm py-1 px-3">
                    {serviceType.name}
                </Badge>
            {/if}

            <h1
                class="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight"
            >
                {service.name}
            </h1>

            <div class="space-y-6">
                <div class="pt-6 border-t border-border">
                    <h3 class="font-semibold text-lg mb-3">
                        Información del servicio
                    </h3>
                    <p class="text-muted-foreground leading-relaxed">
                        {service.description}
                    </p>
                </div>

                {#if service.detalles}
                    <div class="pt-6 border-t border-border">
                        <h3 class="font-semibold text-lg mb-3">
                            Detalles Adicionales
                        </h3>
                        <p class="text-muted-foreground leading-relaxed">
                            {service.detalles}
                        </p>
                    </div>
                {/if}

                <!-- Información adicional del servicio -->
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-border"
                >
                    {#if service.precioBase}
                        <div class="flex items-start gap-3">
                            <div
                                class="bg-primary/10 p-2 rounded-full text-primary shrink-0"
                            >
                                <DollarSign size={20} />
                            </div>
                            <div>
                                <h4 class="font-medium text-sm">Precio Base</h4>
                                <p class="text-xs text-muted-foreground mt-1">
                                    {service.precioBase}
                                </p>
                            </div>
                        </div>
                    {/if}

                    {#if service.duracionEstimada}
                        <div class="flex items-start gap-3">
                            <div
                                class="bg-primary/10 p-2 rounded-full text-primary shrink-0"
                            >
                                <Clock size={20} />
                            </div>
                            <div>
                                <h4 class="font-medium text-sm">
                                    Duración Estimada
                                </h4>
                                <p class="text-xs text-muted-foreground mt-1">
                                    {service.duracionEstimada}
                                </p>
                            </div>
                        </div>
                    {/if}

                    {#if service.areaDeCobertura}
                        <div class="flex items-start gap-3">
                            <div
                                class="bg-primary/10 p-2 rounded-full text-primary shrink-0"
                            >
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h4 class="font-medium text-sm">
                                    Área de Cobertura
                                </h4>
                                <p class="text-xs text-muted-foreground mt-1">
                                    {service.areaDeCobertura}
                                </p>
                            </div>
                        </div>
                    {/if}

                    {#if service.requisitos}
                        <div class="flex items-start gap-3">
                            <div
                                class="bg-primary/10 p-2 rounded-full text-primary shrink-0"
                            >
                                <ClipboardList size={20} />
                            </div>
                            <div>
                                <h4 class="font-medium text-sm">Requisitos</h4>
                                <p class="text-xs text-muted-foreground mt-1">
                                    {service.requisitos}
                                </p>
                            </div>
                        </div>
                    {/if}
                </div>

                <!-- Fotos de ejemplos -->
                {#if service.fotosDeEjemplos && service.fotosDeEjemplos.length > 0}
                    <div class="pt-6 border-t border-border">
                        <h3
                            class="font-semibold text-lg mb-3 flex items-center gap-2"
                        >
                            <ImageIcon size={20} />
                            Ejemplos de Trabajos Realizados
                        </h3>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {#each service.fotosDeEjemplos as exampleUrl}
                                <div
                                    class="aspect-square rounded-lg overflow-hidden border border-border"
                                >
                                    <img
                                        src={exampleUrl}
                                        alt="Ejemplo de trabajo"
                                        class="w-full h-full object-cover hover:scale-105 transition-transform"
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
                    Comunícate con nosotros para agendar una visita técnica o
                    pedir presupuesto.
                </p>
            </div>
        </div>
    </div>
</div>
