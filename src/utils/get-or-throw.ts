/**
 * Retrieves the value if it is not null or undefined; otherwise, throws an error.
 *
 * @param value - The value to check.
 * @param message - The error message to throw if the value is null or undefined (optional).
 * @returns The value if it is not null or undefined.
 * @throws {Error} If the value is null or undefined.
 */
export const ensureValue = <T>(
  value: T,
  message = 'Value is null or undefined.',
) => {
  if (value === null || value === undefined) throw new Error(message);
  return value;
};
