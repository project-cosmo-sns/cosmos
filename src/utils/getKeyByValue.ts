export default function getKeyByValue<T extends Record<string, D>, D>(
  object: T,
  value: D,
): keyof T | undefined {
  return Object.keys(object).find((key) => object[key as keyof T] === value);
}
