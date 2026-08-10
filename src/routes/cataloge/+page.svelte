<script lang="ts">
    import { ChevronRight, Package, Wrench } from "@lucide/svelte";

    import Footer from "$lib/components/landing/Footer.svelte";
</script>

<svelte:head>
    <title>Catálogo | Productos y Servicios Especializados</title>
    <meta
        name="description"
        content="Explora nuestro catálogo completo de materiales de construcción, equipos de energía solar y servicios de carpintería de aluminio e instalación."
    />
</svelte:head>

<section
    id="catalogo-selector"
    class="py-20 bg-[#f5f0e8] dark:bg-background rounded-b-4xl mx-2 md:mx-4"
>
    <div class="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <!-- Encabezado SEO -->
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span
                class="text-xs font-bold uppercase tracking-widest text-primary"
            >
                ¿Qué estás buscando?
            </span>
            <h1
                class="display-title text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground font-bold"
            >
                Catálogo de Productos y Servicios
            </h1>
            <p class="text-muted-foreground text-sm sm:text-base">
                Selecciona una categoría para explorar nuestra oferta en
                suministro directo o servicios técnicos para proyectos.
            </p>
            <div class="w-16 h-1 bg-primary mx-auto rounded"></div>
        </div>

        <!-- Tarjetas con URLs indexables -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <!-- Opción 1: Productos -->
            <a
                href="/cataloge/productos"
                class="group relative bg-white dark:bg-card p-8 rounded-3xl text-left border border-black/5 hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
                <div>
                    <div
                        class="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                    >
                        <Package class="w-7 h-7" />
                    </div>
                    <span
                        class="text-xs font-semibold tracking-wider text-primary uppercase"
                    >
                        Suministro Directo
                    </span>
                    <h2 class="text-2xl font-bold text-foreground mt-1 mb-3">
                        Catálogo de Productos
                    </h2>
                    <p
                        class="text-sm text-muted-foreground leading-relaxed mb-6"
                    >
                        Materiales de construcción certificados, panelería
                        solar, baterías de litio y perfilería de aluminio para
                        tus obras.
                    </p>
                </div>
                <div
                    class="flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform"
                >
                    Ver Productos <ChevronRight class="w-4 h-4 ml-1" />
                </div>
            </a>

            <!-- Opción 2: Servicios -->
            <a
                href="/cataloge/servicios"
                class="group relative bg-white dark:bg-card p-8 rounded-3xl text-left border border-black/5 hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
                <div>
                    <div
                        class="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                    >
                        <Wrench class="w-7 h-7" />
                    </div>
                    <span
                        class="text-xs font-semibold tracking-wider text-primary uppercase"
                    >
                        Mano de Obra & Asesoría
                    </span>
                    <h2 class="text-2xl font-bold text-foreground mt-1 mb-3">
                        Catálogo de Servicios
                    </h2>
                    <p
                        class="text-sm text-muted-foreground leading-relaxed mb-6"
                    >
                        Instalaciones solares llave en mano, fabricación e
                        instalación de ventanas y cerramientos de aluminio a
                        medida.
                    </p>
                </div>
                <div
                    class="flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform"
                >
                    Ver Servicios <ChevronRight class="w-4 h-4 ml-1" />
                </div>
            </a>
        </div>
    </div>
</section>
<Footer />
