export class MapUtil {

    /**
     * Get a value from a map.
     * If the key is not present in the map, return the given defaultValue.
     * @param map
     * @param key
     * @param defaultValue
     */
    static getOrDefault<T>(map: Map<unknown, T>, key: unknown, defaultValue: T): T {
        return map.has(key) ? map.get(key)!! : defaultValue;
    }
}
