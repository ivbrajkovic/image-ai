'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { actionClient } from '@/lib/safe-action';
import { createClient } from '@/supabase/server';

export const loginGithubAction = actionClient
  .metadata({ actionName: 'login-github' })
  .action(async () => {
    console.log('Sign in with GitHub');

    const supabase = createClient();
    const origin = headers().get('origin');

    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) throw error;

    console.log({ data });

    revalidatePath('/');
    // redirect('/');
    redirect(data.url);
  });
