import { z } from 'zod';

export const resetPasswordFormSchema = z
  .object({
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'), // É uma boa prática adicionar um mínimo

    password_confirmation: z.string().min(1, 'A confirmação da senha é obrigatória.'),
  })
  .refine(
    data => data.password === data.password_confirmation,
    {
      message: 'As senhas não conferem.',
      path: ['password_confirmation'],
    },
  );

export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;