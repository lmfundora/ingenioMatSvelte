<script lang="ts">
    import { Mail, MapPin, Phone } from "@lucide/svelte";

    const currentYear = new Date().getFullYear();
</script>

<footer
    class="bg-foreground text-background/80 pt-16 pb-8 border-t border-white/10 mt-auto mx-1 mb-1 sm:mx-2 sm:mb-2 rounded-2xl"
>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10"
        >
            <!-- Column 1 Logo and details -->
            <div class="lg:col-span-1 space-y-5 text-left">
                <img
                    src="/WhatsApp Image 2026-06-18 at 18.35.29.svg"
                    alt="IngenioMat Logo"
                    class="h-10 w-auto object-contain bg-white px-2 py-1.5 rounded"
                />
                <p class="text-sm text-gray-400 max-w-sm leading-relaxed">
                    Líderes en construcción, energía solar con baterías,
                    carpintería de aluminio y suministro de materiales
                    certificados de alta resistencia.
                </p>
                <div class="space-y-2 text-sm text-gray-400">
                    <div class="flex items-center gap-2">
                        <Phone class="w-4 h-4 text-primary shrink-0" />
                        <span>+1 (800) 555-1234</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Mail class="w-4 h-4 text-primary shrink-0" />
                        <span>ventas@ingeniomat.com</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <MapPin class="w-4 h-4 text-primary shrink-0" />
                        <span>Parque Industrial Oeste, Galpón 4</span>
                    </div>
                </div>
            </div>

            <!-- Column 2 - Materiales -->
            <div class="text-left space-y-4">
                <h4
                    class="text-white font-bold text-sm uppercase tracking-wider"
                >
                    Materiales
                </h4>
                <ul class="space-y-2 text-sm text-gray-400">
                    <li>
                        <a
                            href="#catalogo"
                            class="hover:text-primary transition-colors"
                        >
                            Cemento, Mortero y Cal
                        </a>
                    </li>
                    <li>
                        <a
                            href="#catalogo"
                            class="hover:text-primary transition-colors"
                        >
                            Áridos y Polvo Piedra
                        </a>
                    </li>
                    <li>
                        <a
                            href="#catalogo"
                            class="hover:text-primary transition-colors"
                        >
                            Techos de Zinc
                        </a>
                    </li>
                    <li>
                        <a
                            href="#catalogo"
                            class="hover:text-primary transition-colors"
                        >
                            Falso Techo y Losas
                        </a>
                    </li>
                    <li>
                        <a
                            href="#catalogo"
                            class="hover:text-primary transition-colors"
                        >
                            Tuberías e Instalaciones
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Column 3 - Servicios -->
            <div class="text-left space-y-4">
                <h4
                    class="text-white font-bold text-sm uppercase tracking-wider"
                >
                    Servicios
                </h4>
                <ul class="space-y-2 text-sm text-gray-400">
                    <li>
                        <a
                            href="#construccion"
                            class="hover:text-primary transition-colors"
                        >
                            Construcción Civil
                        </a>
                    </li>
                    <li>
                        <a
                            href="#construccion"
                            class="hover:text-primary transition-colors"
                        >
                            Carpintería de Aluminio
                        </a>
                    </li>
                    <li>
                        <a
                            href="#solar"
                            class="hover:text-primary transition-colors"
                        >
                            Sistemas Solar y Baterías
                        </a>
                    </li>
                    <li>
                        <a
                            href="#solar"
                            class="hover:text-primary transition-colors"
                        >
                            Auditorías Energéticas
                        </a>
                    </li>
                    <li>
                        <a
                            href="#construccion"
                            class="hover:text-primary transition-colors"
                        >
                            Remodelaciones y Acabados
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Column 4 - Company -->
            <div class="text-left space-y-4">
                <h4
                    class="text-white font-bold text-sm uppercase tracking-wider"
                >
                    Empresa
                </h4>
                <ul class="space-y-2 text-sm text-gray-400">
                    <li>
                        <a
                            href="#inicio"
                            class="hover:text-primary transition-colors"
                        >
                            Inicio
                        </a>
                    </li>
                    <li>
                        <a
                            href="#ventajas"
                            class="hover:text-primary transition-colors"
                        >
                            Ventajas de Compra
                        </a>
                    </li>
                    <li>
                        <a
                            href="#nosotros"
                            class="hover:text-primary transition-colors"
                        >
                            Quiénes Somos
                        </a>
                    </li>
                    <li>
                        <a
                            href="#contacto"
                            class="hover:text-primary transition-colors"
                        >
                            Contacto
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Under footer -->
        <div
            class="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500"
        >
            <p>
                © {currentYear} IngenioMat. Todos los derechos reservados. Diseñado
                para constructores exigentes.
            </p>
            <div class="flex gap-4">
                <a
                    href="#politicas"
                    class="hover:text-primary transition-colors"
                >
                    Políticas de Venta
                </a>
                <span>|</span>
                <a
                    href="#garantia"
                    class="hover:text-primary transition-colors"
                >
                    Garantía de Materiales
                </a>
            </div>
        </div>
    </div>
</footer>
