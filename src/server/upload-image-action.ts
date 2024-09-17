'use server';

import { actionClient } from '@/lib/safe-action';
import { Cloudinary } from '@/services/cloudinary';
import { UploadImageSchema } from '@/services/cloudinary/validations';

export const uploadImageAction = actionClient
  .metadata({ actionName: 'uploadImage' })
  .schema(UploadImageSchema)
  .action(({ parsedInput }) => {
    return Cloudinary.instance.uploadImage(parsedInput);
  });
