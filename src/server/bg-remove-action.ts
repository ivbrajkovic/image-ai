'use server';

import { authActionClient } from '@/lib/safe-action';
import { Cloudinary } from '@/services/cloudinary';
import { bgRemoveSchema } from '@/services/cloudinary/validations';

export const bgRemove = authActionClient
  .metadata({ actionName: 'bgRemove' })
  .schema(bgRemoveSchema)
  .action(({ parsedInput }) => {
    return Cloudinary.instance.bgRemove(parsedInput);
  });
