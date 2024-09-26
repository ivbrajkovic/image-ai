'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { authActionClient } from '@/lib/safe-action';
import { createClient } from '@/supabase/server';

const schema = z.object({
  id: z.number(),
});

export const deleteLayerAction = authActionClient
  .metadata({ actionName: 'deleteLayer' })
  .schema(schema)
  .action(async ({ parsedInput }) => {
    const supabase = createClient();

    const { error } = await supabase
      .from('layers')
      .delete()
      .eq('id', parsedInput.id);

    if (error) throw new Error('Error updating layer', { cause: error });

    revalidatePath('/');
  });
