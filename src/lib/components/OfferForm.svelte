<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    import { api } from "$convex/_generated/api";
    import { useMutation } from "convex-svelte";
    import { toast } from "svelte-sonner";
    import type { Doc } from "$convex/_generated/dataModel";

    let {
        offer = null,
        onSuccess,
    }: {
        offer?: Doc<"offers"> | null;
        onSuccess: () => void;
    } = $props();

    let isLoading = $state(false);
    let text = $state(offer?.text ?? "");
    let isActive = $state(offer ? offer.isActive : true);

    const createOffer = useMutation(api.offers.create);
    const updateOffer = useMutation(api.offers.update);

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        if (!text.trim()) {
            toast.error("El texto de la oferta es obligatorio");
            return;
        }

        isLoading = true;
        try {
            if (offer) {
                await updateOffer({
                    id: offer._id,
                    text,
                    isActive,
                });
                toast.success("Oferta actualizada exitosamente");
            } else {
                await createOffer({
                    text,
                    isActive,
                });
                toast.success("Oferta creada exitosamente");
            }
            onSuccess();
        } catch (error) {
            console.error("Error saving offer:", error);
            toast.error("Error al guardar la oferta");
        } finally {
            isLoading = false;
        }
    }
</script>

<form onsubmit={handleSubmit} class="space-y-6">
    <div class="space-y-2">
        <Label for="text">Texto de la Oferta</Label>
        <Input
            id="text"
            bind:value={text}
            placeholder="Ej. ¡20% de descuento en paneles solares este mes!"
            required
        />
        <p class="text-xs text-muted-foreground">Este texto aparecerá en la parte superior del sitio web.</p>
    </div>

    <div class="flex items-center space-x-2 bg-muted/50 p-4 rounded-lg border border-border">
        <input
            type="checkbox"
            id="isActive"
            bind:checked={isActive}
            class="h-4 w-4 rounded border-border accent-primary cursor-pointer"
        />
        <div class="space-y-1 leading-none">
            <Label for="isActive" class="cursor-pointer font-medium">Oferta Activa</Label>
            <p class="text-xs text-muted-foreground">Si la marcas como activa, las demás ofertas se desactivarán automáticamente.</p>
        </div>
    </div>

    <div class="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onclick={onSuccess}>
            Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar Oferta"}
        </Button>
    </div>
</form>
