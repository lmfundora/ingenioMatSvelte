<script lang="ts">
    import { goto } from "$app/navigation";
    import { superForm, defaults } from "sveltekit-superforms";
    import { valibot, valibotClient } from "sveltekit-superforms/adapters";
    import { registerSchema } from "$lib/schemas/register";
    import { authClient } from "$lib/auth-client";
    import { toast } from "$lib/toast";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";

    let isSubmittingAuth = $state(false);

    const { form, errors, enhance } = superForm(
        defaults(valibot(registerSchema)),
        {
            SPA: true,
            validators: valibotClient(registerSchema),
            async onUpdate({ form }) {
                if (!form.valid) return;

                isSubmittingAuth = true;
                try {
                    const result = await authClient.signUp.email({
                        email: form.data.email,
                        password: form.data.password,
                        name: form.data.name,
                    });

                    if (result.error) {
                        toast.error(
                            result.error.message || "Error al crear la cuenta",
                        );
                    } else {
                        toast.success("Cuenta creada exitosamente");
                        goto("/");
                    }
                } catch (err) {
                    toast.error("Ocurrió un error inesperado");
                } finally {
                    isSubmittingAuth = false;
                }
            },
        },
    );
</script>

<svelte:head>
    <title>Crear Cuenta - Don Quijote</title>
</svelte:head>

<main class="min-h-screen flex items-center justify-center bg-background px-4">
    <div
        class="w-full max-w-md rounded-xl border border-border bg-card text-card-foreground shadow-sm"
    >
        <div class="flex flex-col space-y-1.5 p-6 text-center">
            <h1 class="text-2xl font-bold tracking-widest font-italianno">
                Don Quijote
            </h1>
            <p class="text-sm text-muted-foreground">
                Crea tu cuenta para comenzar
            </p>
        </div>

        <div class="p-6 pt-0">
            <form method="POST" use:enhance class="grid gap-4">
                <!-- Nombre -->
                <div class="grid gap-2">
                    <label for="name" class="text-sm font-medium leading-none">
                        Nombre
                    </label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        bind:value={$form.name}
                        aria-invalid={$errors.name ? "true" : undefined}
                    />
                    {#if $errors.name}
                        <p class="text-sm font-medium text-destructive">
                            {$errors.name[0]}
                        </p>
                    {/if}
                </div>

                <!-- Email -->
                <div class="grid gap-2">
                    <label for="email" class="text-sm font-medium leading-none">
                        Email
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        bind:value={$form.email}
                        aria-invalid={$errors.email ? "true" : undefined}
                    />
                    {#if $errors.email}
                        <p class="text-sm font-medium text-destructive">
                            {$errors.email[0]}
                        </p>
                    {/if}
                </div>

                <!-- Contraseña -->
                <div class="grid gap-2">
                    <label
                        for="password"
                        class="text-sm font-medium leading-none"
                    >
                        Contraseña
                    </label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        bind:value={$form.password}
                        aria-invalid={$errors.password ? "true" : undefined}
                    />
                    {#if $errors.password}
                        <p class="text-sm font-medium text-destructive">
                            {$errors.password[0]}
                        </p>
                    {/if}
                </div>

                <!-- Botón de Envío -->
                <Button
                    type="submit"
                    disabled={isSubmittingAuth}
                    class="w-full"
                >
                    {#if isSubmittingAuth}
                        <span class="flex items-center justify-center gap-2">
                            <span
                                class="h-4 w-4 animate-spin rounded-full border-2 border-neutral-400 border-t-white dark:border-neutral-600 dark:border-t-neutral-900"
                            ></span>
                            <span>Por favor espera</span>
                        </span>
                    {:else}
                        Crear cuenta
                    {/if}
                </Button>

                <!-- Redirección a Login -->
                <div class="text-center text-sm text-muted-foreground pt-2">
                    ¿Ya tienes cuenta?{" "}
                    <a
                        href="/login"
                        class="text-foreground hover:underline font-medium"
                    >
                        Inicia sesión
                    </a>
                </div>
            </form>
        </div>
    </div>
</main>
