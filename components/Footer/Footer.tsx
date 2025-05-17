'use client'
import React from 'react'
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
import { Discover, HelpCenter } from '../NavBar'
import { FaYinYang } from 'react-icons/fa'
import { expectFunc } from '@/utils'

const Footer = () => {
    return (
        <div className={Style.footer}>
            <div className={Style.footer_box}>
                <div className={Style.footer_box_social}>
                    <FaYinYang size={30} />
                    <p>
                        This is an NFT trading market with the theme of China
                        style, which is only for learning and demonstration.You
                        can search here, upload NFT, or create NFT, but do never
                        connect your wallet account with actual assets here and
                        spend. I hope everyone has fun in this project!
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
                        <input
                            type='email'
                            placeholder='enter your email to get in touch with us'
                            onChange={expectFunc}
                        />
                        <RiSendPlaneFill className={Style.subscribe_box_send} />
                    </div>
                    <div className={Style.subscribe_box_info}>
                        {/* <p>
                            Maybe you will find something happens or something
                            never happens after entering your email
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
