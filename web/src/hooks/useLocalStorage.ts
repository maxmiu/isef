import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const getInitialValue = (): T => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) as T : initialValue;
    }

    const [value, setValue] = useState<T>(getInitialValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value])

    return [value, setValue] as const;
}