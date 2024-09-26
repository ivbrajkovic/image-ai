/**
 * Increments the number in the filename by 1 and returns the updated filename.
 * If the filename does not contain a number, it appends the number 1 to the filename.
 *
 * @param {string} fileName - The original filename.
 * @param {string} delimiter - The delimiter between the filename and the number.
 * @returns {string} The updated filename.
 */
export const incrementFilenameNumber = (
  fileName: string | null | undefined,
  delimiter: string = '',
): string => {
  fileName = fileName ?? 'file';
  const numberMatch = fileName.match(/(\d+)$/);
  const number = numberMatch ? Number(numberMatch[0]) + 1 : 1;
  const newName = numberMatch
    ? fileName.replace(/(\d+)$/, String(number))
    : `${fileName}${delimiter}${number}`;
  return newName;
};
