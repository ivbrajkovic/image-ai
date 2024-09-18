'use server';

import { authActionClient } from '@/lib/safe-action';
import { Cloudinary } from '@/services/cloudinary';
import { bgReplaceSchema } from '@/services/cloudinary/validations';

export const bgReplace = authActionClient
  .metadata({ actionName: 'bgReplace' })
  .schema(bgReplaceSchema)
  .action(({ parsedInput }) => {
    return Cloudinary.instance.bgReplace(parsedInput);
  });
