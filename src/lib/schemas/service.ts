import * as v from "valibot";

export const serviceSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("El nombre es requerido")),
  description: v.pipe(v.string(), v.nonEmpty("La descripción es requerida")),
  imageUrl: v.pipe(v.string(), v.nonEmpty("La imagen es requerida")),
  serviceTypeId: v.pipe(v.string(), v.nonEmpty("El tipo de servicio es requerido")),
  detalles: v.optional(v.string(), ""),
  fotosDeEjemplos: v.optional(v.array(v.string()), []),
  precioBase: v.optional(v.string(), ""),
  duracionEstimada: v.optional(v.string(), ""),
  areaDeCobertura: v.optional(v.string(), ""),
  requisitos: v.optional(v.string(), ""),
});

export type ServiceSchema = typeof serviceSchema;
