import * as v from "valibot";

export const loginSchema = v.object({
  email: v.pipe(
    v.string("El email debe ser un texto"),
    v.nonEmpty("El email es requerido"),
    v.email("Email inválido"),
  ),
  password: v.pipe(
    v.string("La contraseña debe ser un texto"),
    v.nonEmpty("La contraseña es requerida"),
    v.minLength(8, "La contraseña debe tener al menos 8 caracteres"),
  ),
});

export type LoginSchema = typeof loginSchema;
