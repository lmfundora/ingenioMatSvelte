<script lang="ts">
    import "./layout.css";
    import favicon from "$lib/assets/favicon.ico";
    import { PUBLIC_CONVEX_URL } from "$env/static/public";
    import { setupConvex } from "convex-svelte";

    import { createSvelteAuthClient } from "@mmailaender/convex-better-auth-svelte/svelte";
    import { authClient } from "$lib/auth-client";
    import { Toaster } from "$lib/components/ui/sonner";
    import TopBanner from "$lib/components/TopBanner.svelte";
    import SEOMetaTags from "$lib/components/SEOMetaTags.svelte";
    import StructuredData from "$lib/components/StructuredData.svelte";
    import { page } from "$app/stores";

    createSvelteAuthClient({ authClient });
    setupConvex(PUBLIC_CONVEX_URL);

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <link rel="icon" type="image/png" sizes="32x32" href={favicon} />
    <link rel="icon" type="image/png" sizes="16x16" href={favicon} />
    <link rel="apple-touch-icon" sizes="180x180" href={favicon} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</svelte:head>

<!-- Meta tags SEO base -->
{#if !$page.url.pathname.startsWith("/admin") && !$page.url.pathname.startsWith("/login")}
    <SEOMetaTags />
    <!-- Schema.org Organization -->
    <StructuredData
        schema={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'IngenioMat',
            url: 'https://tu-dominio.com',
            logo: 'https://tu-dominio.com/favicon.ico',
            description:
                'Líderes en construcción civil, materiales de construcción, sistemas de energía solar y carpintería de aluminio.',
            address: {
                '@type': 'PostalAddress',
                addressCountry: 'ES',
                addressLocality: 'Tu Ciudad',
                addressRegion: 'Tu Región'
            },
            contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+34-XXX-XXX-XXX',
                contactType: 'customer service',
                availableLanguage: 'Spanish'
            },
            sameAs: [
                'https://www.facebook.com/tu-empresa',
                'https://www.instagram.com/tu-empresa',
                'https://www.linkedin.com/company/tu-empresa'
            ]
        }}
    />
{/if}

<!-- El TopBanner solo se mostrará en las páginas públicas, no en la administración -->
{#if !$page.url.pathname.startsWith("/admin") && !$page.url.pathname.startsWith("/login")}
    <TopBanner />
{/if}

{@render children()}
<!-- Toaster global -->
<Toaster position="top-right" richColors />
