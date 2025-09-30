import { z } from 'zod';

export const signInFormSchema = z.object({
    email: z.string()
    .nonempty("O e-mail é obrigatório.")
    .email({ message: "Por favor, insira um formato de e-mail válido." }), 
   
    password: z.string()
    .nonempty("A senha é obrigatória."),

});

export type SignInFormData = z.infer<typeof signInFormSchema>;