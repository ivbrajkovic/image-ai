import { UploadApiResponse, v2 } from 'cloudinary';
import pipe from 'lodash/fp/pipe';

import {
  canFetchFromUrl,
  createGenerator,
  withInterval,
  withRetrial,
} from '@/utils/generators';

export type UploadImageProps = { image: File };
export type GetRemoveProps = { prompt: string; activeImageUrl: string };

export class Cloudinary {
  static #instance: Cloudinary;
  #cloudinary: typeof v2;

  public static get instance(): Cloudinary {
    if (!this.#instance) this.#instance = new Cloudinary();
    return this.#instance;
  }

  private constructor(cloudinary = v2) {
    this.#cloudinary = cloudinary;
    this.#cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
  }

  uploadImage(props: UploadImageProps) {
    return new Promise<UploadApiResponse>(async (resolve, reject) => {
      const arrayBuffer = await props.image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadStream = this.#cloudinary.uploader.upload_stream(
        { upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET },
        (error, result) => {
          if (error) {
            const errorMessage = `Image upload failed: ${error?.message}`;
            console.error(errorMessage, error);
            return reject(new Error(errorMessage));
          }

          if (!result) {
            const errorMessage = 'Image upload failed: No result received';
            console.error(errorMessage);
            return reject(new Error(errorMessage));
          }

          return resolve(result);
        },
      );

      uploadStream.end(buffer);
    });
  }

  async genRemove(props: GetRemoveProps) {
    const parts = props.activeImageUrl.split('/upload/');
    const removeUrl = `${parts[0]}/upload/e_gen_remove:${props.prompt}/${parts[1]}`;

    const pipeline = pipe(
      createGenerator(canFetchFromUrl),
      withInterval(500),
      withRetrial(5),
    );

    for await (const result of pipeline('https://www.some-other-url.com')) {
      if (result instanceof Error)
        throw new Error(`Image processing failed: ${result.message}.`);
      if (result) return { url: removeUrl };
    }

    throw new Error('Image processing failed: Max retries exceeded.');
  }
}
