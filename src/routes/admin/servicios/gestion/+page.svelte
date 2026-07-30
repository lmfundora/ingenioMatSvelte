<script lang="ts">
    import { Plus, Edit, Trash2 } from "@lucide/svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { toast } from "$lib/toast";
    import ServiceForm from "$lib/components/ServiceForm.svelte";
    import { useQuery, useMutation } from "convex-svelte";
    import { api } from "$convex/_generated/api";
    import type { Id } from "$convex/_generated/dataModel";

    interface Service {
        _id: Id<"services">;
        name: string;
        description: string;
        imageUrl: string;
        serviceTypeId: Id<"serviceTypes">;
    }

    const servicesQuery = useQuery(api.services.list, {});
    const serviceTypesQuery = useQuery(api.serviceTypes.list, {});
    
    const createServiceMutation = useMutation(api.services.create);
    const updateServiceMutation = useMutation(api.services.update);
    const removeServiceMutation = useMutation(api.services.remove);

    let showForm = $state(false);
    let editingService = $state<Service | null>(null);

    function getServiceTypeName(id: string) {
        if (!serviceTypesQuery.data) return "Desconocido";
        const type = serviceTypesQuery.data.find(t => t._id === id);
        return type ? type.name : "Desconocido";
    }

    async function handleDelete(id: string) {
        if (confirm("¿Estás seguro de eliminar este servicio?")) {
            try {
                await removeServiceMutation({ id });
                toast.success("Servicio eliminado");
            } catch (error: any) {
                toast.error("Error al eliminar servicio");
            }
        }
    }

    function handleEdit(service: Service) {
        editingService = service;
        showForm = true;
    }

    function handleFormClose() {
        showForm = false;
        editingService = null;
    }

    async function handleSave(data: any) {
        try {
            if (editingService) {
                await updateServiceMutation({
                    id: editingService._id,
                    ...data,
                });
                toast.success("Servicio actualizado");
            } else {
                await createServiceMutation(data);
                toast.success("Servicio creado");
            }
            handleFormClose();
        } catch (error) {
            toast.error("Error al guardar servicio");
        }
    }
</script>

<div class="p-6">
    <div class="mx-auto max-w-7xl">
        <div class="mb-6 flex items-center justify-between">
            <h1 class="font-sans text-2xl font-bold tracking-widest">
                Servicios
            </h1>
            <Button onclick={() => (showForm = true)} class="gap-2">
                <Plus size={20} />
                Nuevo servicio
            </Button>
        </div>

        {#if servicesQuery.isLoading}
            <div class="py-12 text-center text-muted-foreground">
                Cargando servicios...
            </div>
        {:else}
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {#if servicesQuery.data}
                    {#each servicesQuery.data as service (service._id)}
                        <Card.Root class="flex flex-col justify-between overflow-hidden">
                            {#if service.imageUrl}
                                <div class="w-full h-48 bg-muted">
                                    <img 
                                        src={service.imageUrl} 
                                        alt={service.name}
                                        class="w-full h-full object-cover"
                                    />
                                </div>
                            {/if}
                            <Card.Header>
                                <div class="flex items-center justify-between gap-2 mb-2">
                                    <span class="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">
                                        {getServiceTypeName(service.serviceTypeId)}
                                    </span>
                                </div>
                                <Card.Title>{service.name}</Card.Title>
                                <Card.Description class="line-clamp-2 mt-2">
                                    {service.description}
                                </Card.Description>
                            </Card.Header>
                            <Card.Footer
                                class="flex gap-2 justify-between border-t border-border/40 pt-3 mt-auto"
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onclick={() => handleEdit(service)}
                                    class="gap-1.5"
                                >
                                    <Edit size={16} />
                                    Editar
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onclick={() => handleDelete(service._id)}
                                    class="gap-1.5"
                                >
                                    <Trash2 size={16} />
                                    Eliminar
                                </Button>
                            </Card.Footer>
                        </Card.Root>
                    {/each}
                {/if}
            </div>

            {#if !servicesQuery.data || servicesQuery.data.length === 0}
                <div class="py-12 text-center">
                    <p class="text-muted-foreground tracking-wide">
                        No hay servicios creados aún
                    </p>
                </div>
            {/if}
        {/if}
    </div>

    {#if showForm}
        <div
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
            <div
                class="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-xl"
            >
                <h2 class="mb-6 font-kanit text-xl font-bold tracking-widest">
                    {editingService ? "Editar servicio" : "Nuevo servicio"}
                </h2>

                <ServiceForm
                    service={editingService}
                    onClose={handleFormClose}
                    onSave={handleSave}
                />
            </div>
        </div>
    {/if}
</div>
