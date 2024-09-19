import { wait } from '@/utils/wait';

export class GeneratorError extends Error {
  static from(error: unknown) {
    if (error instanceof GeneratorError) return error;
    if (error instanceof Error) return new GeneratorError(error.message);
    if (typeof error === 'string') return new GeneratorError(error);

    if (typeof error === 'object' && error !== null) {
      try {
        // Attempt to stringify the object, handling potential errors
        return new GeneratorError(JSON.stringify(error));
      } catch (jsonError) {
        // If JSON.stringify fails (due to circular reference or other issue), return a more informative message
        return new GeneratorError(
          `An error occurred while serializing the object: ${(jsonError as Error).message}`,
        );
      }
    }

    const unsupportedType = typeof error;
    return unsupportedType === 'function' ||
      unsupportedType === 'boolean' ||
      unsupportedType === 'number' ||
      unsupportedType === 'bigint' ||
      unsupportedType === 'symbol'
      ? new GeneratorError(`Unsupported error type: ${unsupportedType}`)
      : new GeneratorError('An unknown error occurred.');
  }

  constructor(message: string) {
    super(message);
    this.name = 'GeneratorError';
    Error.captureStackTrace(this, GeneratorError);
  }

  prefixMessage(prefix: string) {
    if (!this.message.startsWith(prefix))
      this.message = `${prefix}: ${this.message}`;
    return this;
  }
}

type GeneratorResult<R> =
  | { data: R; error?: never }
  | { data?: never; error: GeneratorError };

export function createGenerator<T, R>(callback: (args: T) => Promise<R>) {
  return async function* createGenerator(
    args: T,
  ): AsyncGenerator<GeneratorResult<R>> {
    try {
      while (true) yield { data: await callback(args) };
    } catch (error) {
      yield { error: GeneratorError.from(error) };
    }
  };
}

export function withInterval(interval: number) {
  return async function* <T>(generator: AsyncGenerator<T>) {
    for await (const value of generator) {
      yield value;
      await wait(interval);
    }
  };
}

export function withRetrial(maxRetries: number) {
  return async function* <T>(generator: AsyncGenerator<T>) {
    for await (const value of generator) {
      yield value;
      if (--maxRetries <= 0) break;
    }
  };
}

export const readyToFetchFromUrl = (
  url: string,
): Promise<{ isReadyToFetch: boolean }> =>
  fetch(url).then((response) => {
    if (response.ok) return { isReadyToFetch: true };
    if (response.status === 423) return { isReadyToFetch: false };
    throw new Error(response.statusText);
  });
// .catch((error) => {
//   throw new Error('Failed to fetch: ' + error.message);
// });
