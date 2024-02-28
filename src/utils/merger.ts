export function merger<T, K extends string, V>(obj: T, key: K, value: V): T & Record<K, V> {
    return {
        ...obj,
        [key]: value,
    } as T & Record<K, V>;
}