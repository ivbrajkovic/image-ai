'use server';

import { authActionClient } from '@/lib/safe-action';
import { Cloudinary } from '@/services/cloudinary';
import { genRemoveSchema } from '@/services/cloudinary/validations';

export const genRemove = authActionClient
  .metadata({ actionName: 'genRemove' })
  .schema(genRemoveSchema)
  .action(({ parsedInput }) => {
    return Cloudinary.instance.genRemove(parsedInput);
  });
