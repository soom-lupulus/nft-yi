import React from 'react'
import Image from 'next/image'
import { BsCircleFill } from 'react-icons/bs'
//
import Style from './Category.module.css'
import images from '@/img'

const Category = () => {
    const CategoryArray = [
        images.creatorbackground1,
        images.creatorbackground2,
        images.creatorbackground3,
        images.creatorbackground4,
        images.creatorbackground5,
        images.creatorbackground6,
    ]
    return (
        <div className={Style.box_category}>
            <div className={Style.category}>
                {CategoryArray.map((el, i) => (
                    <div className={Style.category_box} key={i + 1}>
                        <Image
                            src={el}
                            alt='Background image'
                            width={350}
                            height={150}
                        />
                        <div className={Style.category_box_title}>
                            <span>
                                <BsCircleFill />
                            </span>
                            <div className={Style.category_box_title_info}>
                                <h4>Entertainment</h4>
                                <small>1995 NFTS</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Category
