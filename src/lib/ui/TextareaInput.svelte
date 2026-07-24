<script lang="ts">
    import type { HTMLTextareaAttributes } from "svelte/elements";

    interface Props extends HTMLTextareaAttributes {
        label?: string;
        value: string;
        error?: string | string[];
        hint?: string;
    }

    let {
        label,
        value = $bindable(""),
        error,
        hint,
        id,
        rows = 4,
        class: className = "",
        ...restProps
    }: Props = $props();

    let errorMessage = $derived(Array.isArray(error) ? error[0] : error);
    let inputId = $derived(
        id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined),
    );
</script>

<div class="flex flex-col gap-1.5 w-full">
    {#if label}
        <label
            for={inputId}
            class="text-sm font-medium text-slate-700 dark:text-slate-200"
        >
            {label}
        </label>
    {/if}

    <textarea
        id={inputId}
        bind:value
        {rows}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? `${inputId}-error` : undefined}
        class="w-full rounded-lg border px-4 py-2.5 text-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 resize-y bg-white dark:bg-transparent dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500
      {errorMessage
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 text-red-900 dark:border-red-800 dark:text-red-200 dark:placeholder:text-red-300/50'
            : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'}
      {className}"
        {...restProps}></textarea>

    {#if errorMessage}
        <p
            id="{inputId}-error"
            class="text-xs font-medium text-red-600 dark:text-red-400"
        >
            {errorMessage}
        </p>
    {:else if hint}
        <p class="text-xs text-slate-500 dark:text-slate-400">{hint}</p>
    {/if}
</div>
