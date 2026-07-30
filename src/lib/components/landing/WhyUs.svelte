<script lang="ts">
    import { ShieldCheck, Calculator, Award } from "@lucide/svelte";
    import { Button } from "$lib/components/ui/button";

    const reasons = [
        {
            title: "Garantía de Obra y Certificación",
            description:
                "Tanto nuestros materiales de fábrica como nuestros servicios de construcción civil y montaje solar están respaldados por estrictas garantías de durabilidad.",
            icon: ShieldCheck,
        },
        {
            title: "Cómputos y Auditoría Energética Gratis",
            description:
                "Calculamos las cantidades exactas de materiales para tu plano de obra o realizamos el estudio de consumo eléctrico necesario para dimensionar tu sistema de paneles solares.",
            icon: Calculator,
        },
        {
            title: "Soporte e Instalación Especializada",
            description:
                "Contamos con personal propio certificado para la instalación de sistemas solares, carpintería de aluminio y dirección técnica de obras residenciales e industriales.",
            icon: Award,
        },
    ];
</script>

<section
    id="ventajas"
    class="mt-40 mx-2 md:mx-4 rounded-t-4xl pt-32 pb-20 bg-[#f5f0e8] dark:bg-background"
>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center">
        <div class="max-w-3xl space-y-4">
            <h2
                class="max-w-3xl display-title text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground font-light"
            >
                Calidad Sin Compromisos
            </h2>
        </div>

        <div class="w-16 h-1 bg-primary rounded my-4 mb-8"></div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <!-- Left Image Card — CSS 3D perspective wrapper -->
            <div class="lg:col-span-5">
                <!-- Static tilt + hover lift — pure CSS, zero JS -->
                <div
                    class="relative overflow-hidden rounded-2xl border border-border aspect-4/3 bg-muted group"
                >
                    <img
                        src="/Gemini_Generated_Image_3d90v23d90v23d902.png"
                        alt="Producción y stock de materiales de construcción"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
            </div>

            <!-- Right bullet points -->
            <div class="lg:col-span-7 space-y-5 text-left">
                {#each reasons as r (r.title)}
                    <div
                        class="flex gap-5 items-start p-6 rounded-3xl bg-[#f5f0e8] dark:bg-card hover:scale-[1.02] transition-all duration-300 cursor-default"
                    >
                        <div
                            class="p-3.5 rounded-2xl shrink-0 bg-[#f5f0e8] dark:bg-primary/10"
                        >
                            <svelte:component this={r.icon} size={40} />
                        </div>
                        <div>
                            <h4 class="text-lg text-foreground mb-1">
                                {r.title}
                            </h4>
                            <p class="text-sm text-muted-foreground">
                                {r.description}
                            </p>
                        </div>
                    </div>
                {/each}

                <div class="pt-2">
                    <Button
                        size="lg"
                        class="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-8 ms-11 hover:scale-[1.02] transition-all duration-300 cursor-default"
                    >
                        Descargar Fichas Técnicas
                    </Button>
                </div>
            </div>
        </div>
    </div>
</section>
