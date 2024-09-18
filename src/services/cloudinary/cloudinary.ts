import { UploadApiResponse, v2 } from 'cloudinary';
import pipe from 'lodash/fp/pipe';

import {
  BgRemoveProps,
  bgReplaceProps,
  GenRemoveProps,
  UploadImageProps,
} from '@/services/cloudinary/validations';
import {
  readyToFetchFromUrl,
  createGenerator,
  withInterval,
  withRetrial,
} from '@/utils/generators';

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

  async uploadImage(props: UploadImageProps) {
    const arrayBuffer = await props.image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<UploadApiResponse>(async (resolve, reject) => {
      this.#cloudinary.uploader
        .upload_stream(
          // { upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET },
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
        )
        .end(buffer);
    });
  }

  async genRemove(props: GenRemoveProps) {
    const parts = props.url.split('/upload/');
    const removeUrl = `${parts[0]}/upload/e_gen_remove:${props.prompt}/${parts[1]}`;

    const pipeline = pipe(
      createGenerator(readyToFetchFromUrl),
      withInterval(1000),
      withRetrial(20),
    );

    for await (const result of pipeline(removeUrl)) {
      if (result instanceof Error)
        throw new Error(`Image processing failed: ${result.message}.`);
      if (result) return { url: removeUrl };
    }

    throw new Error('Image processing failed: Max retries exceeded.');
  }

  async bgRemove(props: BgRemoveProps) {
    const urlWithReplacedFormat = props.url.replace(props.format, 'png');
    const urlParts = urlWithReplacedFormat.split('/upload/');
    const bgRemoveUrl = `${urlParts[0]}/upload/e_background_removal/${urlParts[1]}`;

    const pipeline = pipe(
      createGenerator(readyToFetchFromUrl),
      withInterval(1000),
      withRetrial(20),
    );

    for await (const result of pipeline(bgRemoveUrl)) {
      if (result instanceof Error)
        throw new Error(`Image processing failed: ${result.message}.`);
      if (result) return { url: bgRemoveUrl };
    }

    throw new Error('Image processing failed: Max retries exceeded.');
  }

  async bgReplace(props: bgReplaceProps) {
    const urlParts = props.url.split('/upload/');
    const bgReplaceUrl = props.prompt
      ? `${urlParts[0]}/upload/e_gen_background_replace:prompt_${props.prompt}/${urlParts[1]}`
      : `${urlParts[0]}/upload/e_gen_background_replace/${urlParts[1]}`;

    const pipeline = pipe(
      createGenerator(readyToFetchFromUrl),
      withInterval(1000),
      withRetrial(60),
    );

    for await (const result of pipeline(bgReplaceUrl)) {
      if (result instanceof Error)
        throw new Error(`Image processing failed: ${result.message}.`);
      if (result) return { url: bgReplaceUrl };
    }

    throw new Error('Image processing failed: Max retries exceeded.');
  }
}
