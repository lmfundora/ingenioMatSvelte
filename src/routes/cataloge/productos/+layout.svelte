<script lang="ts">
    import { page } from "$app/stores";
    import { ChevronRight, Home, Package } from "@lucide/svelte";

    import Footer from "$lib/components/landing/Footer.svelte";

    let { children } = $props();
</script>

<div class="min-h-screen bg-background">
    <!-- Navbar con Breadcrumbs -->
    <nav class="bg-white dark:bg-card border-b border-border sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Breadcrumbs -->
                <div class="flex items-center space-x-2 text-sm">
                    <a
                        href="/"
                        class="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Home size={16} />
                    </a>
                    <ChevronRight size={14} class="text-muted-foreground" />
                    <a
                        href="/cataloge"
                        class="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Catálogo
                    </a>
                    <ChevronRight size={14} class="text-muted-foreground" />
                    <a
                        href="/cataloge/productos"
                        class="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Productos
                    </a>
                    {#if $page.params.slug}
                        <ChevronRight size={14} class="text-muted-foreground" />
                        <span class="text-foreground font-medium">Detalle</span>
                    {/if}
                </div>

                <!-- Título -->
                <div class="flex items-center gap-2">
                    <Package class="w-5 h-5 text-primary" />
                    <h1 class="text-lg font-semibold text-foreground">
                        {#if $page.params.slug}
                            Detalles
                        {:else}
                            Catálogo
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
