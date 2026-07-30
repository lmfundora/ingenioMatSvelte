<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import GPattern from "../GPattern.svelte";

    const values = [
        {
            n: "1",
            title: "Abastecimiento Garantizado",
            body: "Mantenemos depósitos estratégicos con stock permanente en cemento, mortero y cal para asegurar que nunca te falten materiales esenciales de cimentación.",
        },
        {
            n: "2",
            title: "Carga Segura en Planta",
            body: "Supervisamos y asistimos en la carga ordenada de tus vehículos, asegurando que cubiertas de zinc y carpintería de aluminio se estiben de forma segura para su traslado.",
        },
        {
            n: "3",
            title: "Asesoramiento en Obra",
            body: "Nuestros asesores de campo asisten a tu obra para evaluar la dosificación de hormigones o seleccionar las tuberías hidráulicas correctas para el caudal.",
        },
        {
            n: "4",
            title: "Compromiso Sustentable",
            body: "Trabajamos con canteras que realizan restauración ecológica y distribuimos materiales de yeso y falso techo con certificaciones de huella de carbono neutra.",
        },
    ];
</script>

<section class="py-20 bg-background relative overflow-hidden mt-40">
    <GPattern
        cols={10}
        rows={3}
        variant="primary"
        opacity="opacity-[0.04]"
        fontSize="text-8xl"
        class="absolute top-0 left-0 w-full h-64 z-0 [mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)]"
    />

    <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
    >
        <div class="max-w-3xl mx-auto mb-16 space-y-4">
            <span class="text-xs uppercase tracking-widest text-primary">
                Nuestros Pilares
            </span>
            <h2
                class="display-title text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground"
            >
                Valores que Respaldan Nuestra Producción
            </h2>
            <div class="w-16 h-1 bg-primary mx-auto rounded"></div>
        </div>

        <!-- Cards -->
        <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left"
        >
            {#each values as card (card.n)}
                <!-- Cambiado <Card> por <Card.Root> -->
                <Card.Root
                    class="p-8 rounded-3xl bg-background space-y-4 relative group hover:scale-[1.02] transition-all duration-300 cursor-default"
                >
                    <div
                        class="w-full gap-4 h-12 rounded-2xl text-primary flex items-center justify-center shrink-0 text-lg bg-background dark:bg-primary/10"
                    >
                        {card.n}
                        <h3
                            class="text-lg text-primary group-hover:text-primary transition-colors duration-300"
                        >
                            {card.title}
                        </h3>
                    </div>

                    <div class="h-0.5 w-full bg-primary"></div>
                    <p class="text-sm text-muted-foreground leading-relaxed">
                        {card.body}
                    </p>
                </Card.Root>
            {/each}
        </div>
    </div>
</section>
