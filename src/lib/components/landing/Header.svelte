<script lang="ts">
    import { Menu, X } from "@lucide/svelte";
    import { Button } from "$lib/components/ui/button";

    let mobileMenuOpen = $state(false);

    function toggleMenu() {
        mobileMenuOpen = !mobileMenuOpen;
    }

    function closeMenu() {
        mobileMenuOpen = false;
    }
</script>

<header class="sticky top-0 z-50 bg-background/60 backdrop-blur-sm">
    <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
    >
        <!-- Logo container -->
        <div class="flex items-center gap-2">
            <a href="/" class="flex items-center">
                <img
                    src="/WhatsApp Image 2026-06-18 at 18.35.29.svg"
                    alt="IngenioMat Logo"
                    class="h-8 md:h-9 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
                />
            </a>
        </div>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-6">
            <a href="#inicio" class="text-primary">Inicio</a>
            <a href="#catalogo" class="text-primary">Materiales</a>
            <a href="#construccion" class="text-primary">Construcción</a>
            <a href="#contacto" class="text-primary">Contacto</a>
        </nav>

        <!-- CTA Button -->
        <div class="hidden md:flex items-center">
            <a href="/cataloge" class="no-underline">
                <Button
                    color="primary"
                    class="hover:bg-accent hover:text-accent-foreground"
                >
                    Ir al Catálogo
                </Button>
            </a>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
            <button
                onclick={toggleMenu}
                class="p-2 text-foreground hover:text-primary transition-colors focus:outline-none"
                aria-label="Toggle Menu"
            >
                {#if mobileMenuOpen}
                    <X class="w-6 h-6" />
                {:else}
                    <Menu class="w-6 h-6" />
                {/if}
            </button>
        </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    {#if mobileMenuOpen}
        <div
            class="md:hidden border-t border-border bg-background px-4 pt-4 pb-6 space-y-3 animate-fade-in"
        >
            <a
                href="#inicio"
                onclick={closeMenu}
                class="block px-3 py-2.5 rounded-md text-base font-semibold hover:bg-accent hover:text-primary transition-colors"
            >
                Inicio
            </a>
            <a
                href="#catalogo"
                onclick={closeMenu}
                class="block px-3 py-2.5 rounded-md text-base font-semibold hover:bg-accent hover:text-primary transition-colors"
            >
                Materiales
            </a>
            <a
                href="#construccion"
                onclick={closeMenu}
                class="block px-3 py-2.5 rounded-md text-base font-semibold hover:bg-accent hover:text-primary transition-colors"
            >
                Construcción
            </a>
            <a
                href="#contacto"
                onclick={closeMenu}
                class="block px-3 py-2.5 rounded-md text-base font-semibold hover:bg-accent hover:text-primary transition-colors"
            >
                Contacto
            </a>
            <div class="pt-4 px-3">
                <a href="/cataloge" class="no-underline block w-full">
                    <Button
                        variant="outline"
                        class="w-full border-border hover:bg-accent hover:text-accent-foreground"
                    >
                        Ir al Catálogo
                    </Button>
                </a>
            </div>
        </div>
    {/if}
</header>
