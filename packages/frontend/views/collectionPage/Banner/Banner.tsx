import React from 'react'
import Image from 'next/image'

//INTERNAL IMPORT
import Style from './Banner.module.css'

const Banner = ({ bannerImage }) => {
    return (
        <div className={Style.banner}>
            <div className={Style.banner_img}>
                <Image
                    src={bannerImage}
                    alt='background'
                    width={1600}
                    height={300}
                    style={{
                        width: '100%',
                    }}
                />
            </div>

            <div className={Style.banner_img_mobile}>
                <Image
                    src={bannerImage}
                    alt='background'
                    width={1600}
                    height={900}
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                />
            </div>
        </div>
    )
}

export default Banner
