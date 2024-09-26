'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { authActionClient } from '@/lib/safe-action';
import { createClient } from '@/supabase/server';

// create sod schema based on the Update type
const schema = z.object({
  public_id: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  width: z.number().nullable().optional(),
  height: z.number().nullable().optional(),
  format: z.string().nullable().optional(),
});

export const updateLayerAction = authActionClient
  .metadata({
    actionName: 'updateLayer',
  })
  .schema(schema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('layers')
      .update({ ...parsedInput, user_id: user.id })
      .select('id');

    if (error) throw new Error('Error updating layer', { cause: error });

    revalidatePath('/');
    return data;
  });
