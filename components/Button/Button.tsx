import React from 'react'
import Style from './Button.module.css'

type IButtonTypes = {
    btnName: string
    handleClick: () => void
}

const Button = ({ btnName, handleClick }: IButtonTypes) => {
    return (
        <div className={Style.box}>
            <button className={Style.button} onClick={() => handleClick()}>
                {btnName}
            </button>
        </div>
    )
}

export default Button
