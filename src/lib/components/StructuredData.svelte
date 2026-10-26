<script lang="ts">
    interface Props {
        schema: Record<string, unknown>;
    }

    let { schema }: Props = $props();
</script>

<svelte:head>
    <script type="application/ld+json" dangerouslySetInnerHTML={JSON.stringify(schema)}></script>
</svelte:head>
