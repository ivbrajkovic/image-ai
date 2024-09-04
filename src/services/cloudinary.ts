import { UploadApiResponse, v2 } from 'cloudinary';

type UploadResult =
  | { success: UploadApiResponse; error?: never }
  | { error: string; success?: never };

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

  uploadImage(file: File): Promise<UploadResult> {
    return new Promise<UploadResult>(async (resolve, reject) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadStream = this.#cloudinary.uploader.upload_stream(
        { upload_preset: process.env.CLOUDINARY_NAME },
        (error, result) => {
          if (error || !result)
            return reject({ error: 'Something went wrong!' });
          return resolve({ success: result });
        },
      );

      uploadStream.end(buffer);
    });
  }
}
