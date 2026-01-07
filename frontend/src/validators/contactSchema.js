import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  message: z.string().min(1, "Requerido"),
  consent: z
    .boolean()
    .refine((value) => value === true, {
      message: "Debés aceptar la política de privacidad",
    }),
});
