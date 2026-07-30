<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import GPattern from "../GPattern.svelte";
</script>

<section class="py-12 bg-background relative overflow-hidden mt-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
            class="relative rounded-3xl bg-foreground text-background overflow-hidden border border-white/10 p-8 md:p-12"
        >
            <!-- Background design elements -->
            <div
                class="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-primary/10 pointer-events-none"
            ></div>
            <div
                class="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-primary/20 blur-3xl pointer-events-none"
            ></div>

            <!-- Brand G-pattern watermark — top-left corner -->
            <GPattern
                cols={7}
                rows={4}
                variant="white"
                opacity="opacity-[0.04]"
                fontSize="text-8xl"
                class="absolute -top-4 -left-4 w-2/3 h-full z-0"
            />

            <div
                class="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
                <!-- Left Column Text -->
                <div class="lg:col-span-7 space-y-6 text-left">
                    <h2
                        class="display-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
                    >
                        ¿Listo para Empezar a Construir?
                    </h2>
                    <p class="text-gray-300 text-sm sm:text-base max-w-xl">
                        Envíame tus planos, lista de compras o detalles de obra.
                        Nuestro equipo técnico realizará el cómputo métrico y te
                        enviará una cotización detallada en menos de 2 horas.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 pt-2">
                        <a href="/cataloge/servicios" class="no-underline">
                            <Button
                                size="lg"
                                class="w-full sm:w-auto h-12 px-8 font-semibold bg-primary hover:bg-primary/95 text-white"
                            >
                                Ver Servicios
                            </Button>
                        </a>
                        <a href="/cataloge" class="no-underline">
                            <Button
                                size="lg"
                                variant="outline"
                                class="w-full sm:w-auto h-12 px-8 font-semibold border-white/20 text-white hover:bg-white/10 hover:text-white"
                            >
                                Catálogo General
                            </Button>
                        </a>
                    </div>
                </div>

                <!-- Right Column Image overlap -->
                <div class="lg:col-span-5 hidden lg:block relative self-end">
                    <div
                        class="overflow-hidden rounded-2xl border border-white/15 aspect-[1.3] bg-muted transform translate-y-8 translate-x-4"
                    >
                        <img
                            src="/images1.png"
                            alt="Servicio y atencion en Ingeniomat"
                            class="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
