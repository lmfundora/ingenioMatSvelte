<script lang="ts">
    import { toaster } from "$lib/toast";
    import { cn } from "$lib/utils";
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
</script>

<!-- Portal y contenedor raíz de Melt UI -->
<div {...toaster.root}>
    <ol
        class="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
    >
        {#each toaster.toasts as t (t.id)}
            <div
                animate:flip={{ duration: 250 }}
                in:fly={{ y: 20, duration: 200 }}
                out:fly={{ opacity: 0, x: 100, duration: 150 }}
                {...t.content}
                class={cn(
                    "group pointer-events-auto relative mb-3 flex w-full items-start justify-between space-x-4 overflow-hidden rounded-xl border p-4 pr-8 shadow-lg transition-all",
                    "bg-white/95 backdrop-blur-md border-slate-200/50 text-slate-900 dark:bg-slate-900/95 dark:border-slate-700/50 dark:text-slate-100",
                    t.data.type === "success" &&
                        "border-emerald-200/50 bg-emerald-50/90 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-100",
                    t.data.type === "error" &&
                        "border-red-200/50 bg-red-50/90 text-red-900 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-100",
                    t.data.type === "warning" &&
                        "border-amber-200/50 bg-amber-50/90 text-amber-900 dark:border-amber-500/40 dark:bg-amber-950/40 dark:text-amber-100",
                )}
            >
                <!-- Icono dinámico según el tipo -->
                <div class="mt-0.5 shrink-0">
                    {#if t.data.type === "success"}
                        <svg
                            class="h-5 w-5 text-emerald-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    {:else if t.data.type === "error"}
                        <svg
                            class="h-5 w-5 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    {:else if t.data.type === "warning"}
                        <svg
                            class="h-5 w-5 text-amber-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    {:else}
                        <svg
                            class="h-5 w-5 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    {/if}
                </div>

                <!-- Título y Descripción -->
                <div class="grid flex-1 gap-1">
                    <div
                        {...t.title}
                        class="text-sm font-semibold tracking-tight"
                    >
                        {t.data.title}
                    </div>
                    {#if t.data.description}
                        <div
                            {...t.description}
                            class="text-xs opacity-90 leading-relaxed"
                        >
                            {t.data.description}
                        </div>
                    {/if}
                </div>

                <!-- Botón de Cierre -->
                <button
                    {...t.close}
                    class="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none group-hover:opacity-100"
                    aria-label="Cerrar notificación"
                >
                    <svg
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        {/each}
    </ol>
</div>
