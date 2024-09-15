'use server';

import { actionClient } from '@/lib/safe-action';
import { Cloudinary } from '@/services/cloudinary';
import { bgRemoveSchema } from '@/services/validations';

export const bgRemove = actionClient
  .metadata({ actionName: 'bgRemove' })
  .schema(bgRemoveSchema)
  .action(({ parsedInput }) => {
    return Cloudinary.instance.bgRemove(parsedInput);
  });
