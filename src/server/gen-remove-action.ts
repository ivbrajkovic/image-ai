'use server';

import { z } from 'zod';

import { actionClient } from '@/lib/safe-action';
import { Cloudinary } from '@/services/cloudinary';

const schema = z.object({
  prompt: z.string(),
  activeImageUrl: z.string(),
});

export const genRemove = actionClient
  .metadata({ actionName: 'genRemove' })
  .schema(schema)
  .action(({ parsedInput }) => {
    return Cloudinary.instance.genRemove(parsedInput);
  });
