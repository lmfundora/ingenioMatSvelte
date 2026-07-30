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
</script>

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
    <Advisors />
    <Footer />
</div>
