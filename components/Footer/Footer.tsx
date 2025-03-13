import React from 'react'
import Image from 'next/image'
import {
    TiSocialFacebook,
    TiSocialLinkedin,
    TiSocialTwitter,
    TiSocialYoutube,
    TiSocialInstagram,
    TiArrowSortedDown,
    TiArrowSortedUp,
} from 'react-icons/ti'
import { RiSendPlaneFill } from 'react-icons/ri'
//
import Style from './Footer.module.css'
import images from '@/img'
import { Discover, HelpCenter } from '../NavBar'

const Footer = () => {
    return (
        <div className={Style.footer}>
            <div className={Style.footer_box}>
                <div className={Style.footer_box_social}>
                    <Image
                        src={images.logo}
                        alt='footer logo'
                        height={100}
                        width={100}
                    ></Image>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Ad aperiam corrupti molestias magnam sequi numquam
                        repellendus inventore deserunt voluptates sunt esse
                        placeat, hic, magni debitis qui vero doloremque tempore
                        animi.
                    </p>
                    <div className={Style.footer_social}>
                        <a href='#'>
                            <TiSocialFacebook />
                        </a>
                        <a href='#'>
                            <TiSocialLinkedin />
                        </a>
                        <a href='#'>
                            <TiSocialTwitter />
                        </a>
                        <a href='#'>
                            <TiSocialYoutube />
                        </a>
                        <a href='#'>
                            <TiSocialInstagram />
                        </a>
                    </div>
                </div>

                <div className={Style.footer_box_discover}>
                    <h3>Discover</h3>
                    <Discover />
                </div>

                <div className={Style.footer_box_help}>
                    <h3>Help Center</h3>
                    <HelpCenter />
                </div>

                <div className={Style.subscribe}>
                    <h3>Subscribe</h3>

                    <div className={Style.subscribe_box}>
                        <input type='email' placeholder='Enter ur email' />
                        <RiSendPlaneFill className={Style.subscribe_box_send} />
                    </div>
                    <div className={Style.subscribe_box_info}>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Esse explicabo quod necessitatibus natus
                            consequatur neque quae dolorum, modi, hic ducimus
                            aperiam, facilis ipsa velit tempore repellat! Ut
                            sint saepe porro.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
