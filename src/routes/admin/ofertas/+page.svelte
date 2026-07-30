<script lang="ts">
    import { api } from "$convex/_generated/api";
    import { useQuery, useMutation } from "convex-svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Plus, Edit2, Trash2, Megaphone, CheckCircle2, XCircle } from "@lucide/svelte";
    import { toast } from "svelte-sonner";
    import OfferForm from "$lib/components/OfferForm.svelte";
    import type { Doc } from "$convex/_generated/dataModel";

    const offersQuery = useQuery(api.offers.list, {});
    const removeOffer = useMutation(api.offers.remove);
    const updateOffer = useMutation(api.offers.update);

    let isDialogOpen = $state(false);
    let selectedOffer = $state<Doc<"offers"> | null>(null);

    function openDialog(offer: Doc<"offers"> | null = null) {
        selectedOffer = offer;
        isDialogOpen = true;
    }

    function handleDialogClose() {
        isDialogOpen = false;
        selectedOffer = null;
    }

    async function handleDelete(id: any) {
        if (confirm("¿Estás seguro de que deseas eliminar esta oferta?")) {
            try {
                await removeOffer({ id });
                toast.success("Oferta eliminada exitosamente");
            } catch (error) {
                console.error("Error deleting offer:", error);
                toast.error("Error al eliminar la oferta");
            }
        }
    }

    async function toggleActive(offer: Doc<"offers">) {
        try {
            await updateOffer({
                id: offer._id,
                isActive: !offer.isActive,
            });
            toast.success(offer.isActive ? "Oferta desactivada" : "Oferta activada");
        } catch (error) {
            console.error("Error toggling offer:", error);
            toast.error("Error al cambiar el estado de la oferta");
        }
    }
</script>

<svelte:head>
    <title>Gestión de Ofertas | Admin</title>
</svelte:head>

<div class="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
    <div class="flex justify-between items-center bg-card p-6 rounded-2xl border border-border shadow-sm">
        <div>
            <h1 class="text-3xl font-bold text-foreground flex items-center gap-3">
                <Megaphone class="w-8 h-8 text-primary" />
                Gestión de Ofertas
            </h1>
            <p class="text-muted-foreground mt-2">
                Administra los textos promocionales que aparecen en la barra superior de la web.
            </p>
        </div>
        <Button onclick={() => openDialog()} class="gap-2 shadow-md">
            <Plus size={20} />
            Nueva Oferta
        </Button>
    </div>

    <!-- Lista de Ofertas -->
    {#if offersQuery.isLoading}
        <div class="grid grid-cols-1 gap-4">
            {#each Array(3) as _}
                <div class="h-24 bg-muted animate-pulse rounded-2xl"></div>
            {/each}
        </div>
    {:else if offersQuery.error}
        <div class="p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
            Error al cargar las ofertas: {offersQuery.error.message}
        </div>
    {:else if offersQuery.data}
        <div class="grid grid-cols-1 gap-4">
            {#each offersQuery.data as offer}
                <div class="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center justify-between gap-4 transition-all hover:border-primary/50">
                    <div class="flex items-center gap-4 flex-1">
                        <!-- Botón para alternar estado rápidamente -->
                        <button 
                            onclick={() => toggleActive(offer)}
                            class="p-2 rounded-full hover:bg-accent transition-colors flex-shrink-0"
                            title={offer.isActive ? "Desactivar oferta" : "Activar oferta"}
                        >
                            {#if offer.isActive}
                                <CheckCircle2 class="w-6 h-6 text-green-500" />
                            {:else}
                                <XCircle class="w-6 h-6 text-muted-foreground" />
                            {/if}
                        </button>

                        <div class="flex-1">
                            <p class={`text-lg font-medium transition-colors ${offer.isActive ? "text-foreground" : "text-muted-foreground line-through decoration-muted-foreground/50"}`}>
                                {offer.text}
                            </p>
                            <span class="text-xs uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full mt-2 inline-block {offer.isActive ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'}">
                                {offer.isActive ? 'Activa' : 'Inactiva'}
                            </span>
                        </div>
                    </div>

                    <div class="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            class="text-primary hover:text-primary hover:bg-primary/10"
                            onclick={() => openDialog(offer)}
                            title="Editar oferta"
                        >
                            <Edit2 size={18} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            class="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onclick={() => handleDelete(offer._id)}
                            title="Eliminar oferta"
                        >
                            <Trash2 size={18} />
                        </Button>
                    </div>
                </div>
            {:else}
                <div class="text-center p-12 bg-card rounded-2xl border border-border shadow-sm">
                    <Megaphone class="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 class="text-lg font-medium text-foreground mb-1">No hay ofertas creadas</h3>
                    <p class="text-muted-foreground">Crea tu primera oferta promocional para mostrarla en la web.</p>
                    <Button onclick={() => openDialog()} class="mt-4 gap-2">
                        <Plus size={20} />
                        Crear Oferta
                    </Button>
                </div>
            {/each}
        </div>
    {/if}
</div>

<!-- Modal Formulario -->
<Dialog.Root bind:open={isDialogOpen}>
    <Dialog.Content class="sm:max-w-[500px]">
        <Dialog.Header>
            <Dialog.Title>
                {selectedOffer ? "Editar Oferta" : "Nueva Oferta"}
            </Dialog.Title>
            <Dialog.Description>
                Rellena los detalles de la oferta promocional.
            </Dialog.Description>
        </Dialog.Header>
        
        {#if isDialogOpen}
            <OfferForm 
                offer={selectedOffer} 
                onSuccess={handleDialogClose} 
            />
        {/if}
    </Dialog.Content>
</Dialog.Root>
