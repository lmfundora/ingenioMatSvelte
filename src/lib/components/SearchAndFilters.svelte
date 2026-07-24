<script lang="ts">
    import { Search, Filter, X as Close } from "@lucide/svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import * as Select from "$lib/components/ui/select/index.js";

    interface Section {
        _id: string;
        name: string;
    }

    interface Category {
        _id: string;
        name: string;
    }

    interface Props {
        searchQuery: string;
        filterSection?: string;
        filterCategory?: string;
        filterPriceMin?: number | undefined;
        filterPriceMax?: number | undefined;
        sections?: Section[];
        categories?: Category[];
        hasActiveFilters?: boolean;
        onClearFilters: () => void;
        getSectionName: (sectionId: string) => string;
        getCategoryName: (categoryId: string | null) => string;
    }

    let {
        searchQuery = $bindable(""),
        filterSection = $bindable(""),
        filterCategory = $bindable(""),
        filterPriceMin = $bindable<number | undefined>(undefined),
        filterPriceMax = $bindable<number | undefined>(undefined),
        sections = [],
        categories = [],
        hasActiveFilters = false,
        onClearFilters,
        getSectionName,
        getCategoryName,
    }: Props = $props();

    // Control local para abrir/cerrar el Popover
    let popoverOpen = $state(false);

    // Labels dinámicos para los Select triggers
    let selectedSectionLabel = $derived(
        filterSection ? getSectionName(filterSection) : "Todas las secciones",
    );

    let selectedCategoryLabel = $derived(
        filterCategory
            ? getCategoryName(filterCategory)
            : "Todas las categorías",
    );
</script>

<div class="space-y-3">
    <!-- Barra de Búsqueda -->
    <div class="relative">
        <Search
            class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            size={18}
        />
        <Input
            type="text"
            placeholder="Buscar por nombre..."
            bind:value={searchQuery}
            class="pl-10"
        />
    </div>

    <!-- Barra de Filtros y Badges -->
    <div class="flex flex-wrap items-center gap-3">
        <!-- Popover de Filtros de shadcn -->
        <Popover.Root bind:open={popoverOpen}>
            <Popover.Trigger>
                {#snippet child({ props })}
                    <Button
                        variant="outline"
                        size="sm"
                        {...props}
                        class="gap-2 relative"
                    >
                        <Filter size={16} />
                        <span>Filtros</span>
                        {#if hasActiveFilters}
                            <span
                                class="h-2 w-2 rounded-full bg-primary animate-pulse"
                            ></span>
                        {/if}
                    </Button>
                {/snippet}
            </Popover.Trigger>

            <Popover.Content class="w-80 p-4 space-y-4" align="start">
                <!-- Header con Título y Botón de Cerrar -->
                <div class="flex items-center justify-between border-b pb-2">
                    <h3 class="font-semibold tracking-tight text-sm">
                        Filtros
                    </h3>
                    <div class="flex items-center gap-2">
                        {#if hasActiveFilters}
                            <Button
                                variant="ghost"
                                size="sm"
                                onclick={onClearFilters}
                                class="h-auto p-0 text-xs text-muted-foreground hover:text-foreground mr-1"
                            >
                                Limpiar
                            </Button>
                        {/if}
                        <Button
                            variant="ghost"
                            size="icon"
                            class="h-6 w-6 p-0 text-muted-foreground hover:text-foreground rounded-full"
                            onclick={() => (popoverOpen = false)}
                        >
                            <Close size={14} />
                        </Button>
                    </div>
                </div>

                <!-- Filtro por Sección -->
                <div class="space-y-1.5">
                    <label class="text-xs font-medium text-muted-foreground">
                        Sección
                    </label>
                    <Select.Root type="single" bind:value={filterSection}>
                        <Select.Trigger class="w-full">
                            {selectedSectionLabel}
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Item value=""
                                >Todas las secciones</Select.Item
                            >
                            {#each sections as section (section._id)}
                                <Select.Item value={section._id}>
                                    {section.name}
                                </Select.Item>
                            {/each}
                        </Select.Content>
                    </Select.Root>
                </div>

                <!-- Filtro por Categoría -->
                <div class="space-y-1.5">
                    <label class="text-xs font-medium text-muted-foreground">
                        Categoría
                    </label>
                    <Select.Root type="single" bind:value={filterCategory}>
                        <Select.Trigger class="w-full">
                            {selectedCategoryLabel}
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Item value=""
                                >Todas las categorías</Select.Item
                            >
                            {#each categories as category (category._id)}
                                <Select.Item value={category._id}>
                                    {category.name}
                                </Select.Item>
                            {/each}
                        </Select.Content>
                    </Select.Root>
                </div>

                <!-- Filtro por Rango de Precio -->
                <div class="space-y-1.5">
                    <span class="text-xs font-medium text-muted-foreground">
                        Rango de precio
                    </span>
                    <div class="flex gap-2">
                        <Input
                            type="number"
                            placeholder="Mín"
                            value={filterPriceMin ?? ""}
                            oninput={(e) => {
                                const val = e.currentTarget.value;
                                filterPriceMin =
                                    val && Number(val) > 0
                                        ? Number(val)
                                        : undefined;
                            }}
                            class="h-9"
                        />
                        <Input
                            type="number"
                            placeholder="Máx"
                            value={filterPriceMax ?? ""}
                            oninput={(e) => {
                                const val = e.currentTarget.value;
                                filterPriceMax =
                                    val && Number(val) > 0
                                        ? Number(val)
                                        : undefined;
                            }}
                            class="h-9"
                        />
                    </div>
                </div>

                <!-- Botón de Listo / Aplicar para cerrar -->
                <Button
                    class="w-full mt-2"
                    size="sm"
                    onclick={() => (popoverOpen = false)}
                >
                    Aplicar
                </Button>
            </Popover.Content>
        </Popover.Root>

        <!-- Badges de Filtros Activos -->
        {#if hasActiveFilters}
            <div class="flex flex-wrap gap-2 items-center">
                {#if filterSection}
                    <Badge variant="secondary" class="gap-1.5 pr-1.5">
                        <span>Sección: {getSectionName(filterSection)}</span>
                        <button
                            type="button"
                            onclick={() => (filterSection = "")}
                            class="rounded-full hover:bg-muted p-0.5 transition-colors"
                        >
                            <Close size={12} />
                        </button>
                    </Badge>
                {/if}

                {#if filterCategory}
                    <Badge variant="secondary" class="gap-1.5 pr-1.5">
                        <span>Categoría: {getCategoryName(filterCategory)}</span
                        >
                        <button
                            type="button"
                            onclick={() => (filterCategory = "")}
                            class="rounded-full hover:bg-muted p-0.5 transition-colors"
                        >
                            <Close size={12} />
                        </button>
                    </Badge>
                {/if}

                {#if filterPriceMin !== undefined || filterPriceMax !== undefined}
                    <Badge variant="secondary" class="gap-1.5 pr-1.5">
                        <span>
                            Precio: ${filterPriceMin ?? "0"} - ${filterPriceMax ??
                                "∞"}
                        </span>
                        <button
                            type="button"
                            onclick={() => {
                                filterPriceMin = undefined;
                                filterPriceMax = undefined;
                            }}
                            class="rounded-full hover:bg-muted p-0.5 transition-colors"
                        >
                            <Close size={12} />
                        </button>
                    </Badge>
                {/if}
            </div>
        {/if}
    </div>
</div>
