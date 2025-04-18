import { RefObject, useEffect } from 'react'

type Handler = (event: MouseEvent | TouchEvent) => void

export default function useClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T | null>,
    handler: Handler
) {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            // 如果点击的是ref元素内部，则不处理
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return
            }
            handler(event)
        }

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, handler])
}