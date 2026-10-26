<script lang="ts">
    import { page } from '$app/stores';

    interface Props {
        title?: string;
        description?: string;
        image?: string;
        type?: 'website' | 'article' | 'product';
        keywords?: string;
        canonical?: string;
        noindex?: boolean;
        nofollow?: boolean;
    }

    let {
        title = 'IngenioMat - Materiales de Construcción y Servicios',
        description = 'Líderes en construcción civil, materiales de construcción, sistemas de energía solar y carpintería de aluminio. Calidad y autonomía para tus proyectos.',
        image = '/dream_house_3.webp',
        type = 'website',
        keywords = 'construcción, materiales de construcción, energía solar, carpintería aluminio, paneles solares, baterías litio, renovación',
        canonical,
        noindex = false,
        nofollow = false
    }: Props = $props();

    const SITE_URL = 'https://tu-dominio.com'; // Reemplazar con tu dominio real
    const url = $derived(canonical || `${SITE_URL}${$page.url.pathname}`);
    const fullImage = $derived(image.startsWith('http') ? image : `${SITE_URL}${image}`);
</script>

<svelte:head>
    <!-- Canonical URL -->
    <link rel="canonical" href={url} />

    <!-- Meta Robots -->
    {#if noindex || nofollow}
        <meta
            name="robots"
            content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`}
        />
    {/if}

    <!-- Keywords -->
    <meta name="keywords" content={keywords} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content={type} />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={fullImage} />
    <meta property="og:site_name" content="IngenioMat" />
    <meta property="og:locale" content="es_ES" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={url} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={fullImage} />
</svelte:head>
