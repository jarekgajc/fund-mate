
export const ArrayUtils = {
    addItem<T>(array: T[], item: T): T[] {
        const result: T[] = [...array];
        result.push(item);
        return result;
    },
    updateItem<T>(array: T[], index: number, item: T): T[] {
        const result: T[] = [...array];
        result[index] = item;
        return result;
    },
    removeItem<T>(array: T[], index: number): T[] {
        const result: T[] = [...array];
        result.splice(index, 1);
        return result;
    }
}