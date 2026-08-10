<script lang="ts">
    import { onMount } from "svelte";
    import { Wrench } from "@lucide/svelte";
    import ServiceCardCustomer from "$lib/components/ServiceCardCustomer.svelte";
    import SearchAndFilters from "$lib/components/SearchAndFilters.svelte";
    import type { Doc, Id } from "$convex/_generated/dataModel";

    interface PageData {
        services: Doc<"services">[];
        serviceTypes: Doc<"serviceTypes">[];
    }

    let { data }: { data: PageData } = $props();

    // Estado de filtros
    let searchQuery = $state("");
    let filterCategory = $state("");

    // Servicios filtrados
    let filteredServices = $derived.by(() => {
        if (!data.services) return [];

        return data.services.filter((service: Doc<"services">) => {
            const matchesSearch =
                searchQuery === "" ||
                service.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                service.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            const matchesCategory =
                filterCategory === "" ||
                service.serviceTypeId === filterCategory;

            return matchesSearch && matchesCategory;
        });
    });

    // Helper para obtener nombre del tipo de servicio
    function getServiceTypeName(
        typeId: Id<"serviceTypes"> | string | null | undefined,
    ): string {
        if (!typeId || !data.serviceTypes) return "Sin clasificar";
        const type = data.serviceTypes.find((t) => t._id === typeId);
        return type?.name || "Sin clasificar";
    }

    // Verificar si hay filtros activos
    let hasActiveFilters = $derived(
        searchQuery !== "" || filterCategory !== "",
    );

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
    <title>Servicios | Catálogo</title>
    <meta
        name="description"
        content="Explora nuestro catálogo de servicios especializados, instalación y mano de obra."
    />
</svelte:head>

<!-- Filtros -->
<div class="mb-8">
    <SearchAndFilters
        bind:searchQuery
        bind:filterCategory
        categories={data.serviceTypes ?? []}
        {hasActiveFilters}
        onClearFilters={clearFilters}
        getCategoryName={getServiceTypeName}
    />
</div>

<!-- Grid de Servicios -->
{#if filteredServices.length === 0}
    <div class="text-center py-20">
        <Wrench class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-foreground mb-2">
            No se encontraron servicios
        </h3>
        <p class="text-muted-foreground">
            {hasActiveFilters
                ? "Intenta ajustar los filtros para ver más resultados."
                : "No hay servicios disponibles en este momento."}
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
    <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
        {#each filteredServices as service (service._id)}
            <ServiceCardCustomer {service} {getServiceTypeName} />
        {/each}
    </div>

    <!-- Contador de resultados -->
    <div class="mt-8 text-center text-sm text-muted-foreground">
        Mostrando {filteredServices.length} de {data.services.length} servicios
        {#if hasActiveFilters}
            (filtrados)
        {/if}
    </div>
{/if}
