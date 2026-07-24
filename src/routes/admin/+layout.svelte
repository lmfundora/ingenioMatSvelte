<script lang="ts">
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import { authClient } from "$lib/auth-client";
    import { Menu, X, Users, Folder, Package, LogOut } from "@lucide/svelte";

    // Props en Svelte 5 (recibe data desde +layout.server.ts y las rutas hijas)
    let { data, children } = $props();

    let drawerOpen = $state(false);

    const menuItems = [
        { icon: Package, label: "Productos", href: "/admin" },
        { icon: Users, label: "Secciones", href: "/admin/sections" },
        { icon: Folder, label: "Categorías", href: "/admin/categories" },
    ];

    async function handleLogout() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    goto("/login");
                },
            },
        });
    }
</script>

<div class="min-h-screen bg-background">
    <!-- Header -->
    <header
        class="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-6 z-50"
    >
        <div class="flex items-center gap-4">
            <button
                onclick={() => (drawerOpen = !drawerOpen)}
                class="p-2 hover:bg-accent rounded-lg transition-colors"
                aria-label="Toggle menu"
            >
                {#if drawerOpen}
                    <X size={24} />
                {:else}
                    <Menu size={24} />
                {/if}
            </button>
            <h1 class="text-xl font-bold tracking-widest font-italianno">
                Don Quijote
            </h1>
        </div>

        <div class="flex items-center gap-4">
            <span class="text-sm text-muted-foreground tracking-wide">
                {data.session.user?.email}
            </span>
            <button
                onclick={handleLogout}
                class="p-2 hover:bg-accent rounded-lg transition-colors"
                title="Cerrar sesión"
            >
                <LogOut size={20} />
            </button>
        </div>
    </header>

    <!-- Backdrop overlay para móvil -->
    {#if drawerOpen}
        <div
            role="button"
            tabindex="0"
            class="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onclick={() => (drawerOpen = false)}
            onkeydown={(e) => e.key === "Escape" && (drawerOpen = false)}
        ></div>
    {/if}

    <!-- Drawer -->
    <aside
        class={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-background border-r border-border transition-transform duration-300 ease-in-out z-40 ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
        <nav class="p-4 space-y-2">
            {#each menuItems as item}
                {@const Icon = item.icon}
                {@const isActive = page.url.pathname === item.href}
                <a
                    href={item.href}
                    onclick={() => (drawerOpen = false)}
                    class={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-foreground tracking-wide ${
                        isActive ? "bg-accent font-semibold" : ""
                    }`}
                >
                    <Icon size={20} />
                    <span class="font-sans">{item.label}</span>
                </a>
            {/each}
        </nav>
    </aside>

    <!-- Main Content (Subrutas) -->
    <main
        class={`pt-16 transition-all duration-300 ${
            drawerOpen ? "lg:ml-64" : ""
        }`}
    >
        {@render children()}
    </main>
</div>
