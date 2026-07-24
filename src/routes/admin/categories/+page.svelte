<script lang="ts">
    import { Plus, Edit, Trash2 } from "@lucide/svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { toast } from "$lib/toast";
    import CategoryForm from "$lib/components/CategoryForm.svelte";
    import { useQuery, useMutation } from "convex-svelte";
    import { api } from "$convex/_generated/api";

    interface Category {
        _id: string;
        name: string;
        description?: string;
        order?: number;
    }

    // 1. Queries y Mutaciones con Convex
    const categoriesQuery = useQuery(api.categories.list, {});
    const createCategoryMutation = useMutation(api.categories.create);
    const updateCategoryMutation = useMutation(api.categories.update);
    const removeCategoryMutation = useMutation(api.categories.remove);

    // 2. Estados locales con Runes
    let showForm = $state(false);
    let editingCategory = $state<Category | null>(null);

    // 3. Reactividad con $derived para el ordenamiento
    let sortedCategories = $derived(
        [...(categoriesQuery.data ?? [])].sort(
            (a, b) => (a.order ?? 0) - (b.order ?? 0),
        ),
    );

    async function handleDelete(id: string) {
        if (confirm("¿Estás seguro de eliminar esta categoría?")) {
            try {
                await removeCategoryMutation({ id });
                toast.success("Categoría eliminada");
            } catch (error: any) {
                if (error?.message?.includes("productos asignados")) {
                    toast.error("No se puede eliminar: tiene productos");
                } else {
                    toast.error("Error al eliminar categoría");
                }
            }
        }
    }

    function handleEdit(category: Category) {
        editingCategory = category;
        showForm = true;
    }

    function handleFormClose() {
        showForm = false;
        editingCategory = null;
    }

    async function handleSave(data: { name: string }) {
        try {
            if (editingCategory) {
                await updateCategoryMutation({
                    id: editingCategory._id,
                    ...data,
                });
                toast.success("Categoría actualizada");
            } else {
                await createCategoryMutation(data);
                toast.success("Categoría creada");
            }
            handleFormClose();
        } catch (error) {
            toast.error("Error al guardar categoría");
        }
    }
</script>

<div class="p-6">
    <div class="mx-auto max-w-7xl">
        <!-- Encabezado de la página -->
        <div class="mb-6 flex items-center justify-between">
            <h1 class="font-sans text-2xl font-bold tracking-widest">
                Categorías
            </h1>
            <Button onclick={() => (showForm = true)} class="gap-2">
                <Plus size={20} />
                Nueva categoría
            </Button>
        </div>

        <!-- Grid de Categorías -->
        {#if categoriesQuery.isLoading}
            <div class="py-12 text-center text-muted-foreground">
                Cargando categorías...
            </div>
        {:else}
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {#each sortedCategories as category (category._id)}
                    <Card.Root class="flex flex-col justify-between">
                        <Card.Header>
                            <Card.Title>{category.name}</Card.Title>
                            {#if category.description}
                                <Card.Description
                                    >{category.description}</Card.Description
                                >
                            {/if}
                            {#if category.order !== undefined}
                                <div class="mt-2">
                                    <span
                                        class="rounded-full bg-accent px-2 py-1 text-xs tracking-wide"
                                    >
                                        Orden: {category.order}
                                    </span>
                                </div>
                            {/if}
                        </Card.Header>
                        <Card.Footer
                            class="flex gap-2 justify-between border-t border-border/40 pt-3"
                        >
                            <Button
                                variant="ghost"
                                size="sm"
                                onclick={() => handleEdit(category)}
                                class="gap-1.5"
                            >
                                <Edit size={16} />
                                Editar
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onclick={() => handleDelete(category._id)}
                                class="gap-1.5"
                            >
                                <Trash2 size={16} />
                                Eliminar
                            </Button>
                        </Card.Footer>
                    </Card.Root>
                {/each}
            </div>

            {#if sortedCategories.length === 0}
                <div class="py-12 text-center">
                    <p class="text-muted-foreground tracking-wide">
                        No hay categorías creadas aún
                    </p>
                </div>
            {/if}
        {/if}
    </div>

    <!-- Modal Formulario -->
    {#if showForm}
        <div
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
            <div
                class="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-xl"
            >
                <h2 class="mb-6 font-serif text-xl font-bold tracking-widest">
                    {editingCategory ? "Editar categoría" : "Nueva categoría"}
                </h2>

                <CategoryForm
                    category={editingCategory}
                    onClose={handleFormClose}
                    onSave={handleSave}
                />
            </div>
        </div>
    {/if}
</div>
