<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import type { Id } from "$convex/_generated/dataModel";
    import { useQuery, useMutation } from "convex-svelte";
    import { api } from "$convex/_generated/api";
    import { ImagePlus, X } from "@lucide/svelte";

    interface Service {
        _id?: Id<"services">;
        name: string;
        description: string;
        imageUrl: string;
        serviceTypeId: Id<"serviceTypes">;
        detalles?: string;
        fotosDeEjemplos?: string[];
        precioBase?: string;
        duracionEstimada?: string;
        areaDeCobertura?: string;
        requisitos?: string;
    }

    let { service, onClose, onSave } = $props<{
        service: Service | null;
        onClose: () => void;
        onSave: (data: { name: string; description: string; imageUrl: string; serviceTypeId: Id<"serviceTypes">; detalles?: string; fotosDeEjemplos?: string[]; precioBase?: string; duracionEstimada?: string; areaDeCobertura?: string; requisitos?: string }) => Promise<void>;
    }>();

    let serviceTypesQuery = useQuery(api.serviceTypes.list, {});
    let generateUploadUrl = useMutation(api.products.generateUploadUrl); // We can reuse the upload URL mutation from products if it exists

    let formData = $state({
        name: service?.name ?? "",
        description: service?.description ?? "",
        imageUrl: service?.imageUrl ?? "",
        serviceTypeId: service?.serviceTypeId ?? ("" as Id<"serviceTypes">),
        detalles: service?.detalles ?? "",
        fotosDeEjemplos: service?.fotosDeEjemplos ?? [],
        precioBase: service?.precioBase ?? "",
        duracionEstimada: service?.duracionEstimada ?? "",
        areaDeCobertura: service?.areaDeCobertura ?? "",
        requisitos: service?.requisitos ?? "",
    });

    let isSubmitting = $state(false);
    let isUploading = $state(false);
    let isUploadingExamples = $state(false);
    let fileInput: HTMLInputElement;
    let exampleImagesInput: HTMLInputElement;
    let previewUrl = $state(service?.imageUrl ?? "");
    let examplePreviewUrls = $state<string[]>(service?.fotosDeEjemplos ?? []);

    async function handleImageUpload(e: Event) {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;

        previewUrl = URL.createObjectURL(file);
        isUploading = true;
        try {
            const uploadUrl = await generateUploadUrl({});
            const result = await fetch(uploadUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });
            const { storageId } = await result.json();
            formData.imageUrl = storageId;
        } catch (error) {
            console.error("Error al subir imagen:", error);
        } finally {
            isUploading = false;
        }
    }

    async function handleExampleImagesUpload(e: Event) {
        const input = e.target as HTMLInputElement;
        const files = input.files;
        if (!files || files.length === 0) return;

        isUploadingExamples = true;
        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                const uploadUrl = await generateUploadUrl({});
                const result = await fetch(uploadUrl, {
                    method: "POST",
                    headers: { "Content-Type": file.type },
                    body: file,
                });
                const { storageId } = await result.json();
                return storageId;
            });

            const storageIds = await Promise.all(uploadPromises);
            formData.fotosDeEjemplos = [...(formData.fotosDeEjemplos || []), ...storageIds];
            
            // Add preview URLs
            const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
            examplePreviewUrls = [...examplePreviewUrls, ...newPreviews];
        } catch (error) {
            console.error("Error al subir imágenes de ejemplo:", error);
        } finally {
            isUploadingExamples = false;
            if (exampleImagesInput) {
                exampleImagesInput.value = "";
            }
        }
    }

    function removeExampleImage(index: number) {
        formData.fotosDeEjemplos = formData.fotosDeEjemplos?.filter((_, i) => i !== index) || [];
        examplePreviewUrls = examplePreviewUrls.filter((_, i) => i !== index);
    }

    async function handleSubmit(e: Event) {
        e.preventDefault();
        isSubmitting = true;
        try {
            await onSave({ ...formData });
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
            placeholder="Nombre del servicio"
            required
            disabled={isSubmitting}
        />
    </div>

    <div class="space-y-2">
        <Label for="serviceTypeId">Tipo de Servicio</Label>
        <select
            id="serviceTypeId"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            bind:value={formData.serviceTypeId}
            required
            disabled={isSubmitting || serviceTypesQuery.isLoading}
        >
            <option value="" disabled>Selecciona un tipo</option>
            {#if serviceTypesQuery.data}
                {#each serviceTypesQuery.data as type}
                    <option value={type._id}>{type.name}</option>
                {/each}
            {/if}
        </select>
    </div>

    <div class="space-y-2">
        <Label for="description">Descripción</Label>
        <Textarea
            id="description"
            bind:value={formData.description}
            placeholder="Detalles del servicio..."
            required
            disabled={isSubmitting}
        />
    </div>

    <div class="space-y-2">
        <Label for="detalles">Detalles Adicionales</Label>
        <Textarea
            id="detalles"
            bind:value={formData.detalles}
            placeholder="Información adicional específica del servicio..."
            disabled={isSubmitting}
        />
    </div>

    <div class="space-y-2">
        <Label for="precioBase">Precio Base</Label>
        <Input
            id="precioBase"
            bind:value={formData.precioBase}
            placeholder="Ej: $500.00"
            disabled={isSubmitting}
        />
    </div>

    <div class="space-y-2">
        <Label for="duracionEstimada">Duración Estimada</Label>
        <Input
            id="duracionEstimada"
            bind:value={formData.duracionEstimada}
            placeholder="Ej: 2-3 horas, 1 día, etc."
            disabled={isSubmitting}
        />
    </div>

    <div class="space-y-2">
        <Label for="areaDeCobertura">Área de Cobertura</Label>
        <Input
            id="areaDeCobertura"
            bind:value={formData.areaDeCobertura}
            placeholder="Ej: Ciudad de México, Zona Metropolitana, etc."
            disabled={isSubmitting}
        />
    </div>

    <div class="space-y-2">
        <Label for="requisitos">Requisitos</Label>
        <Textarea
            id="requisitos"
            bind:value={formData.requisitos}
            placeholder="Requisitos previos necesarios para el servicio..."
            disabled={isSubmitting}
        />
    </div>

    <div class="space-y-2">
        <Label>Imagen del servicio</Label>
        <div class="flex items-center gap-4">
            <input
                type="file"
                accept="image/*"
                class="hidden"
                bind:this={fileInput}
                onchange={handleImageUpload}
                disabled={isUploading || isSubmitting}
            />
            
            {#if previewUrl}
                <div class="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        class="w-full h-full object-cover"
                    />
                    <button
                        type="button"
                        class="absolute top-1 right-1 bg-black/50 p-1 rounded-full text-white hover:bg-black/70"
                        onclick={() => {
                            formData.imageUrl = "";
                            previewUrl = "";
                        }}
                    >
                        <X size={14} />
                    </button>
                </div>
            {:else}
                <button
                    type="button"
                    onclick={() => fileInput.click()}
                    disabled={isUploading || isSubmitting}
                    class="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
                >
                    <ImagePlus size={24} class="mb-1" />
                    <span class="text-[10px]">
                        {isUploading ? "Subiendo..." : "Subir imagen"}
                    </span>
                </button>
            {/if}
        </div>
    </div>

    <div class="space-y-2">
        <Label>Fotos de Ejemplos</Label>
        <div class="space-y-3">
            <input
                type="file"
                accept="image/*"
                multiple
                class="hidden"
                bind:this={exampleImagesInput}
                onchange={handleExampleImagesUpload}
                disabled={isUploadingExamples || isSubmitting}
            />
            
            <button
                type="button"
                onclick={() => exampleImagesInput.click()}
                disabled={isUploadingExamples || isSubmitting}
                class="w-full py-3 px-4 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors flex items-center justify-center gap-2"
            >
                <ImagePlus size={20} />
                <span>
                    {isUploadingExamples ? "Subiendo imágenes..." : "Agregar fotos de ejemplos"}
                </span>
            </button>

            {#if examplePreviewUrls.length > 0}
                <div class="grid grid-cols-4 gap-2">
                    {#each examplePreviewUrls as url, index}
                        <div class="relative aspect-square rounded-lg overflow-hidden border border-border">
                            <img
                                src={url}
                                alt="Example {index + 1}"
                                class="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                class="absolute top-1 right-1 bg-black/50 p-1 rounded-full text-white hover:bg-black/70"
                                onclick={() => removeExampleImage(index)}
                            >
                                <X size={12} />
                            </button>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>

    <div class="flex justify-end gap-3 pt-4">
        <Button variant="outline" type="button" onclick={onClose} disabled={isSubmitting || isUploading || isUploadingExamples}>
            Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting || isUploading || isUploadingExamples || !formData.imageUrl}>
            {isSubmitting ? "Guardando..." : "Guardar"}
        </Button>
    </div>
</form>
