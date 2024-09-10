export type Result<TError, TData> =
  | { success: true; data: TData }
  | { success: false; error: TError };

export const successResult = <T>(data: T): Result<never, T> => {
  return { success: true, data };
};

export const errorResult = <T>(error: T): Result<T, never> => {
  // Log error in development and server environments
  if (typeof window === 'undefined') console.error(error);
  else if (process.env.NODE_ENV === 'development') console.error(error);

  return { success: false, error };
};
