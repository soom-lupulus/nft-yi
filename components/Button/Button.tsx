import React from 'react'
import Style from './Button.module.css'

type IButtonTypes = {
    btnName: string
    handleClick: () => void
    classStyle?: string
}

const Button = ({ btnName, handleClick, classStyle }: IButtonTypes) => {
    return (
        <div className={`${Style.box} ${classStyle}`}>
            <button className={Style.button} onClick={() => handleClick()}>
                {btnName}
            </button>
        </div>
    )
}

export default Button
