'use server';

import { decodeForm } from '@/lib/decode-form';
import { actionClient } from '@/lib/safe-action';
import { Cloudinary } from '@/services/cloudinary';
import { Cloud } from 'lucide-react';
import { z } from 'zod';

const formData = z
  .object({
    formData: z.instanceof(FormData),
  })
  .refine(({ formData }) => {
    return z
      .object({ image: z.instanceof(File) })
      .safeParse(Object.fromEntries(formData));
  });

export const uploadImage = actionClient
  .schema(formData)
  .action(async ({ parsedInput: { formData } }) => {
    const image = formData.get('image') as File;

    try {
      const res = await Cloudinary.instance.uploadImage(image);
    } catch (error) {}
  });
