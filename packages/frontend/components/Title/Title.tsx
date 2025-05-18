import React from 'react'
import Image from 'next/image'
import { RiSendPlaneFill } from 'react-icons/ri'
//
import Style from './Title.module.css'

type ITitlePropsType = {
    heading: string
    paragraph: string
}

const Title = ({ heading, paragraph }: ITitlePropsType) => {
    return (
        <div className={Style.title}>
            <div className={Style.title_box}>
                <h2>{heading}</h2>
                <p>{paragraph}</p>
            </div>
        </div>
    )
}

export default Title
