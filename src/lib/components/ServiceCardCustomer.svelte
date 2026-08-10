<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { ArrowRight, Clock, DollarSign, MapPin, Image as ImageIcon, ShieldCheck } from "@lucide/svelte";
    import type { Doc, Id } from "$convex/_generated/dataModel";

    export type Service = Doc<"services">;

    interface Props {
        service: Service;
        getServiceTypeName: (
            typeId: Id<"serviceTypes"> | string | null | undefined,
        ) => string;
    }

    let { service, getServiceTypeName }: Props = $props();
</script>

<a href={`/cataloge/servicios/${service._id}`} class="block no-underline h-full">
<Card.Root
    class="group relative overflow-hidden flex flex-col p-0 transition-all duration-300 hover:shadow-xl hover:border-primary/50 cursor-pointer h-full border-border/50"
>
    <!-- Imagen del Servicio con Overlay -->
    {#if service.imageUrl}
        <div class="relative w-full h-56 shrink-0 overflow-hidden bg-muted m-0 p-0">
            <img
                src={service.imageUrl}
                alt={service.name}
                class="block w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            <!-- Overlay con información -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            
            <!-- Tipo de Servicio Badge en overlay -->
            {#if service.serviceTypeId}
                <div class="absolute top-3 left-3">
                    <Badge
                        variant="secondary"
                        class="font-medium text-xs px-3 py-1.5 bg-white/90 backdrop-blur-sm text-foreground border-0 shadow-md"
                    >
                        {getServiceTypeName(service.serviceTypeId)}
                    </Badge>
                </div>
            {/if}
            
            <!-- Indicador de fotos de ejemplos -->
            {#if service.fotosDeEjemplos && service.fotosDeEjemplos.length > 0}
                <div class="absolute top-3 right-3">
                    <Badge
                        variant="outline"
                        class="font-medium text-xs px-3 py-1.5 bg-white/90 backdrop-blur-sm text-foreground border-0 shadow-md flex items-center gap-1"
                    >
                        <ImageIcon size={12} />
                        +{service.fotosDeEjemplos.length}
                    </Badge>
                </div>
            {/if}
        </div>
    {/if}

    <!-- Contenido -->
    <div class="p-5 flex-1 flex flex-col space-y-4 bg-gradient-to-b from-card to-card/95">
        <!-- Nombre -->
        <div>
            <h3
                class="font-bold text-lg leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors"
                title={service.name}
            >
                {service.name}
            </h3>
        </div>

        <!-- Descripción corta -->
        <div class="space-y-2.5 flex-1">
            <p class="text-sm text-muted-foreground line-clamp-2 leading-relaxed" title={service.description}>
                {service.description}
            </p>

            <!-- Características destacadas -->
            <div class="grid grid-cols-2 gap-2">
                {#if service.precioBase}
                    <div class="flex items-center gap-1.5 bg-primary/5 px-2 py-1.5 rounded-lg">
                        <DollarSign size={12} class="text-primary shrink-0" />
                        <span class="text-[10px] text-muted-foreground line-clamp-1">{service.precioBase}</span>
                    </div>
                {/if}

                {#if service.duracionEstimada}
                    <div class="flex items-center gap-1.5 bg-primary/5 px-2 py-1.5 rounded-lg">
                        <Clock size={12} class="text-primary shrink-0" />
                        <span class="text-[10px] text-muted-foreground line-clamp-1">{service.duracionEstimada}</span>
                    </div>
                {/if}

                {#if service.areaDeCobertura}
                    <div class="flex items-center gap-1.5 bg-primary/5 px-2 py-1.5 rounded-lg">
                        <MapPin size={12} class="text-primary shrink-0" />
                        <span class="text-[10px] text-muted-foreground line-clamp-1">{service.areaDeCobertura}</span>
                    </div>
                {/if}

                {#if service.requisitos}
                    <div class="flex items-center gap-1.5 bg-primary/5 px-2 py-1.5 rounded-lg">
                        <ShieldCheck size={12} class="text-primary shrink-0" />
                        <span class="text-[10px] text-muted-foreground line-clamp-1">Requisitos</span>
                    </div>
                {/if}
            </div>
        </div>

        <!-- Footer con CTA -->
        <div class="pt-3 border-t border-border/50 flex items-center justify-between">
            <span class="text-xs font-medium text-primary">Ver detalles</span>
            <div class="bg-primary/10 p-1.5 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <ArrowRight size={16} class="group-hover:translate-x-0.5 transition-transform" />
            </div>
        </div>
    </div>
</Card.Root>
</a>
