import { UploadApiResponse, v2 } from 'cloudinary';
import pipe from 'lodash/fp/pipe';

import {
  BgRemoveProps,
  bgReplaceProps,
  CartoonifyProps,
  GenRemoveProps,
  UploadImageProps,
} from '@/services/cloudinary/validations';
import {
  readyToFetchFromUrl,
  createGenerator,
  withInterval,
  withRetrial,
} from '@/utils/generators';

const RETRIAL_LIMIT = 60;
const RETRIAL_INTERVAL = 1000;

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

  async #waitForImageReady(url: string) {
    const imageFetchPipeline = pipe(
      createGenerator(readyToFetchFromUrl),
      withInterval(RETRIAL_INTERVAL),
      withRetrial(RETRIAL_LIMIT),
    );

    for await (const { error, data } of imageFetchPipeline(url)) {
      if (error) throw error.prefixMessage(`Image processing failed`);
      if (data.isReadyToFetch) return { url };
    }

    throw new Error('Image processing failed: Max retries exceeded.');
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

  genRemove(props: GenRemoveProps) {
    const urlSegments = props.url.split('/upload/');
    const processedImageUrl = `${urlSegments[0]}/upload/e_gen_remove:${props.prompt}/${urlSegments[1]}`;
    return this.#waitForImageReady(processedImageUrl);
  }

  bgRemove(props: BgRemoveProps) {
    const urlWithPngFormat = props.url.replace(props.format, 'png');
    const urlSegments = urlWithPngFormat.split('/upload/');
    const processedImageUrl = `${urlSegments[0]}/upload/e_background_removal/${urlSegments[1]}`;
    return this.#waitForImageReady(processedImageUrl);
  }

  bgReplace(props: bgReplaceProps) {
    const urlSegments = props.url.split('/upload/');
    const processedImageUrl = props.prompt
      ? `${urlSegments[0]}/upload/e_gen_background_replace:prompt_${props.prompt}/${urlSegments[1]}`
      : `${urlSegments[0]}/upload/e_gen_background_replace/${urlSegments[1]}`;
    return this.#waitForImageReady(processedImageUrl);
  }

  cartoonify(props: CartoonifyProps) {
    const urlSegments = props.url.split('/upload/');
    const processedImageUrl = `${urlSegments[0]}/upload/e_cartoonify/${urlSegments[1]}`;
    return this.#waitForImageReady(processedImageUrl);
  }
}
