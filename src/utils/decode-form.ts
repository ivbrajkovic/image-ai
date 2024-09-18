import { z } from 'zod';

export const decodeForm = <Schema extends z.ZodTypeAny>(
  formData: FormData,
  schema: Schema,
) => {
  return schema.parse(Object.fromEntries(formData)) as z.infer<Schema>;
};
