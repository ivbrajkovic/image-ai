'use server';

import { zfd } from 'zod-form-data';

import { actionClient } from '@/lib/safe-action';
import { Cloudinary } from '@/services/cloudinary';

const schema = zfd.formData({
  image: zfd.file(),
});

export const uploadImageAction = actionClient
  .metadata({ actionName: 'uploadImage' })
  .schema(schema)
  .action(({ parsedInput }) => {
    return Cloudinary.instance.uploadImage(parsedInput);
  });
