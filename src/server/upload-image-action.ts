'use server';

import { z } from 'zod';

import { actionClient } from '@/lib/safe-action';
import { Cloudinary } from '@/services/cloudinary';

const formData = z
  .object({ formData: z.instanceof(FormData) })
  .refine(({ formData }) => {
    return z
      .object({ image: z.instanceof(File) })
      .parse(Object.fromEntries(formData));
    // .safeParse(Object.fromEntries(formData));
  });

const handleError = (error: unknown) => ({ error });

export const uploadImageAction = actionClient
  .schema(formData)
  .action(({ parsedInput: { formData } }) => {
    const image = formData.get('image') as File;
    return Cloudinary.instance.uploadImage(image).catch(handleError);
  });
