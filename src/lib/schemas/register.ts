import * as v from "valibot";

export const registerSchema = v.object({
  name: v.pipe(
    v.string("El nombre es requerido"),
    v.nonEmpty("El nombre es requerido"),
  ),
  email: v.pipe(
    v.string("El email es requerido"),
    v.nonEmpty("El email es requerido"),
    v.email("Email inválido"),
  ),
  password: v.pipe(
    v.string("La contraseña es requerida"),
    v.nonEmpty("La contraseña es requerida"),
    v.minLength(8, "La contraseña debe tener al menos 8 caracteres"),
  ),
});

export type RegisterSchema = v.InferOutput<typeof registerSchema>;
