import { useEffect, useState } from "react";

export function useLocalStorage(key: string) {
    const [state, setState] = useState<String | null>(null);

    useEffect(() => {
        setState(localStorage.getItem(key));
    }, [key]);

    const setWithLocalStorage = (nextState: String | null) => {
        setState(nextState);
    };

    return [state, setWithLocalStorage];
}