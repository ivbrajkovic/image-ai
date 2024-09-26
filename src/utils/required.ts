export function required(message = 'Missing parameter'): never {
  throw new Error(message);
}
