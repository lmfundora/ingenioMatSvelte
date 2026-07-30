<script lang="ts">
    import { api } from "$convex/_generated/api";
    import { useQuery } from "convex-svelte";
    import { Sparkles } from "@lucide/svelte";

    // Trae todas las ofertas activas
    const activeOfferQuery = useQuery(api.offers.getActive, {});

    // Lista de ofertas activas (array vacío en SSR hasta que lleguen datos)
    const activeOffers = $derived(activeOfferQuery.data ?? []);

    // Índice actual (reactive, empieza en 0)
    let currentIndex = $state(0);

    // Controla la visibilidad para el fade
    let visible = $state(true);

    // Duración por oferta (ms) y duración del fade (ms)
    const INTERVAL_MS = 4000;
    const FADE_MS = 400;

    // $effect solo se ejecuta en el cliente, nunca en SSR
    $effect(() => {
        // Si solo hay 1 oferta o ninguna, no hace falta rotar
        if (activeOffers.length <= 1) return;

        // Resetear al índice 0 si los datos cambian y el índice queda fuera de rango
        if (currentIndex >= activeOffers.length) {
            currentIndex = 0;
        }

        const timer = setInterval(() => {
            // Fade out
            visible = false;
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % activeOffers.length;
                // Fade in
                visible = true;
            }, FADE_MS);
        }, INTERVAL_MS);

        return () => clearInterval(timer);
    });

    const currentOffer = $derived(
        activeOffers.length > 0
            ? activeOffers[currentIndex % activeOffers.length]
            : null,
    );
</script>

{#if currentOffer}
    <div class="banner-wrapper">
        <!-- Fondo animado -->
        <div class="banner-bg"></div>
        <div class="banner-shimmer"></div>
        <div class="banner-glow"></div>

        <!-- Contenido rotativo -->
        <div
            class="banner-content"
            class:visible
            style="--fade-ms: {FADE_MS}ms"
        >
            <span class="banner-star" aria-hidden="true">✦</span>
            <p class="banner-text">{currentOffer.text}</p>
            <span class="banner-star" aria-hidden="true">✦</span>
        </div>

        <!-- Indicadores de puntos si hay más de 1 -->
        {#if activeOffers.length > 1}
            <div class="banner-dots">
                {#each activeOffers as _, i}
                    <span
                        class="banner-dot"
                        class:active={i === currentIndex % activeOffers.length}
                    ></span>
                {/each}
            </div>
        {/if}
    </div>
{/if}

<style>
    .banner-wrapper {
        position: relative;
        width: 100%;
        background: linear-gradient(
            90deg,
            #f59e0b 0%,
            #f97316 40%,
            #e11d48 100%
        );
        color: #fff;
        padding: 0.1rem 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        z-index: 60;
        overflow: hidden;
        min-height: 1.5rem;
    }

    /* Gradiente animado de fondo */
    .banner-bg {
        position: absolute;
        inset: 0;
        background: linear-gradient(
            270deg,
            #f59e0b,
            #f97316,
            #e11d48,
            #9333ea,
            #e11d48,
            #f97316,
            #f59e0b
        );
        background-size: 400% 100%;
        animation: gradientShift 8s ease infinite;
        pointer-events: none;
    }

    .banner-shimmer {
        position: absolute;
        top: 0;
        left: -15%;
        width: 25%;
        height: 100%;
        background: rgba(255, 255, 255, 0.22);
        filter: blur(18px);
        transform: skewX(-12deg);
        animation: shimmer 3.5s ease-in-out infinite;
        pointer-events: none;
    }

    /* Halo difuso inferior */
    .banner-glow {
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 16px;
        background: rgba(249, 115, 22, 0.45);
        filter: blur(12px);
        pointer-events: none;
    }

    .banner-content {
        position: relative;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        max-width: 80rem;
        width: 100%;
        opacity: 0;
        transform: translateY(4px);
        transition:
            opacity var(--fade-ms) ease,
            transform var(--fade-ms) ease;
    }

    .banner-content.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .banner-text {
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        margin: 0;
        color: #fff;
    }

    @media (min-width: 640px) {
        .banner-text {
            font-size: 0.875rem;
        }
    }

    .banner-star {
        font-size: 0.7rem;
        opacity: 0.9;
        animation: spin-slow 6s linear infinite;
        display: inline-block;
        flex-shrink: 0;
    }

    /* Indicadores */
    .banner-dots {
        position: absolute;
        right: 1rem;
        display: flex;
        gap: 0.25rem;
        align-items: center;
    }

    .banner-dot {
        width: 5px;
        height: 5px;
        border-radius: 9999px;
        background: rgba(255, 255, 255, 0.4);
        transition:
            background 0.3s ease,
            transform 0.3s ease;
    }

    .banner-dot.active {
        background: rgba(255, 255, 255, 0.95);
        transform: scale(1.3);
    }

    @keyframes shimmer {
        0% {
            transform: translateX(-100%) skewX(-12deg);
        }
        100% {
            transform: translateX(550%) skewX(-12deg);
        }
    }

    @keyframes gradientShift {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    @keyframes spin-slow {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
</style>
