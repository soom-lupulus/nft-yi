import React from 'react'
import Image from 'next/image'
import { RiSendPlaneFill } from 'react-icons/ri'

//
import Style from './Subscribe.module.css'
import images from '@/img'
import Button from '../Button/Button'

const Subscribe = () => {
    return (
        <div className={Style.subscribe}>
            <div className={Style.subscribe_box}>
                <div className={Style.subscribe_box_left}>
                    <h2>Never miss a drop</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Blanditiis dolor magni fugiat incidunt dicta
                        praesentium minus suscipit, nemo provident repellat
                        magnam et fugit dolores rerum nam. Laborum ab eveniet
                        aperiam.
                    </p>
                    <div className={Style.subscribe_box_left_box}>
                        <span>01</span>
                        <small>Get more discount</small>
                    </div>
                    <div className={Style.subscribe_box_left_box}>
                        <span>02</span>
                        <small>Get premium magazines</small>
                    </div>
                    <div className={Style.subscribe_box_left_input}>
                        <input type='email' placeholder='Enter your email' />
                        <RiSendPlaneFill
                            className={Style.subscribe_box_left_input_icon}
                        />
                    </div>
                </div>
                <div className={Style.subscribe_box_right}>
                    <Image
                        src={images.update}
                        alt='get update'
                        width={600}
                        height={800}
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Subscribe
