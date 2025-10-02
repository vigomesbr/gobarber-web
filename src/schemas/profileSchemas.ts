import { z } from 'zod';

export const profileFormSchema = z
  .object({
    name: z.string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres.'),

    email: z.string()
    .nonempty("O e-mail é obrigatório.")
    .email({ message: "Por favor, insira um formato de e-mail válido." }), 

    old_password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),

    new_password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
    
    password_confirmation: z.string().min(1, 'A confirmação da senha é obrigatória.'),
  })
  .refine(
    data => data.new_password === data.password_confirmation,
    {
      message: 'As senhas não conferem.',
      path: ['password_confirmation'],
    },
  );

export type ProfileFormData = z.infer<typeof profileFormSchema>;