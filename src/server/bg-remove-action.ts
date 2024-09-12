'use server';

import { z } from 'zod';

import { actionClient } from '@/lib/safe-action';
import { Cloudinary } from '@/services/cloudinary';

const schema = z.object({
  format: z.string(),
  url: z.string(),
});

export const bgRemove = actionClient
  .metadata({ actionName: 'bgRemove' })
  .schema(schema)
  .action(({ parsedInput }) => {
    return Cloudinary.instance.bgRemove(parsedInput);
  });
