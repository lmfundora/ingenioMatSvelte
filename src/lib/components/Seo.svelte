<script lang="ts">
    interface SEOProps {
        title?: string;
        description?: string;
        image?: string;
        url?: string;
        siteName?: string;
    }

    let {
        title = "Catálogo & Servicios | Tu Marca",
        description = "Descubre nuestra selección de productos y servicios con la mejor calidad.",
        image = "https://www.donquijoterest.com/og-image.webp",
        url = "https://www.donquijoterest.com",
        siteName = "Don Quijote",
    }: SEOProps = $props();
</script>

<svelte:head>
    <!-- Metadatos Estándar y Crawlers -->
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={url} />

    <!-- Open Graph / Facebook / WhatsApp / Telegram / LinkedIn -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={siteName} />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:image:secure_url" content={image} />
    <meta property="og:image:type" content="image/webp" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content={`Vista previa de ${title}`} />

    <!-- Twitter Cards / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
</svelte:head>
