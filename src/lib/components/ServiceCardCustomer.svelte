<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
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
    class="group relative overflow-hidden flex flex-col p-0 transition-all duration-200 hover:shadow-md hover:border-border/80 cursor-pointer h-full"
>
    <!-- Imagen del Servicio -->
    {#if service.imageUrl}
        <div
            class="relative w-full h-48 shrink-0 overflow-hidden bg-muted m-0 p-0"
        >
            <img
                src={service.imageUrl}
                alt={service.name}
                class="block w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none"
            ></div>
        </div>
    {/if}

    <!-- Contenido -->
    <div class="p-4 flex-1 flex flex-col space-y-3">
        <!-- Bloque Superior: Nombre + Tipo -->
        <div class="space-y-2">
            <h3
                class="font-semibold text-base leading-snug line-clamp-2 text-foreground"
                title={service.name}
            >
                {service.name}
            </h3>

            <!-- Badge de Tipo de Servicio -->
            {#if service.serviceTypeId}
                <Badge
                    variant="secondary"
                    class="font-normal text-xs px-2 py-1 h-5 w-fit"
                >
                    {getServiceTypeName(service.serviceTypeId)}
                </Badge>
            {/if}
            
            <!-- Pequeña descripción -->
            <p class="text-sm text-muted-foreground line-clamp-3 mt-2">
                {service.description}
            </p>
        </div>
    </div>
</Card.Root>
</a>
