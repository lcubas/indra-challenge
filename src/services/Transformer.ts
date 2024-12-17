type TransformationMappings<T> = Record<keyof T, string>;

export class Transformer<T> {
  private mappings: TransformationMappings<T>;

  constructor(mappings: TransformationMappings<T>) {
    this.mappings = mappings;
  }

  transform(item: T | T[]) {
    if (Array.isArray(item)) {
      return this.transformArray(item);
    }

    return this.applyMappings(item);
  }

  transformArray(items: T[]) {
    return items.map((item) => this.applyMappings(item));
  }

  private applyMappings(item: T) {
    const result = {};
    for (const [inputKey, outputKey] of Object.entries<string>(this.mappings)) {
      result[outputKey] = item[inputKey];
    }

    return result;
  }
}
