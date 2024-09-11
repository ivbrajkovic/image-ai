/* eslint-disable @typescript-eslint/no-explicit-any */

type SplitFilename<
  T extends string,
  filename extends string = '',
> = T extends `${infer R}.${infer L}`
  ? SplitFilename<L, filename extends '' ? R : `${filename}.${R}`>
  : [filename, `.${T}`];

/**
 * Splits a filename into its name and extension.
 *
 * @param filename - The filename to split.
 * @returns Tuple containing the name and extension of the filename.
 */
export const splitFilename = <TName extends string>(
  filename: TName,
): SplitFilename<TName> => {
  const lastDotIndex = filename.lastIndexOf('.');

  if (lastDotIndex === -1) return [filename, ''] as any;

  const name = filename.slice(0, lastDotIndex);
  const extension = filename.slice(lastDotIndex + 1);

  return [name, extension] as any;
};
