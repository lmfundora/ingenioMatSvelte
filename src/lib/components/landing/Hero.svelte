<script lang="ts">
    import Typewriter from "./Typewriter.svelte";
    import { Button } from "$lib/components/ui/button";
    import GPattern from "../GPattern.svelte";
</script>

<section id="inicio" class="relative pb-32 pt-0 sm:pt-10 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <!-- GPattern watermark -->
        <GPattern
            cols={6}
            rows={4}
            variant="primary"
            opacity="opacity-[0.05]"
            fontSize="text-7xl"
            class="absolute top-0 right-0 w-[50%] h-[50%] z-0 [mask-image:linear-gradient(to_bottom_left,transparent_20%,black_80%)]"
        />

        <div
            class="flex flex-col gap-6 lg:gap-8 w-11/12 md:w-3/4 mx-auto relative z-10 pt-4 pb-8"
        >
            <!-- Header - Texto grande arriba -->
            <h1
                class="display-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1] md:leading-[1.05]"
            >
                Experiencia para{" "}
                <br class="md:hidden" />
                <span class="text-primary bg-clip-text">
                    <Typewriter words={["Construir", "Restaurar", "Mejorar"]} />
                </span>
                <br />
                lo que necesitas
            </h1>

            <!-- Images Grid - Fotos en el medio -->
            <div
                class="w-full max-w-4xl relative flex justify-center items-center"
            >
                <div
                    class="w-full grid grid-cols-12 gap-2 md:gap-3 auto-rows-[220px] md:auto-rows-[150px] items-stretch animate-fade-in relative z-10"
                >
                    <!-- Card 1 - Energía Solar y Baterías -->
                    <div
                        class="col-span-6 md:col-span-6 row-span-2 overflow-hidden rounded-2xl border border-border relative group transition-all duration-500 hover:shadow-2xl hover:border-primary/50 bg-muted"
                    >
                        <img
                            src="/solar_battery.png"
                            alt="Instalación de Paneles Solares y Baterías"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            <span
                                class="text-[8px] font-bold tracking-wider text-white uppercase bg-emerald-600/90 backdrop-blur-xs px-2 py-0.5 rounded-full w-fit mb-0.5 flex items-center gap-1"
                            >
                                Sistemas Solares
                            </span>
                            <p
                                class="text-white text-[10px] font-extrabold leading-tight tracking-wide"
                            >
                                Autonomía Energética
                            </p>
                        </div>
                    </div>

                    <!-- Card 2 - Carpintería de Aluminio -->
                    <div
                        class="col-span-6 md:col-span-6 row-span-1 overflow-hidden rounded-2xl border border-border relative group transition-all duration-500 hover:shadow-2xl hover:border-primary/50 bg-muted"
                    >
                        <img
                            src="/carpinteria_aluminio.png"
                            alt="Carpintería de aluminio de alta gama"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            <span
                                class="text-[8px] font-bold tracking-wider text-white uppercase bg-sky-600/90 backdrop-blur-xs px-2 py-0.5 rounded-full w-fit mb-0.5 flex items-center gap-1"
                            >
                                Aluminio y Vidrio
                            </span>
                            <p
                                class="text-white text-[10px] font-extrabold leading-tight tracking-wide"
                            >
                                Acabados a Medida
                            </p>
                        </div>
                    </div>

                    <!-- Card 3 - Construcción Llave en Mano -->
                    <div
                        class="col-span-6 md:col-span-6 row-span-1 overflow-hidden rounded-2xl border border-border relative group transition-all duration-500 hover:shadow-2xl hover:border-primary/50 bg-muted"
                    >
                        <img
                            src="/dream_house_3.png"
                            alt="Construcción civil y remodelación"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            <span
                                class="text-[8px] font-bold tracking-wider text-white uppercase bg-amber-600/95 backdrop-blur-xs px-2 py-0.5 rounded-full w-fit mb-0.5 flex items-center gap-1"
                            >
                                Edificación
                            </span>
                            <p
                                class="text-white text-[10px] font-extrabold leading-tight tracking-wide"
                            >
                                Proyectos Llave en Mano
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Texto pequeño abajo -->
            <div class="w-full text-end flex flex-col items-end gap-4">
                <p
                    class="text-sm sm:text-base max-w-2xl text-muted-foreground text-balance"
                >
                    Líderes en construcción civil. Llevamos tu proyecto de
                    principio a fin con calidad y autonomía.
                </p>
                <a href="/cataloge">
                    <Button
                        size="lg"
                        color="primary"
                        class="text-primary-foreground"
                    >
                        Explorar
                    </Button>
                </a>
            </div>
        </div>

        <!-- Stats Bar -->
        <div class="flex justify-around gap-4 text-center mt-30">
            <div class="space-y-1">
                <div
                    class="text-4xl md:text-5xl text-foreground tracking-tight"
                >
                    500k+
                </div>
                <div
                    class="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider"
                >
                    Toneladas Producidas
                </div>
            </div>
            <div class="space-y-1">
                <div
                    class="text-4xl md:text-5xl text-foreground tracking-tight"
                >
                    1,200+
                </div>
                <div
                    class="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider"
                >
                    Obras Abastecidas
                </div>
            </div>
            <div class="space-y-1">
                <div
                    class="text-4xl md:text-5xl text-foreground tracking-tight"
                >
                    98%
                </div>
                <div
                    class="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider"
                >
                    Clientes Satisfechos
                </div>
            </div>
        </div>
    </div>
</section>
