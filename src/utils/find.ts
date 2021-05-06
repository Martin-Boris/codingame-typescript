export default function find<T>(source: T[], predicate: (value: T) => boolean): T | undefined {
  for (const value of source) {
    if (predicate(value)) {
      return value;
    }
  }
}
