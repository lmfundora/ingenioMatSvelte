<!-- src/routes/+page.svelte (o tu archivo de ruta equivalente) -->
<script lang="ts">
    import Header from "$lib/components/landing/Header.svelte";
    import Hero from "$lib/components/landing/Hero.svelte";
    import CategoriesChips from "$lib/components/landing/CategoriesChips.svelte";
    import WhyUss from "$lib/components/landing/WhyUs.svelte";
    import Cataloge from "$lib/components/landing/Cataloge.svelte";
    import ConstructionCarpentry from "$lib/components/landing/ConstructionCarpentry.svelte";
    import SolarEnergy from "$lib/components/landing/SolarEnergy.svelte";
    import CoreValues from "$lib/components/landing/CoreValues.svelte";
    import Cta from "$lib/components/landing/Cta.svelte";
    import Advisors from "$lib/components/landing/Advisors.svelte";
    import Footer from "$lib/components/landing/Footer.svelte";
    import SEOMetaTags from "$lib/components/SEOMetaTags.svelte";
    import StructuredData from "$lib/components/StructuredData.svelte";
</script>

<svelte:head>
    <SEOMetaTags
        title="IngenioMat - Materiales de Construcción y Servicios de Calidad"
        description="Líderes en construcción civil. Materiales de construcción certificados, sistemas de energía solar, baterías de litio y carpintería de aluminio de alta gama. Más de 500k toneladas producidas y 1,200+ obras abastecidas."
        image="/dream_house_3.webp"
        keywords="construcción civil, materiales de construcción, energía solar, paneles solares, baterías litio, carpintería aluminio, ventanas aluminio, suministro construcción, proyectos llave en mano"
    />
    <StructuredData
        schema={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'IngenioMat',
            url: 'https://tu-dominio.com',
            description:
                'Líderes en construcción civil, materiales de construcción, sistemas de energía solar y carpintería de aluminio.',
            potentialAction: {
                '@type': 'SearchAction',
                target: 'https://tu-dominio.com/cataloge?search={search_term_string}',
                'query-input': 'required name=search_term_string'
            }
        }}
    />
</svelte:head>

<div
    class="min-h-screen bg-background text-foreground selection:bg-primary/20 flex flex-col font-sans"
>
    <Header />
    <Hero />
    <div class="h-24"></div>
    <CategoriesChips />
    <WhyUss />
    <Cataloge />
    <ConstructionCarpentry />
    <SolarEnergy />
    <CoreValues />
    <Cta />
    <!-- <Advisors /> -->
    <Footer />
</div>
