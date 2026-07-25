<script lang="ts">
    import { useQuery, useMutation } from "convex-svelte";
    import { api } from "$convex/_generated/api";
    import type { Doc, Id } from "$convex/_generated/dataModel";
    import type { ProductSchema } from "$lib/schemas/product";
    import type { InferOutput } from "valibot";
    import { Plus } from "@lucide/svelte";
    import { toast } from "$lib/toast";

    // Componentes de UI
    import ProductCard from "$lib/components/ProductCard.svelte";
    import SearchAndFilters from "$lib/components/SearchAndFilters.svelte";
    import ProductForm from "$lib/components/ProductForm.svelte";
    import { Button } from "$lib/components/ui/button";
    import * as Dialog from "$lib/components/ui/dialog";

    // Tipos extraídos del modelo de Convex y Schemas
    type Product = Doc<"products">;
    type Section = Doc<"sections">;
    type Category = Doc<"categories">;
    type ProductFormData = InferOutput<ProductSchema>;

    // --- Estado Local (Svelte 5 Runes) ---
    let showForm = $state(false);
    let editingProduct = $state<Product | null>(null);

    // Filtros
    let searchQuery = $state("");
    let filterSection = $state("");
    let filterCategory = $state("");
    let filterPriceMin = $state<number | undefined>(undefined);
    let filterPriceMax = $state<number | undefined>(undefined);
    let showFilters = $state(false);

    // --- Consultas y Mutaciones de Convex ---
    const productsQuery = useQuery(api.products.list, {});
    const sectionsQuery = useQuery(api.sections.list, {});
    const categoriesQuery = useQuery(api.categories.list, {});

    const removeProduct = useMutation(api.products.remove);
    const createProduct = useMutation(api.products.create);
    const updateProduct = useMutation(api.products.update);
    const generateUploadUrl = useMutation(api.products.generateUploadUrl);

    // Helpers para nombres de sección/categoría
    function getSectionName(sectionId: string) {
        const section = (sectionsQuery.data as Section[] | undefined)?.find(
            (s) => s._id === sectionId,
        );
        return section?.name || "Sin sección";
    }

    function getCategoryName(
        categoryId: Id<"categories"> | string | null | undefined,
    ): string {
        if (!categoryId) return "Sin categoría";
        const category = categoriesQuery.data?.find(
            (c) => c._id === categoryId,
        );
        return category ? category.name : "Desconocida";
    }

    // --- Productos Filtrados (Derivado Reactivo) ---
    let filteredProducts = $derived.by(() => {
        const list = (productsQuery.data as Product[] | undefined) || [];
        return list.filter((product) => {
            if (
                searchQuery &&
                !product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
                return false;
            }
            if (filterSection && product.slug !== filterSection) {
                return false;
            }
            if (filterCategory && product.categoryId !== filterCategory) {
                return false;
            }
            if (
                filterPriceMin !== undefined &&
                product.price < filterPriceMin
            ) {
                return false;
            }
            if (
                filterPriceMax !== undefined &&
                product.price > filterPriceMax
            ) {
                return false;
            }
            return true;
        });
    });

    let hasActiveFilters = $derived(
        Boolean(
            filterSection ||
            filterCategory ||
            filterPriceMin !== undefined ||
            filterPriceMax !== undefined,
        ),
    );

    function clearFilters() {
        filterSection = "";
        filterCategory = "";
        filterPriceMin = undefined;
        filterPriceMax = undefined;
    }

    // --- Acciones ---
    async function handleDelete(id: Id<"products">) {
        if (confirm("¿Estás seguro de eliminar este producto?")) {
            try {
                await removeProduct({ id });
                toast.success("Producto eliminado");
            } catch (error) {
                toast.error("Error al eliminar producto");
            }
        }
    }

    function handleEdit(product: Product) {
        editingProduct = product;
        showForm = true;
    }

    function handleFormClose() {
        showForm = false;
        editingProduct = null;
    }

    // Firma ajustada para recibir los datos del formulario (ProductFormData)
    async function handleSave(data: ProductFormData) {
        try {
            const payload = {
                ...data,
                categoryId: data.categoryId as Id<"categories">,
            };

            if (editingProduct) {
                await updateProduct({
                    id: editingProduct._id,
                    ...payload,
                });
                toast.success("Producto actualizado");
            } else {
                await createProduct(payload);
                toast.success("Producto creado");
            }
            handleFormClose();
        } catch (error) {
            console.error("Error al guardar producto:", error);
            toast.error("Error al guardar producto");
        }
    }
</script>

<div class="p-6">
    <div class="max-w-7xl mx-auto">
        <!-- Encabezado y Filtros -->
        <div class="flex flex-col gap-4 mb-6">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold tracking-widest font-sans">
                    Productos
                </h1>
                <Button
                    onclick={() => {
                        editingProduct = null;
                        showForm = true;
                    }}
                >
                    <Plus size={20} class="mr-2 inline-block" />
                    Nuevo producto
                </Button>
            </div>

            <SearchAndFilters
                bind:searchQuery
                bind:filterSection
                bind:filterCategory
                bind:filterPriceMin
                bind:filterPriceMax
                sections={sectionsQuery.data || []}
                categories={categoriesQuery.data || []}
                {hasActiveFilters}
                onClearFilters={clearFilters}
                {getSectionName}
                {getCategoryName}
            />
        </div>

        <!-- Estado de Carga -->
        {#if productsQuery.isLoading}
            <div class="min-h-100 flex items-center justify-center">
                <div
                    class="h-6 w-6 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900 dark:border-neutral-800 dark:border-t-neutral-100"
                ></div>
            </div>
        {:else}
            <!-- Grid de Productos -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {#each filteredProducts as product (product._id)}
                    <ProductCard
                        {product}
                        {getSectionName}
                        {getCategoryName}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                {/each}
            </div>

            <!-- Estado Vacío -->
            {#if filteredProducts.length === 0}
                <div class="text-center py-12">
                    <p class="text-muted-foreground tracking-wide">
                        {hasActiveFilters || searchQuery
                            ? "No se encontraron productos con los filtros aplicados"
                            : "No hay productos creados aún"}
                    </p>
                </div>
            {/if}
        {/if}
    </div>

    <!-- Form Modal (Integración nativa con shadcn-svelte Dialog) -->
    <!-- Form Modal (Integración con scroll interno y límites de altura) -->
    <Dialog.Root
        bind:open={showForm}
        onOpenChange={(open) => {
            if (!open) handleFormClose();
        }}
    >
        <Dialog.Content
            class="flex max-h-[80vh] flex-col overflow-hidden sm:max-w-[600px] md:max-h-[95vh]"
        >
            <!-- Header Fijo -->
            <Dialog.Header class="shrink-0 pb-2">
                <Dialog.Title>
                    {editingProduct ? "Editar producto" : "Nuevo producto"}
                </Dialog.Title>
            </Dialog.Header>

            <!-- Contenedor Scrolleable del Formulario -->
            <div class="flex-1 overflow-y-auto pr-1">
                <ProductForm
                    product={editingProduct}
                    sections={sectionsQuery.data || []}
                    categories={categoriesQuery.data || []}
                    onSave={handleSave}
                    onCancel={handleFormClose}
                    {generateUploadUrl}
                />
            </div>
        </Dialog.Content>
    </Dialog.Root>
</div>
