<script lang="ts">
    import "./layout.css";
    import favicon from "$lib/assets/favicon.ico";
    import { PUBLIC_CONVEX_URL } from "$env/static/public";
    import { setupConvex } from "convex-svelte";

    import { createSvelteAuthClient } from "@mmailaender/convex-better-auth-svelte/svelte";
    import { authClient } from "$lib/auth-client";
    import { Toaster } from "$lib/components/ui/sonner";
    import TopBanner from "$lib/components/TopBanner.svelte";
    import { page } from "$app/stores";

    createSvelteAuthClient({ authClient });
    setupConvex(PUBLIC_CONVEX_URL);

    let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<!-- El TopBanner solo se mostrará en las páginas públicas, no en la administración -->
{#if !$page.url.pathname.startsWith("/admin") && !$page.url.pathname.startsWith("/login")}
    <TopBanner />
{/if}

{@render children()}
<!-- Toaster global -->
<Toaster position="top-right" richColors />
