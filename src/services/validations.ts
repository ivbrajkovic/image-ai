import { z } from 'zod';
import { zfd } from 'zod-form-data';

export type UploadImageProps = z.infer<typeof UploadImageSchema>;
export const UploadImageSchema = zfd.formData({
  image: zfd.file(),
});

export type GenRemoveProps = z.infer<typeof genRemoveSchema>;
export const genRemoveSchema = z.object({
  prompt: z.string(),
  url: z.string(),
});

export type BgRemoveProps = z.infer<typeof bgRemoveSchema>;
export const bgRemoveSchema = z.object({
  format: z.string(),
  url: z.string(),
});

export type bgReplaceProps = z.infer<typeof bgReplaceSchema>;
export const bgReplaceSchema = z.object({
  prompt: z.string(),
  url: z.string(),
});
