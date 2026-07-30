<script lang="ts">
    import { superForm, defaults } from "sveltekit-superforms";
    import { valibot } from "sveltekit-superforms/adapters";
    import * as v from "valibot";
    import { Upload, X, Plus } from "@lucide/svelte";

    import { toast } from "$lib/toast";
    import { productSchema, type ProductSchema } from "$lib/schemas/product";
    import { optimizeImage } from "$lib/image-utils";

    // Componentes UI de shadcn-svelte
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Label } from "$lib/components/ui/label";
    import { Badge } from "$lib/components/ui/badge";
    import * as Select from "$lib/components/ui/select";

    interface Category {
        _id: string;
        name: string;
    }

    interface Props {
        product?: Partial<v.InferInput<ProductSchema>>;
        categories: Category[];
        onSave: (data: v.InferOutput<ProductSchema>) => Promise<void>;
        onCancel: () => void;
        generateUploadUrl: (params: Record<string, never>) => Promise<string>;
    }

    let {
        product,
        categories = [],
        onSave,
        onCancel,
        generateUploadUrl,
    }: Props = $props();

    // Valores por defecto neutros
    const initialValues = {
        name: "",
        slug: "",
        categoryId: "",
        imageUrl: "",
    };

    // Configuración de Superforms
    const form = superForm(defaults(initialValues, valibot(productSchema)), {
        SPA: true,
        validators: valibot(productSchema),
        async onUpdate({ form: f }) {
            if (!f.valid) return;

            isSubmitting = true;
            try {
                let finalImageUrl = f.data.imageUrl;

                // Carga de imagen si existe un archivo local
                if (imageFile) {
                    isUploading = true;
                    try {
                        const optimizedImage = await optimizeImage(imageFile, {
                            maxWidth: 1200,
                            quality: 0.8,
                            format: "webp",
                        });

                        const uploadUrl = await generateUploadUrl({});
                        const response = await fetch(uploadUrl, {
                            method: "POST",
                            headers: {
                                "Content-Type": optimizedImage.type,
                            },
                            body: optimizedImage,
                        });

                        if (!response.ok)
                            throw new Error("Error al subir la imagen");

                        const { storageId } = await response.json();
                        finalImageUrl = storageId;
                        toast.success("Imagen subida correctamente");
                    } catch (err) {
                        toast.error("Error al procesar la imagen");
                        console.error(err);
                        return;
                    } finally {
                        isUploading = false;
                    }
                }

                // Slug automático
                const finalSlug =
                    f.data.slug?.trim() ||
                    f.data.name
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "");

                await onSave({
                    ...f.data,
                    imageUrl: finalImageUrl,
                    slug: finalSlug,
                });
            } finally {
                isSubmitting = false;
            }
        },
    });

    const { form: formData, errors, enhance, reset } = form;

    // Estados UI de soporte mediante Runas ($state)
    let imageFile = $state<File | null>(null);
    let imagePreview = $state<string | null>(null);
    let isUploading = $state(false);
    let isSubmitting = $state(false);

    // Sincronización limpia cuando cambie la prop 'product'
    $effect(() => {
        reset({
            data: {
                name: product?.name ?? "",
                slug: product?.slug ?? "",
                categoryId: product?.categoryId ?? "",
                imageUrl: product?.imageUrl ?? "",
            },
        });
        imagePreview = product?.imageUrl ?? null;
        imageFile = null;
    });

    // Labels seleccionados para los Selects de shadcn
    let selectedCategoryLabel = $derived(
        categories.find((c) => c._id === $formData.categoryId)?.name ??
            "Seleccionar categoría",
    );

    // Handlers de Imagen
    function handleImageChange(e: Event) {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            imageFile = file;
            const reader = new FileReader();
            reader.onloadend = () => {
                imagePreview = reader.result as string;
            };
            reader.readAsDataURL(file);
            $formData.imageUrl = "pending";
        }
    }

    function handleRemoveImage() {
        imageFile = null;
        imagePreview = null;
        $formData.imageUrl = "";
    }
</script>

<form method="POST" use:enhance class="space-y-4">
    <!-- Nombre -->
    <div class="space-y-2">
        <Label for="name">Nombre</Label>
        <Input
            id="name"
            type="text"
            bind:value={$formData.name}
            placeholder="Ej. Mortero Grueso"
        />
        {#if $errors.name}
            <p class="text-sm text-destructive">{$errors.name}</p>
        {/if}
    </div>

    <!-- Slug -->
    <div class="space-y-2">
        <Label for="slug">Slug (URL amigable)</Label>
        <Input
            id="slug"
            type="text"
            bind:value={$formData.slug}
            placeholder="se-deja-vacio-para-autogenerar"
        />
        <p class="text-xs text-muted-foreground">
            Si se deja vacío, se generará automáticamente desde el nombre
        </p>
    </div>

    <!-- Categoría (shadcn Select) -->
    <div class="space-y-2">
        <Label>Categoría</Label>
        <Select.Root
            type="single"
            value={$formData.categoryId}
            onValueChange={(v) => ($formData.categoryId = v)}
        >
            <Select.Trigger class="w-full">
                {selectedCategoryLabel}
            </Select.Trigger>
            <Select.Content>
                {#each categories as category (category._id)}
                    <Select.Item value={category._id} label={category.name}>
                        {category.name}
                    </Select.Item>
                {/each}
            </Select.Content>
        </Select.Root>
        {#if $errors.categoryId}
            <p class="text-sm text-destructive">{$errors.categoryId}</p>
        {/if}
    </div>

    <!-- Carga de Imagen -->
    <div class="space-y-2">
        <Label>Imagen</Label>

        {#if imagePreview}
            <div
                class="relative aspect-video rounded-lg overflow-hidden bg-muted border border-border"
            >
                <img
                    src={imagePreview}
                    alt="Preview"
                    class="w-full h-full object-cover"
                />
                <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onclick={handleRemoveImage}
                    class="absolute top-2 right-2 backdrop-blur-sm bg-background/80 hover:bg-background"
                >
                    <X size={16} />
                </Button>
            </div>
        {:else}
            <div
                class="border-2 border-dashed border-border rounded-lg p-6 transition-colors hover:border-muted-foreground/50"
            >
                <label
                    for="image-upload"
                    class="flex flex-col items-center justify-center cursor-pointer"
                >
                    <Upload size={32} class="text-muted-foreground mb-2" />
                    <span class="text-sm text-muted-foreground font-medium"
                        >Click para subir imagen</span
                    >
                    <span class="text-xs text-muted-foreground/70 mt-1"
                        >PNG, JPG, WebP (máx. 5MB)</span
                    >
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onchange={handleImageChange}
                    class="hidden"
                />
            </div>
        {/if}

        {#if $errors.imageUrl}
            <p class="text-sm text-destructive">{$errors.imageUrl}</p>
        {/if}
    </div>

    <!-- Botones de Acción -->
    <div class="flex gap-3 pt-4">
        <Button
            type="button"
            variant="outline"
            onclick={onCancel}
            disabled={isUploading || isSubmitting}
            class="flex-1"
        >
            Cancelar
        </Button>

        <Button
            type="submit"
            disabled={isSubmitting || isUploading}
            class="flex-1"
        >
            {#if isUploading}
                Subiendo imagen...
            {:else if isSubmitting}
                Guardando...
            {:else if product}
                Actualizar
            {:else}
                Crear
            {/if}
        </Button>
    </div>
</form>
