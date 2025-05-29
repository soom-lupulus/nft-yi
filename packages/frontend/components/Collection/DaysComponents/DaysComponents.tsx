import React from 'react'
import Image from 'next/image'
import { MdVerified } from 'react-icons/md'

//INTERNAL IMPORT
import Style from './DaysComponents.module.css'
import images from '@/img'
import { ImageType } from '@/typings/global'

type IDaysComponentsPropsType = {
    el: ImageType
    i: number
}
const DaysComponents = ({ el, i }: IDaysComponentsPropsType) => {
    return (
        <div className={Style.daysComponent}>
            <div className={Style.daysComponent_box}>
                <div className={Style.daysComponent_box_img}>
                    <Image
                        src={el.background}
                        className={Style.daysComponent_box_img_img}
                        alt='profile background'
                        width={500}
                        height={300}
                    />
                </div>

                <div className={Style.daysComponent_box_profile}>
                    <Image
                        src={images.creatorbackground2}
                        alt='profile'
                        width={200}
                        height={200}
                        className={Style.daysComponent_box_img_1}
                    />
                    <Image
                        src={images.creatorbackground2}
                        alt='profile'
                        width={200}
                        height={200}
                        className={Style.daysComponent_box_img_2}
                    />
                    <Image
                        src={images.creatorbackground2}
                        alt='profile'
                        width={200}
                        height={200}
                        className={Style.daysComponent_box_img_3}
                    />
                </div>

                <div className={Style.daysComponent_box_title}>
                    <h2>Amazing Collection</h2>
                    <div className={Style.daysComponent_box_title_info}>
                        <div
                            className={
                                Style.daysComponent_box_title_info_profile
                            }
                        >
                            <Image
                                src={el.user}
                                alt='profile'
                                width={30}
                                height={30}
                                className={
                                    Style.daysComponent_box_title_info_profile_img
                                }
                            />

                            <p>
                                Creator
                                <span>
                                    ygg
                                    <small>
                                        <MdVerified />
                                    </small>
                                </span>
                            </p>
                        </div>

                        <div
                            className={Style.daysComponent_box_title_info_price}
                        >
                            <small>1.255 ETH</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DaysComponents
