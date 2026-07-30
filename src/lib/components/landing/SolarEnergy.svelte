<script lang="ts">
    import {
        Battery,
        Check,
        ChevronRight,
        Eye,
        Settings,
        Sun,
    } from "@lucide/svelte";
    import { Button } from "$lib/components/ui/button";
    import GPattern from "../GPattern.svelte";

    const benefits = [
        "Paneles solares monocristalinos de alta eficiencia.",
        "Baterías de Litio LiFePO4 de última generación.",
        "Inversores inteligentes híbridos certificados.",
        "Instalación profesional y soporte permanente.",
    ];
</script>

<section
    id="solar"
    class="py-20 bg-[#f5f0e8] dark:bg-background relative overflow-hidden mx-2 md:mx-4 rounded-4xl mt-40"
>
    <!-- Background design elements -->
    <div
        class="absolute left-[-10%] top-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
    ></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="max-w-3xl mb-16 space-y-4">
            <span class="text-xs uppercase tracking-widest text-primary">
                Energía Renovable
            </span>
            <h2
                class="display-title text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground"
            >
                Energía Solar y Autonomía de Baterías
            </h2>
            <div class="w-16 h-1 bg-primary rounded"></div>
        </div>

        <!-- 2-Column layout: Info / IA Image & System Elements Guide -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <!-- Left Column: Image and List -->
            <div class="lg:col-span-6 space-y-8 text-left">
                <div
                    class="relative overflow-hidden rounded-3xl border border-border bg-muted group"
                >
                    <img
                        src="/solar_battery.png"
                        alt="Instalación Solar con Respaldo de Baterías"
                        class="w-full h-48 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6 text-white"
                    >
                        <span
                            class="text-xs tracking-wider uppercase text-white bg-primary/95 backdrop-blur-xs px-2.5 py-1 rounded-full w-fit mb-2"
                        >
                            100% Autónomo
                        </span>
                        <h4 class="text-xl">Respaldo ante Fallas Eléctricas</h4>
                        <p class="text-xs text-gray-300">
                            Monitoreo digital en tiempo real e inversión
                            inteligente.
                        </p>
                    </div>
                </div>

                <div class="space-y-4">
                    <h3 class="text-2xl text-foreground">
                        ¿Por qué elegir nuestro sistema híbrido?
                    </h3>
                    <p class="text-sm text-muted-foreground">
                        A diferencia de los paneles solares tradicionales que se
                        apagan cuando cae la red eléctrica pública, nuestros
                        sistemas híbridos con baterías acumulan energía durante
                        el día y te respaldan automáticamente ante cualquier
                        corte.
                    </p>

                    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {#each benefits as item}
                            <li
                                class="flex items-start gap-2 text-sm text-foreground/80"
                            >
                                <Check
                                    class="w-4 h-4 text-primary mt-0.5 shrink-0"
                                />
                                <span>{item}</span>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>

            <!-- Right Column: Informative System Setup Guide -->
            <div class="lg:col-span-6">
                <div
                    class="bg-[#f5f0e8] dark:bg-card p-6 sm:p-8 rounded-3xl border border-border text-left relative overflow-hidden"
                >
                    <GPattern
                        cols={4}
                        rows={2}
                        variant="primary"
                        opacity="opacity-[0.03]"
                        fontSize="text-6xl"
                        class="absolute top-2 right-2 w-48 h-32 z-0 pointer-events-none"
                    />

                    <div class="relative z-10 space-y-6">
                        <div class="space-y-2">
                            <div
                                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs uppercase tracking-wider text-primary"
                            >
                                Guía de Funcionamiento
                            </div>
                            <h3 class="text-2xl text-foreground">
                                Estructura del Sistema Híbrido
                            </h3>
                            <p class="text-xs text-muted-foreground">
                                Conoce cómo interactúan los componentes clave
                                del sistema para garantizar energía continua y
                                reducir tu facturación.
                            </p>
                        </div>

                        <!-- Info Cards Grid -->
                        <div class="space-y-4">
                            <!-- Step 1 -->
                            <div
                                class="p-4 bg-background/40 dark:bg-background/25 border border-border/40 rounded-2xl flex gap-4"
                            >
                                <div
                                    class="p-3 rounded-xl bg-orange-500/10 text-orange-500 shrink-0 h-fit"
                                >
                                    <Sun class="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 class="text-sm text-foreground">
                                        1. Captación Solar en Techo
                                    </h4>
                                    <p
                                        class="text-xs text-muted-foreground mt-1 leading-relaxed"
                                    >
                                        Los paneles monocristalinos absorben la
                                        radiación solar directa y difusa durante
                                        el día, convirtiéndola de inmediato en
                                        corriente continua de alta tensión.
                                    </p>
                                </div>
                            </div>

                            <!-- Step 2 -->
                            <div
                                class="p-4 bg-background/40 dark:bg-background/25 border border-border/40 rounded-2xl flex gap-4"
                            >
                                <div
                                    class="p-3 rounded-xl bg-primary/10 text-primary shrink-0 h-fit"
                                >
                                    <Settings class="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 class="text-sm text-foreground">
                                        2. Inversión Inteligente Híbrida
                                    </h4>
                                    <p
                                        class="text-xs text-muted-foreground mt-1 leading-relaxed"
                                    >
                                        El inversor regula los flujos de
                                        corriente. Prioriza el consumo del
                                        hogar, almacena el excedente en baterías
                                        y solo recurre a la red pública como
                                        respaldo final.
                                    </p>
                                </div>
                            </div>

                            <!-- Step 3 -->
                            <div
                                class="p-4 bg-background/40 dark:bg-background/25 border border-border/40 rounded-2xl flex gap-4"
                            >
                                <div
                                    class="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0 h-fit"
                                >
                                    <Battery class="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 class="text-sm text-foreground">
                                        3. Banco de Baterías de Litio (LiFePO4)
                                    </h4>
                                    <p
                                        class="text-xs text-muted-foreground mt-1 leading-relaxed"
                                    >
                                        Almacena la energía para la noche o
                                        durante cortes de luz. Sistema de Litio
                                        Ferro-fosfato ultra seguro, con más de
                                        10 años de vida útil estimada y carga
                                        rápida.
                                    </p>
                                </div>
                            </div>

                            <!-- Step 4 -->
                            <div
                                class="p-4 bg-background/40 dark:bg-background/25 border border-border/40 rounded-2xl flex gap-4"
                            >
                                <div
                                    class="p-3 rounded-xl bg-sky-500/10 text-sky-500 shrink-0 h-fit"
                                >
                                    <Eye class="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 class="text-sm text-foreground">
                                        4. Monitoreo y Aplicación Móvil
                                    </h4>
                                    <p
                                        class="text-xs text-muted-foreground mt-1 leading-relaxed"
                                    >
                                        Sigue en tiempo real tu consumo diario,
                                        la generación de tus paneles solares y
                                        el nivel de carga de tus baterías desde
                                        tu smartphone.
                                    </p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
