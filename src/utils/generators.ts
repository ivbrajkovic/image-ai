import { wait } from '@/utils/wait';

type FnAsync<T, R> = (args: T) => Promise<R>;

export function createGenerator<T, R>(callback: FnAsync<T, R | Error>) {
  return async function* createGenerator(args: T) {
    try {
      while (true) yield await callback(args);
    } catch (error) {
      yield error as Error;
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

export const canFetchFromUrl = (url: string) =>
  fetch(url)
    .then((response) => response.ok)
    .catch(() => false);
