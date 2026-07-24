<script lang="ts">
    import { Plus, Edit, Trash2 } from "@lucide/svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { toast } from "$lib/toast";
    import SectionForm from "$lib/components/SectionForm.svelte";
    import { useQuery, useMutation } from "convex-svelte";
    import { api } from "$convex/_generated/api";

    export interface Section {
        _id: string;
        name: string;
        slug?: string;
        description?: string;
        order?: number;
        imageUrl?: string;
    }

    // 1. Instancia de la Query en Svelte 5
    const sectionsQuery = useQuery(api.sections.list, {});

    // 2. Mutaciones
    const removeSectionMutation = useMutation(api.sections.remove);
    const generateUploadUrlMutation = useMutation(
        api.sections.generateUploadUrl,
    );

    // Estados locales
    let showForm = $state(false);
    let editingSection = $state<Section | null>(null);

    // 3. Reactividad limpia con $derived sin el signo '$'
    let sortedSections = $derived(
        [...(sectionsQuery.data ?? [])].sort(
            (a, b) => (a.order ?? 0) - (b.order ?? 0),
        ),
    );

    async function handleDelete(id: string) {
        if (confirm("¿Estás seguro de eliminar esta sección?")) {
            try {
                await removeSectionMutation({ id });
                toast.success("Sección eliminada");
            } catch (error: any) {
                toast.error(error.message || "Error al eliminar sección");
            }
        }
    }

    function handleEdit(section: Section) {
        editingSection = section;
        showForm = true;
    }

    function handleFormClose() {
        showForm = false;
        editingSection = null;
    }

    async function handleGenerateUploadUrl() {
        return await generateUploadUrlMutation({});
    }
</script>

<div class="p-6">
    <div class="mx-auto max-w-7xl">
        <!-- Encabezado de la página -->
        <div class="mb-6 flex items-center justify-between">
            <h1 class="font-sans text-2xl font-bold tracking-widest">
                Secciones
            </h1>
            <Button onclick={() => (showForm = true)} class="gap-2">
                <Plus size={20} />
                Nueva sección
            </Button>
        </div>

        <!-- Estados de carga / error opcionales -->
        {#if sectionsQuery.isLoading}
            <div class="py-12 text-center text-muted-foreground">
                Cargando secciones...
            </div>
        {:else}
            <!-- Grid de Secciones -->
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {#each sortedSections as section (section._id)}
                    <Card.Root
                        class="group relative flex flex-col overflow-hidden p-0 transition-all duration-200 hover:border-border/80 hover:shadow-md"
                    >
                        <!-- Imagen de la Sección (Totalmente al ras del borde superior) -->
                        {#if section.imageUrl}
                            <div
                                class="relative h-40 w-full shrink-0 overflow-hidden bg-muted p-0 m-0"
                            >
                                <img
                                    src={section.imageUrl}
                                    alt={section.name}
                                    class="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div
                                    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60"
                                ></div>
                            </div>
                        {/if}

                        <!-- Contenido de la Sección -->
                        <div class="flex flex-1 flex-col justify-between p-5">
                            <div class="space-y-2">
                                <div
                                    class="flex items-center justify-between gap-2"
                                >
                                    <h3
                                        class="font-sans text-xl font-bold tracking-wide"
                                    >
                                        {section.name}
                                    </h3>
                                    {#if section.order !== undefined}
                                        <span
                                            class="rounded-full bg-accent/80 px-2.5 py-0.5 text-xs font-medium tracking-wide text-accent-foreground"
                                        >
                                            Orden: {section.order}
                                        </span>
                                    {/if}
                                </div>

                                {#if section.description}
                                    <p
                                        class="text-sm text-muted-foreground line-clamp-2"
                                    >
                                        {section.description}
                                    </p>
                                {/if}
                            </div>

                            <!-- Botones de Acción -->
                            <div
                                class="mt-4 flex items-center justify-end gap-2 border-t border-border/40 pt-3"
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onclick={() => handleEdit(section)}
                                    class="gap-1.5"
                                >
                                    <Edit size={16} />
                                    Editar
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onclick={() => handleDelete(section._id)}
                                    class="gap-1.5"
                                >
                                    <Trash2 size={16} />
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    </Card.Root>
                {/each}
            </div>

            {#if sortedSections.length === 0}
                <div class="py-12 text-center">
                    <p class="text-muted-foreground tracking-wide">
                        No hay secciones creadas aún
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
                <h2 class="mb-6 text-xl font-bold tracking-widest">
                    {editingSection ? "Editar sección" : "Nueva sección"}
                </h2>

                <SectionForm
                    section={editingSection}
                    onClose={handleFormClose}
                    generateUploadUrl={handleGenerateUploadUrl}
                />
            </div>
        </div>
    {/if}
</div>
