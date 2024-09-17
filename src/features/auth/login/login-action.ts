'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { loginSchema } from '@/features/auth/login/login-validation';
import { actionClient } from '@/lib/safe-action';
import { createClient } from '@/utils/supabase/server';

export const loginAction = actionClient
  .metadata({ actionName: 'login' })
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword(parsedInput);
    if (error) throw error;

    revalidatePath('/');
    redirect('/');
  });
