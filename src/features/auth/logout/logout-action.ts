'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { actionClient } from '@/lib/safe-action';
import { createClient } from '@/supabase/server';

export const logoutAction = actionClient
  .metadata({ actionName: 'logout' })
  .action(async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    revalidatePath('/login');
    redirect('/login');
  });
