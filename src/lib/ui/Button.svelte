<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import { cva, type VariantProps } from "class-variance-authority";
    import { cn } from "$lib/utils";

    // Definición de variantes con CVA
    const buttonVariants = cva(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
        {
            variants: {
                variant: {
                    default:
                        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
                    destructive:
                        "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
                    outline:
                        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                    secondary:
                        "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                    ghost: "hover:bg-accent hover:text-accent-foreground",
                    link: "text-primary underline-offset-4 hover:underline",
                },
                size: {
                    default: "h-10 px-4 py-2",
                    sm: "h-9 rounded-md px-3 text-xs",
                    lg: "h-11 rounded-md px-8 text-base",
                    icon: "h-10 w-10",
                },
            },
            defaultVariants: {
                variant: "default",
                size: "default",
            },
        },
    );

    type Variant = VariantProps<typeof buttonVariants>["variant"];
    type Size = VariantProps<typeof buttonVariants>["size"];

    // Props con la sintaxis de Svelte 5
    interface Props extends HTMLButtonAttributes {
        variant?: Variant;
        size?: Size;
        isLoading?: boolean;
        children?: Snippet;
        class?: string;
    }

    let {
        variant = "default",
        size = "default",
        isLoading = false,
        disabled = false,
        type = "button",
        children,
        class: className = "",
        ...restProps
    }: Props = $props();
</script>

<button
    {type}
    disabled={disabled || isLoading}
    class={cn(buttonVariants({ variant, size }), className)}
    {...restProps}
>
    {#if isLoading}
        <svg
            class="mr-2 h-4 w-4 animate-spin text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            />
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    {/if}

    {#if children}
        {@render children()}
    {/if}
</button>
