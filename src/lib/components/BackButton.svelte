<script lang="ts">
    import { ArrowLeft } from '@lucide/svelte';
    import { Button } from '$lib/components/ui/button';

    interface Props {
        href?: string;
        className?: string;
    }

    let { href = '/cataloge', className = '' }: Props = $props();

    function goBack() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = href;
        }
    }
</script>

<Button
    variant="ghost"
    size="icon"
    onclick={goBack}
    class="{className}"
    aria-label="Volver"
>
    <ArrowLeft size={20} />
</Button>
