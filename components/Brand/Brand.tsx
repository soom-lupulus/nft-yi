'use client'
import React from 'react'
import Image from 'next/image'

//INTERNAL IMPORT
import Style from './Brand.module.css'
import images from '@/img'
import { Button } from '@/components'
import { FaYinYang } from "react-icons/fa";

const Brand = () => {
    return (
        <div className={Style.Brand}>
            <div className={Style.Brand_box}>
                <div className={Style.Brand_box_left}>
                    {/* <FaYinYang size={100} /> */}
                    <h1>Earn free service charge with Yi</h1>
                    <p>A creative agency that lead and inspire.</p>

                    {/* <div className={Style.Brand_box_left_btn}>
                        <Button btnName='Create' handleClick={() => {}} />
                        <Button btnName='Discover' handleClick={() => {}} />
                    </div> */}
                </div>
                <div className={Style.Brand_box_right}>
                    <Image
                        src={images.landscape}
                        alt='brand logo'
                        width={800}
                        height={600}
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

export default Brand
