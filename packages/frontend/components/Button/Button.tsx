'use client'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Style from './Button.module.css'
import { ClipLoader } from 'react-spinners'

type IButtonTypes = {
    btnName: string
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    classStyle?: string
}

export type ButtonHandle = {
    loading: boolean,
    setLoading: (loading: boolean) => void
}

const Button = forwardRef<ButtonHandle, IButtonTypes>(
    ({ btnName, handleClick, classStyle }, ref) => {
        const [loading, setLoading] = useState(false)
        useImperativeHandle(ref, () => {
            return {
                loading,
                setLoading,
            }
        }, [])
        return (
            <div className={`${Style.box} ${classStyle}`}>
                <button className={Style.button} onClick={handleClick} disabled={loading}>
                    {loading ? <ClipLoading /> : btnName}
                </button>
            </div>
        )
    },
)


const ClipLoading = () => {
    return (
        <div>
            <ClipLoader
                cssOverride={{ margin: 'auto' }}
                size={20}
                aria-label='Loading Spinner'
                data-testid='loader'
            />
        </div>
    )
}

Button.displayName = 'Button';

export default Button
