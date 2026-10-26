<script lang="ts">
    import { page } from "$app/stores";
    import { ChevronRight, Wrench } from "@lucide/svelte";

    import Footer from "$lib/components/landing/Footer.svelte";
    import BackButton from "$lib/components/BackButton.svelte";

    let { children } = $props();
</script>

<div class="min-h-screen bg-background">
    <!-- Navbar con Breadcrumbs -->
    <nav class="bg-white dark:bg-card border-b border-border sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Breadcrumbs simplificados con BackButton -->
                <div class="flex items-center space-x-2 text-sm">
                    {#if $page.params.id}
                        <BackButton href="/cataloge/servicios" />
                        <ChevronRight size={14} class="text-muted-foreground" />
                        <a
                            href="/cataloge/servicios"
                            class="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Servicios
                        </a>
                        <ChevronRight size={14} class="text-muted-foreground" />
                        <span class="text-foreground font-medium">Detalle</span>
                    {:else}
                        <BackButton href="/cataloge" />
                        <ChevronRight size={14} class="text-muted-foreground" />
                        <a
                            href="/cataloge"
                            class="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Catálogo
                        </a>
                        <ChevronRight size={14} class="text-muted-foreground" />
                        <span class="text-foreground font-medium">Servicios</span>
                    {/if}
                </div>

                <!-- Título -->
                <div class="flex items-center gap-2">
                    <Wrench class="w-5 h-5 text-primary" />
                    <h1 class="text-base font-semibold text-foreground">
                        {#if $page.params.id}
                            Detalles
                        {:else}
                            Servicios
                        {/if}
                    </h1>
                </div>
            </div>
        </div>
    </nav>

    <!-- Contenido Principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {@render children()}
    </main>
    <Footer />
</div>
