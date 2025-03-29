
export const ObjectUtils = {
    deepClone<T>(object: T) : T {
        return JSON.parse(JSON.stringify(object));
    }
}