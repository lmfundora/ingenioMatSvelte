<script lang="ts">
    import { cn } from "$lib/utils"; // O tu helper de clsx / tailwind-merge

    interface SeparatorProps {
        orientation?: "horizontal" | "vertical";
        decorative?: boolean;
        class?: string;
    }

    let {
        orientation = "horizontal",
        decorative = true,
        class: className = "",
    }: SeparatorProps = $props();
</script>

<div
    role={decorative ? "none" : "separator"}
    aria-orientation={decorative ? undefined : orientation}
    class={cn(
        "shrink-0 bg-border transition-colors",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
    )}
></div>
