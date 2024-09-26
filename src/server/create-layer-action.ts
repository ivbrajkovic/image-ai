'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { authActionClient } from '@/lib/safe-action';
import { TablesInsert } from '@/supabase/database.types';
import { createClient } from '@/supabase/server';

// create sod schema based on the Insert type
const schema = z.object({
  public_id: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  width: z.number().nullable().optional(),
  height: z.number().nullable().optional(),
  format: z.string().nullable().optional(),
});

export const createLayerAction = authActionClient
  .metadata({
    actionName: 'createLayer',
  })
  .schema(schema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const supabase = createClient();

    const defaultLayer: Omit<TablesInsert<'layers'>, 'user_id'> = {
      public_id: '',
      name: 'New Layer',
      url: '',
      width: 0,
      height: 0,
      format: '',
    };

    const { data, error } = await supabase
      .from('layers')
      .insert([{ ...defaultLayer, ...parsedInput, user_id: user.id }])
      .select('*');

    if (error) throw new Error('Error creating layer', { cause: error });

    revalidatePath('/');
    return data;
  });
