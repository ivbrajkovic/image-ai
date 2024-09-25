'use server';

import { revalidatePath } from 'next/cache';

import { authActionClient } from '@/lib/safe-action';
import { createClient } from '@/supabase/server';

export const createLayer = authActionClient
  .metadata({ actionName: 'createLayer' })
  .action(async ({ ctx: { user } }) => {
    const supabase = createClient();

    // insert empty layer
    const { data, error } = await supabase
      .from('layers')
      .insert([
        {
          user_id: user.id,
          public_id: '',
          name: 'New Layer',
          url: '',
          width: 0,
          height: 0,
          format: '',
        },
      ])
      .select('id');

    console.log({ data, error });

    if (error) throw new Error('Error creating layer', { cause: error });

    revalidatePath('/');

    return data;
  });
