<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Check, ChevronRight, Hammer, Layers } from "@lucide/svelte";
    import GPattern from "../GPattern.svelte";

    const constructionItems = [
        "Estructuras de Hormigón Armado y Muros",
        "Remodelación Completa de Viviendas y Oficinas",
        "Albañilería Fina y Enchapes de Cerámicas",
        "Dirección Técnica y Cómputos Métricos",
    ];

    const carpentryItems = [
        "Ventanas Corredizas, Batientes y Oscilobatientes",
        "Mamparas de Vidrio Templado y Divisiones de Oficina",
        "Puertas de Aluminio de Alta Resistencia y Seguridad",
        "Cerramientos Termoacústicos y Portones",
    ];
</script>

<section
    id="construccion"
    class="py-20 bg-background relative overflow-hidden mt-20"
>
    <!-- Brand G-pattern watermark -->
    <GPattern
        cols={8}
        rows={3}
        variant="primary"
        opacity="opacity-[0.03]"
        fontSize="text-8xl"
        class="absolute top-4 right-4 w-96 h-64 z-0 pointer-events-none"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span
                class="text-xs font-bold uppercase tracking-widest text-primary"
            >
                Nuestros Servicios
            </span>
            <h2
                class="display-title text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground"
            >
                Construcción Civil y Carpintería de Aluminio
            </h2>
            <div class="w-16 h-1 bg-primary mx-auto rounded"></div>
        </div>

        <!-- 2 Column Services Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Column 1: Construcción -->
            <div
                class="bg-[#f5f0e8] dark:bg-card rounded-3xl overflow-hidden flex flex-col transition-all duration-400 hover:scale-[1.01] group"
            >
                <!-- Image frame -->
                <div class="h-64 relative overflow-hidden rounded-t-3xl">
                    <img
                        src="/dream_house_2.png"
                        alt="Construcción civil y obras"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6"
                    >
                        <div class="flex items-center gap-2 text-white">
                            <Hammer class="w-5 h-5 text-primary shrink-0" />
                            <span class="text-lg font-bold tracking-wide"
                                >Construcción Civil & Reformas</span
                            >
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-8 flex flex-col flex-grow text-left">
                    <p
                        class="text-sm text-muted-foreground mb-6 leading-relaxed"
                    >
                        Desarrollamos proyectos residenciales y comerciales
                        llave en mano. Nos encargamos de todo el proceso:
                        cimentación, levantamiento de estructuras de hormigón,
                        muros, acabados y dirección de obra profesional.
                    </p>

                    <ul class="space-y-3 mb-8 flex-grow">
                        {#each constructionItems as item, idx (idx)}
                            <li
                                class="flex items-start gap-2.5 text-sm text-foreground/80"
                            >
                                <Check
                                    class="w-4 h-4 text-primary mt-0.5 shrink-0"
                                />
                                <span>{item}</span>
                            </li>
                        {/each}
                    </ul>

                    <div class="flex flex-col sm:flex-row gap-4">
                        <a href="/cataloge/servicios" class="no-underline flex-1">
                            <Button
                                class="w-full text-white bg-primary hover:bg-primary/95 rounded-xl"
                            >
                                Catálogo de Servicios <ChevronRight
                                    class="w-4 h-4 ml-1"
                                />
                            </Button>
                        </a>
                        <a href="/cataloge" class="no-underline flex-1">
                            <Button
                                variant="outline"
                                color="primary"
                                class="w-full rounded-xl"
                            >
                                Catálogo General
                            </Button>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Column 2: Carpintería de Aluminio -->
            <div
                class="bg-[#f5f0e8] dark:bg-card rounded-3xl overflow-hidden flex flex-col transition-all duration-400 hover:scale-[1.01] group"
            >
                <!-- Image frame -->
                <div class="h-64 relative overflow-hidden rounded-t-3xl">
                    <img
                        src="/carpinteria_aluminio.png"
                        alt="Carpintería de aluminio premium"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6"
                    >
                        <div class="flex items-center gap-2 text-white">
                            <Layers class="w-5 h-5 text-primary shrink-0" />
                            <span class="text-lg font-bold tracking-wide"
                                >Carpintería de Aluminio a Medida</span
                            >
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-8 flex flex-col flex-grow text-left">
                    <p
                        class="text-sm text-muted-foreground mb-6 leading-relaxed"
                    >
                        Diseñamos y fabricamos sistemas de aluminio de alta
                        precisión para fachadas, ventanas, puertas y
                        cerramientos. Garantizamos hermeticidad y durabilidad
                        utilizando perfiles certificados de alto calibre.
                    </p>

                    <ul class="space-y-3 mb-8 flex-grow">
                        {#each carpentryItems as item, idx (idx)}
                            <li
                                class="flex items-start gap-2.5 text-sm text-foreground/80"
                            >
                                <Check
                                    class="w-4 h-4 text-primary mt-0.5 shrink-0"
                                />
                                <span>{item}</span>
                            </li>
                        {/each}
                    </ul>

                    <div class="flex flex-col sm:flex-row gap-4">
                        <a href="/cataloge/productos" class="no-underline flex-1">
                            <Button
                                class="w-full text-white bg-primary hover:bg-primary/95 rounded-xl"
                            >
                                Ver Perfiles y Diseños <ChevronRight
                                    class="w-4 h-4 ml-1"
                                />
                            </Button>
                        </a>
                        <a href="/cataloge/servicios" class="no-underline flex-1">
                            <Button
                                variant="outline"
                                class="w-full border-border rounded-xl"
                            >
                                Ver Servicios
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
