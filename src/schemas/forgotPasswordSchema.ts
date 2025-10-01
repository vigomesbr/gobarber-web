import { z } from 'zod';

export const forgotPasswordFormSchema = z.object({

    email: z.string()
    .nonempty("O e-mail é obrigatório.")
    .email({ message: "Por favor, insira um formato de e-mail válido." }), 

});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;