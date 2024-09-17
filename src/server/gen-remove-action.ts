'use server';

import { actionClient } from '@/lib/safe-action';
import { Cloudinary } from '@/services/cloudinary';
import { genRemoveSchema } from '@/services/cloudinary/validations';

export const genRemove = actionClient
  .metadata({ actionName: 'genRemove' })
  .schema(genRemoveSchema)
  .action(({ parsedInput }) => {
    return Cloudinary.instance.genRemove(parsedInput);
  });
