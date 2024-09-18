'use server';

import { authActionClient } from '@/lib/safe-action';
import { Cloudinary } from '@/services/cloudinary';
import { cartoonifySchema } from '@/services/cloudinary/validations';

export const cartoonify = authActionClient
  .metadata({ actionName: 'cartoonify' })
  .schema(cartoonifySchema)
  .action(({ parsedInput }) => {
    return Cloudinary.instance.cartoonify(parsedInput);
  });
