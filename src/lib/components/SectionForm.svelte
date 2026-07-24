<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import { toast } from "$lib/toast";
    import { optimizeImage } from "$lib/image-utils";
    import { useMutation } from "convex-svelte";
    import { api } from "$convex/_generated/api";

    interface Section {
        _id: string;
        name: string;
        slug?: string;
        description?: string;
        order?: number;
        imageUrl?: string;
    }

    interface Props {
        section?: Section | null;
        onClose: () => void;
        generateUploadUrl: () => Promise<string>;
    }

    let { section = null, onClose, generateUploadUrl }: Props = $props();

    // Mutaciones directas de Convex
    const createSectionMutation = useMutation(api.sections.create);
    const updateSectionMutation = useMutation(api.sections.update);

    // Estados del formulario
    let name = $state(section?.name ?? "");
    let description = $state(section?.description ?? "");
    let order = $state(section?.order ?? 0);
    let slug = $state(section?.slug ?? "");
    let imageUrl = $state(section?.imageUrl ?? "");

    let selectedFile = $state<File | null>(null);
    let imagePreview = $state<string | null>(section?.imageUrl ?? null);

    let isSubmitting = $state(false);
    let isUploading = $state(false);

    // Genera un slug automáticamente si el usuario no escribe uno
    function generateSlug(text: string): string {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }

    async function handleFileSelect(e: Event) {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            const file = target.files[0];
            selectedFile = file;
            imagePreview = URL.createObjectURL(file);
        }
    }

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("El nombre es obligatorio");
            return;
        }

        isSubmitting = true;

        try {
            let finalStorageId = imageUrl;

            // 1. Subir imagen si hay un nuevo archivo seleccionado
            if (selectedFile) {
                isUploading = true;
                const optimized = await optimizeImage(selectedFile, {
                    maxWidth: 800,
                    maxHeight: 600,
                    quality: 0.8,
                    format: "image/webp",
                });

                const uploadUrl = await generateUploadUrl();
                const uploadRes = await fetch(uploadUrl, {
                    method: "POST",
                    headers: { "Content-Type": optimized.type },
                    body: optimized,
                });

                if (!uploadRes.ok) {
                    throw new Error(
                        "Error al subir la imagen al almacenamiento",
                    );
                }

                const { storageId } = await uploadRes.json();
                finalStorageId = storageId;
                isUploading = false;
            }

            // 2. Preparar payload
            const finalSlug = slug.trim() || generateSlug(name);
            const payload = {
                name: name.trim(),
                description: description.trim(),
                order: Number(order),
                slug: finalSlug,
                imageUrl: finalStorageId || undefined,
            };

            // 3. Crear o Actualizar en Convex
            if (section?._id) {
                await updateSectionMutation({
                    id: section._id,
                    ...payload,
                });
                toast.success("Sección actualizada");
            } else {
                await createSectionMutation(payload);
                toast.success("Sección creada");
            }

            onClose();
        } catch (error: any) {
            console.error("Error al guardar sección:", error);
            toast.error(error.message || "Error al procesar el formulario");
        } finally {
            isSubmitting = false;
            isUploading = false;
        }
    }
</script>

<form onsubmit={handleSubmit} class="space-y-4">
    <!-- Nombre -->
    <div class="space-y-2">
        <Label for="name">Nombre</Label>
        <Input
            id="name"
            bind:value={name}
            placeholder="Ej. Entrantes"
            required
        />
    </div>

    <!-- Descripción -->
    <div class="space-y-2">
        <Label for="description">Descripción</Label>
        <Textarea
            id="description"
            bind:value={description}
            placeholder="Descripción breve de la sección"
            rows={3}
        />
    </div>

    <!-- Orden y Slug -->
    <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
            <Label for="order">Orden</Label>
            <Input id="order" type="number" bind:value={order} min="0" />
        </div>
        <div class="space-y-2">
            <Label for="slug">Slug (URL)</Label>
            <Input id="slug" bind:value={slug} placeholder="entrantes" />
        </div>
    </div>

    <!-- Imagen -->
    <div class="space-y-2">
        <Label for="image">Imagen de la sección</Label>
        {#if imagePreview}
            <div
                class="relative h-32 w-full overflow-hidden rounded-md border border-border"
            >
                <img
                    src={imagePreview}
                    alt="Preview"
                    class="h-full w-full object-cover"
                />
            </div>
        {/if}
        <Input
            id="image"
            type="file"
            accept="image/*"
            onchange={handleFileSelect}
            disabled={isSubmitting}
        />
    </div>

    <!-- Botones de Acción -->
    <div class="flex justify-end gap-3 pt-4">
        <Button
            type="button"
            variant="outline"
            onclick={onClose}
            disabled={isSubmitting}
        >
            Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
            {#if isUploading}
                Subiendo imagen...
            {:else if isSubmitting}
                Guardando...
            {:else}
                {section ? "Guardar Cambios" : "Crear Sección"}
            {/if}
        </Button>
    </div>
</form>
