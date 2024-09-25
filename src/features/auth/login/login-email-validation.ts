import { z } from 'zod';

export const loginEmailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});
export type LoginEmailValues = z.infer<typeof loginEmailSchema>;
