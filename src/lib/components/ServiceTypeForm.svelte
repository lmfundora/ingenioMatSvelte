<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button/index.js";

    interface ServiceType {
        _id?: string;
        name: string;
    }

    let { serviceType, onClose, onSave } = $props<{
        serviceType: ServiceType | null;
        onClose: () => void;
        onSave: (data: { name: string }) => Promise<void>;
    }>();

    let formData = $state({
        name: serviceType?.name ?? "",
    });

    let isSubmitting = $state(false);

    async function handleSubmit(e: Event) {
        e.preventDefault();
        isSubmitting = true;
        try {
            await onSave({ name: formData.name });
        } finally {
            isSubmitting = false;
        }
    }
</script>

<form onsubmit={handleSubmit} class="space-y-4">
    <div class="space-y-2">
        <Label for="name">Nombre</Label>
        <Input
            id="name"
            bind:value={formData.name}
            placeholder="Ej. Energía Solar"
            required
            disabled={isSubmitting}
        />
    </div>

    <div class="flex justify-end gap-3 pt-4">
        <Button variant="outline" type="button" onclick={onClose} disabled={isSubmitting}>
            Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar"}
        </Button>
    </div>
</form>
