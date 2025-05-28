'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import Style from './error.module.css'
import { Button } from '@/components'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className={Style.errWrapper}>
            <div>
                <h2>啊哦😯，很抱歉你发现了一个bug，我会抓紧修复</h2>
                <h3>点击下方按钮尝试继续使用⬇️⬇️⬇️</h3>
            </div>

            <Button btnName='Try again' handleClick={() => reset()}></Button>
        </div>
    )
}
