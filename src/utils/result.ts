export type Result<TError, TData> =
  | { success: true; data: TData }
  | { success: false; error: TError };

export const successResult = <T>(data: T): Result<never, T> => ({
  success: true,
  data,
});

export const errorResult = <T>(error: T): Result<T, never> => ({
  success: false,
  error,
});
