'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { loginEmailSchema } from '@/features/auth/login/login-email-validation';
import { actionClient } from '@/lib/safe-action';
import { createClient } from '@/supabase/server';

export const loginAction = actionClient
  .metadata({ actionName: 'login' })
  .schema(loginEmailSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword(parsedInput);
    if (error) throw error;

    revalidatePath('/');
    redirect('/');
  });
