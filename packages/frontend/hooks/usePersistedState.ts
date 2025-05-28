import { useEffect, useState } from "react"

export default function usePersistedState<T>(key: string, defaultValue: T):
    [T, React.Dispatch<React.SetStateAction<T>>] {
    const [persistedState, setInitialState] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return defaultValue;
        }
        const state = window.localStorage.getItem(key)
        return state ? JSON.parse(state) : defaultValue
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(persistedState));
        }
    }, [persistedState, key])

    return [persistedState, setInitialState]
}