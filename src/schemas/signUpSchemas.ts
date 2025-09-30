import { z } from 'zod';

export const signUpFormSchema = z.object({
    name: z.string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres.'),

    email: z.string()
    .nonempty("O e-mail é obrigatório.")
    .email({ message: "Por favor, insira um formato de e-mail válido." }), 
   
    password: z.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.'),

});

export type SignUpFormData = z.infer<typeof signUpFormSchema>;