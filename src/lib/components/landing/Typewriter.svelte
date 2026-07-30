<script lang="ts">
    let { words = [] }: { words: string[] } = $props();

    let currentText = $state("");

    // Función auxiliar para pausar la ejecución sin bloquear el hilo principal
    const sleep = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    $effect(() => {
        if (!words.length) return;

        let active = true;

        const runTypewriter = async () => {
            let wordIndex = 0;

            while (active) {
                const currentWord = words[wordIndex];

                // 1. Escribir palabra
                for (let i = 0; i <= currentWord.length; i++) {
                    if (!active) return;
                    currentText = currentWord.slice(0, i);
                    await sleep(100); // Velocidad al escribir
                }

                // 2. Pausa con la palabra completa
                await sleep(2000);

                // 3. Borrar palabra
                for (let i = currentWord.length; i >= 0; i--) {
                    if (!active) return;
                    currentText = currentWord.slice(0, i);
                    await sleep(50); // Velocidad al borrar
                }

                // 4. Siguiente palabra
                wordIndex = (wordIndex + 1) % words.length;
                await sleep(300); // Pausa corta antes de empezar la siguiente
            }
        };

        runTypewriter();

        // Si el componente se desmonta o cambian las `words`, cancelamos la ejecución anterior
        return () => {
            active = false;
        };
    });
</script>

<span>{currentText}<span class="animate-pulse">|</span></span>
