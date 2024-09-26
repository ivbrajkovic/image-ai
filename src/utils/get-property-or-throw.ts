export const ensurePropertyExists = <
  const T extends Record<string, unknown> | null,
  O extends NonNullable<T>,
  U extends keyof NonNullable<T> & string,
>(
  obj: T,
  prop: U,
): { [K in U]: NonNullable<O[U]> } => {
  if (!obj) throw new Error('Object is null.');
  if (!(prop in obj)) throw new Error(`Property "${prop}" not found.`);
  if (!obj[prop]) throw new Error(`Property "${prop}" is null.`);
  return { [prop]: obj[prop] } as { [K in U]: NonNullable<O[U]> };
};
