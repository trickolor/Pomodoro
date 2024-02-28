export function generateRandomString(length: number = 10): string {
  const str = Array.from({ length }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join('');
  return str;
}