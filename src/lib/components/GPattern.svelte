<script lang="ts">
    type GPatternVariant = "primary" | "cream" | "white" | "dark";

    interface GPatternProps {
        cols?: number;
        rows?: number;
        class?: string;
        variant?: GPatternVariant;
        opacity?: string;
        fontSize?: string;
    }

    // Mapeo de variantes fuera de props
    const variantClass: Record<GPatternVariant, string> = {
        primary: "text-primary",
        cream: "text-[#f4d5b6]",
        white: "text-white",
        dark: "text-foreground",
    };

    // Desestructuración con valores por defecto en Svelte 5
    let {
        cols = 8,
        rows = 5,
        class: className = "",
        variant = "primary",
        opacity = "opacity-[0.07]",
        fontSize = "text-6xl",
    }: GPatternProps = $props();

    // $derived nos permite recalcular el total dinámicamente si cambian cols o rows
    let total = $derived(cols * rows);
</script>

<div
    aria-hidden="true"
    class="pointer-events-none select-none overflow-hidden {className}"
>
    <div
        class="grid w-full h-full"
        style:grid-template-columns="repeat({cols}, 1fr)"
    >
        {#each Array(total) as _, i (i)}
            <span
                class="font-kanit font-bold leading-none text-center {fontSize} {variantClass[
                    variant
                ]} {opacity}"
            >
                g
            </span>
        {/each}
    </div>
</div>
