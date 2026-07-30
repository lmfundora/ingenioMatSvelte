<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";

    const advisors = [
        {
            img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
            alt: "Gabriel Rojas",
            badge: "Agregados y Acero",
            name: "Ing. Gabriel Rojas",
            role: "Cómputo Estructural",
        },
        {
            img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
            alt: "Sofia Perez",
            badge: "Aluminio y Cubiertas",
            name: "Arq. Sofía Pérez",
            role: "Cálculo de Terminaciones",
        },
        {
            img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
            alt: "Andres Silva",
            badge: "Hormigones",
            name: "Ing. Andrés Silva",
            role: "Técnico en Dosificación",
        },
        {
            img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
            alt: "Daniela Reyes",
            badge: "Energía Solar y Redes",
            name: "Ing. Daniela Reyes",
            role: "Especialista en Sistemas Solares",
        },
    ];
</script>

<section id="nosotros" class="py-20 bg-[#f5f0e8] dark:bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="max-w-3xl mx-auto mb-16 space-y-4">
            <span
                class="text-xs font-bold uppercase tracking-widest text-primary"
            >
                Soporte Humano
            </span>
            <h2
                class="display-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground"
            >
                Asesores Técnicos Detrás de Cada Proyecto
            </h2>
            <div class="w-16 h-1 bg-primary mx-auto rounded"></div>
            <p class="text-muted-foreground text-sm sm:text-base">
                No solo vendemos materiales, te acompañamos en el proceso
                constructivo con asesores especializados por áreas.
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each advisors as a (a.alt)}
                <Card.Root
                    class="bg-[#f5f0e8] dark:bg-card text-card-foreground rounded-3xl overflow-hidden flex flex-col hover:scale-[1.02] transition-all duration-300 cursor-default group"
                >
                    <!-- Photo — inset neumorphic frame -->
                    <div
                        class="h-64 overflow-hidden relative shrink-0 rounded-t-3xl"
                    >
                        <div
                            class="absolute inset-0 bg-slate-900/10 z-10"
                        ></div>
                        <img
                            src={a.img}
                            alt={a.alt}
                            class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <span
                            class="absolute bottom-4 left-4 z-20 text-[10px] font-bold tracking-widest text-white bg-primary/90 backdrop-blur-sm px-2.5 py-1 rounded-full uppercase"
                        >
                            {a.badge}
                        </span>
                    </div>

                    <!-- Info -->
                    <div class="p-5 text-left">
                        <h4
                            class="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300"
                        >
                            {a.name}
                        </h4>
                        <p
                            class="text-xs text-muted-foreground font-semibold mt-0.5"
                        >
                            {a.role}
                        </p>
                    </div>
                </Card.Root>
            {/each}
        </div>
    </div>
</section>
