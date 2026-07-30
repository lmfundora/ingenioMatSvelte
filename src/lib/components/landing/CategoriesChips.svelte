<script lang="ts">
    const categories = [
        "Construcción Civil",
        "Energía Solar",
        "Baterías y Respaldo",
        "Carpintería de Aluminio",
        "Cemento y Arena",
        "Techos de Zinc",
        "Falso Techo",
        "Losas y Cerámicas",
        "Tuberías Hidráulicas",
        "Tuberías Eléctricas",
        "Polvo de Piedra",
        "Mortero y Cal",
    ];
</script>

<div class="relative w-full overflow-hidden bg-background py-5">
    <div class="flex w-max animate-marquee">
        <!-- List 1 -->
        <div class="flex gap-8 pr-8 shrink-0">
            {#each categories as cat, idx (`cat1-${idx}`)}
                <div
                    class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-foreground border border-foreground text-background text-xs md:text-sm font-extrabold tracking-wider uppercase transition-all duration-300 hover:bg-primary hover:border-primary hover:text-primary-foreground hover:scale-105 cursor-default"
                >
                    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"
                    ></span>
                    {cat}
                </div>
            {/each}
        </div>

        <!-- List 2 (Duplicate for loop) -->
        <div class="flex gap-8 pr-8 shrink-0">
            {#each categories as cat, idx (`cat2-${idx}`)}
                <div
                    class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-foreground border border-foreground text-background text-xs md:text-sm font-extrabold tracking-wider uppercase transition-all duration-300 hover:bg-primary hover:border-primary hover:text-primary-foreground hover:scale-105 cursor-default"
                >
                    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"
                    ></span>
                    {cat}
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    @keyframes marquee {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }

    .animate-marquee {
        animation: marquee 35s linear infinite;
    }

    .animate-marquee:hover {
        animation-play-state: paused;
    }
</style>
