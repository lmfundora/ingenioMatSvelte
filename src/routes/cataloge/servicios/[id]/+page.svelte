<script lang="ts">
    import type { PageData } from "./$types";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Wrench, ArrowLeft, ShieldCheck, Clock } from "@lucide/svelte";

    let { data }: { data: PageData } = $props();
    let service = $derived(data.service);
    let serviceType = $derived(data.serviceType);
</script>

<svelte:head>
    <title>{service.name} | Servicios</title>
    <meta name="description" content="Detalles de {service.name}" />
</svelte:head>

<div class="mb-6">
    <a href="/cataloge/servicios" class="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft size={16} class="mr-2" />
        Volver a servicios
    </a>
</div>

<div class="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <!-- Imagen -->
        <div class="bg-muted relative aspect-square lg:aspect-auto lg:h-full flex items-center justify-center p-8">
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
            
            <h1 class="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                {service.name}
            </h1>
            
            <div class="space-y-6">
                <div class="pt-6 border-t border-border">
                    <h3 class="font-semibold text-lg mb-3">Información del servicio</h3>
                    <p class="text-muted-foreground leading-relaxed">
                        {service.description}
                    </p>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                    <div class="flex items-start gap-3">
                        <div class="bg-primary/10 p-2 rounded-full text-primary shrink-0">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <h4 class="font-medium text-sm">Profesionales expertos</h4>
                            <p class="text-xs text-muted-foreground mt-1">Personal altamente calificado</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="bg-primary/10 p-2 rounded-full text-primary shrink-0">
                            <Clock size={20} />
                        </div>
                        <div>
                            <h4 class="font-medium text-sm">Ejecución a tiempo</h4>
                            <p class="text-xs text-muted-foreground mt-1">Cumplimos los plazos acordados</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-10 pt-8 border-t border-border">
                <button class="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-3 px-8 rounded-full transition-colors flex items-center justify-center gap-2">
                    Solicitar Cotización de Servicio
                </button>
                <p class="text-xs text-center sm:text-left text-muted-foreground mt-4">
                    Comunícate con nosotros para agendar una visita técnica o pedir presupuesto.
                </p>
            </div>
        </div>
    </div>
</div>
