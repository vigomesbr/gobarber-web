import { z } from 'zod';

export const profileFormSchema = z
  .object({
    name: z.string().min(1, 'O nome é obrigatório.'),
    email: z.string().min(1, 'O e-mail é obrigatório.').email('Formato de e-mail inválido.'),
    
    // Todos os campos de senha são opcionais na definição inicial
    old_password: z.string().optional(),
    new_password: z.string().optional(),
    password_confirmation: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.old_password || data.new_password || data.password_confirmation) {
      
      if (!data.old_password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'A senha antiga é obrigatória para definir uma nova.',
          path: ['old_password'],
        });
      }

      if (!data.new_password || data.new_password.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'A nova senha é obrigatória e deve ter no mínimo 6 caracteres.',
          path: ['new_password'],
        });
      }

      if (data.password_confirmation !== data.new_password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'As senhas não conferem.',
          path: ['password_confirmation'],
        });
      }
    }
  });

export type ProfileFormData = z.infer<typeof profileFormSchema>;