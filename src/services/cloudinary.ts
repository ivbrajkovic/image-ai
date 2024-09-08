import { UploadApiResponse, v2 } from 'cloudinary';

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

  uploadImage(file: File) {
    return new Promise<UploadApiResponse>(async (resolve, reject) => {
      const arrayBuffer = await file.arrayBuffer();
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
}
