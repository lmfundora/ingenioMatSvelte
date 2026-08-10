<script lang="ts">
    import { Edit, Trash2, Image as ImageIcon, Clock, DollarSign, MapPin } from "@lucide/svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import type { Doc, Id } from "$convex/_generated/dataModel";

    export type Service = Doc<"services">;

    interface Props {
        service: Service;
        getServiceTypeName: (
            typeId: Id<"serviceTypes"> | string | null | undefined,
        ) => string;
        onEdit: (service: Service) => void;
        onDelete: (id: Id<"services">) => void;
    }

    let { service, getServiceTypeName, onEdit, onDelete }: Props = $props();
</script>

<Card.Root
    class="group relative overflow-hidden flex flex-col p-0 transition-all duration-200 hover:shadow-lg hover:border-primary/30 border-border/60"
>
    <!-- Imagen del Servicio con overlay compacto -->
    {#if service.imageUrl}
        <div class="relative w-full h-36 shrink-0 overflow-hidden bg-muted m-0 p-0">
            <img
                src={service.imageUrl}
                alt={service.name}
                class="block w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            
            <!-- Indicador de fotos de ejemplos -->
            {#if service.fotosDeEjemplos && service.fotosDeEjemplos.length > 0}
                <div class="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <ImageIcon size={10} class="text-white" />
                    <span class="text-[10px] text-white font-medium">{service.fotosDeEjemplos.length}</span>
                </div>
            {/if}
        </div>
    {/if}

    <!-- Contenido -->
    <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
        <!-- Bloque Superior: Nombre + Tipo -->
        <div class="space-y-2">
            <div class="flex items-start justify-between gap-2">
                <h3
                    class="font-semibold text-sm leading-tight line-clamp-2 text-foreground min-h-[2rem]"
                    title={service.name}
                >
                    {service.name}
                </h3>
            </div>

            <!-- Badge de Tipo de Servicio -->
            {#if service.serviceTypeId}
                <Badge
                    variant="secondary"
                    class="font-normal text-[10px] px-2 py-0.5 h-5 w-fit"
                >
                    {getServiceTypeName(service.serviceTypeId)}
                </Badge>
            {/if}
        </div>

        <!-- Información adicional compacta -->
        <div class="space-y-1.5 text-[10px] text-muted-foreground">
            {#if service.precioBase}
                <div class="flex items-center gap-1.5">
                    <DollarSign size={10} class="shrink-0" />
                    <span class="line-clamp-1" title={service.precioBase}>{service.precioBase}</span>
                </div>
            {/if}
            
            {#if service.duracionEstimada}
                <div class="flex items-center gap-1.5">
                    <Clock size={10} class="shrink-0" />
                    <span class="line-clamp-1" title={service.duracionEstimada}>{service.duracionEstimada}</span>
                </div>
            {/if}
            
            {#if service.areaDeCobertura}
                <div class="flex items-center gap-1.5">
                    <MapPin size={10} class="shrink-0" />
                    <span class="line-clamp-1" title={service.areaDeCobertura}>{service.areaDeCobertura}</span>
                </div>
            {/if}
        </div>

        <!-- Footer / Acciones -->
        <div class="pt-2 flex items-center justify-between gap-2 border-t border-border/40 mt-auto">
            <!-- Contador de campos adicionales -->
            <div class="flex items-center gap-1 text-[10px] text-muted-foreground">
                {#if service.detalles || service.requisitos}
                    <span class="bg-primary/5 px-1.5 py-0.5 rounded">
                        +{(service.detalles ? 1 : 0) + (service.requisitos ? 1 : 0)} campos
                    </span>
                {/if}
            </div>

            <!-- Botones -->
            <div class="flex items-center gap-1 shrink-0">
                <Button
                    variant="ghost"
                    size="icon"
                    onclick={() => onEdit(service)}
                    class="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-primary/10"
                    title="Editar servicio"
                >
                    <Edit size={13} />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onclick={() => onDelete(service._id)}
                    class="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    title="Eliminar servicio"
                >
                    <Trash2 size={13} />
                </Button>
            </div>
        </div>
    </div>
</Card.Root>