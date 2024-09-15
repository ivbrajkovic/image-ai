'use server';

import { actionClient } from '@/lib/safe-action';
import { Cloudinary } from '@/services/cloudinary';
import { bgReplaceSchema } from '@/services/validations';

export const bgReplace = actionClient
  .metadata({ actionName: 'bgReplace' })
  .schema(bgReplaceSchema)
  .action(({ parsedInput }) => {
    return Cloudinary.instance.bgReplace(parsedInput);
  });
