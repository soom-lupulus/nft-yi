'use client'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GrClose } from 'react-icons/gr'
import {
    TiSocialFacebook,
    TiSocialLinkedin,
    TiSocialTwitter,
    TiSocialYoutube,
    TiSocialInstagram,
    TiArrowSortedDown,
    TiArrowSortedUp,
} from 'react-icons/ti'
import { TbDownloadOff } from 'react-icons/tb'
//
import images from '@/img'
import Style from './SideBar.module.css'
import Button from '@/components/Button/Button'
import { NFTMarketplaceContext } from '@/context/NFTMarketplaceContext'

type IPropTypes = {
    setOpenSideMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const SideBar = ({ setOpenSideMenu }: IPropTypes) => {
    const { connectWallect, currentAccount } = useContext(NFTMarketplaceContext)
    const [openDiscover, setOpenDiscover] = useState(false)
    const [openHelp, setOpenHelp] = useState(false)
    const discover = [
        {
            name: 'Collection',
            link: 'collection',
        },
        {
            name: 'Search',
            link: 'search',
        },
        {
            name: 'Author Profile',
            link: 'author-profile',
        },
        {
            name: 'NFT Detail',
            link: 'NFT-detail',
        },
        {
            name: 'Account Setting',
            link: 'account setting',
        },
        {
            name: 'Connect Wallet',
            link: 'connect-wallet',
        },
        {
            name: 'Blog',
            link: 'blog',
        },
    ]
    const helpCenter = [
        {
            name: 'About',
            link: 'about',
        },
        {
            name: 'Contact us',
            link: 'contact-us',
        },
        {
            name: 'Sign Up',
            link: 'sign-up',
        },
        {
            name: 'Sign In',
            link: 'sign-in',
        },
        {
            name: 'Subscription',
            link: 'subscription',
        },
    ]

    const closeSideBar = () => {
        setOpenSideMenu(false)
    }
    const openDiscoverMenu = () => {
        if (!openDiscover) {
            setOpenDiscover(true)
        } else {
            setOpenDiscover(false)
        }
    }
    const openHelpMenu = () => {
        if (!openHelp) {
            setOpenHelp(true)
        } else {
            setOpenHelp(false)
        }
    }

    return (
        <div className={Style.sideBar}>
            <GrClose
                className={Style.sideBar_closeBtn}
                onClick={() => closeSideBar()}
            />
            <div className={Style.sideBar_box}>
                <Image
                    src={images.logo}
                    alt='logo'
                    width={150}
                    height={150}
                ></Image>
                <p>
                    Discover the most outstanding articles on all topices of NFT
                    own stories and share them
                </p>
                <div className={Style.sideBar_social}>
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
            <div className={Style.sideBar_menu}>
                <div>
                    <div
                        className={Style.sideBar_menu_box}
                        onClick={() => openDiscoverMenu()}
                    >
                        <p>Discover</p>
                        <TiArrowSortedDown />
                    </div>
                    {openDiscover && (
                        <div className={Style.sideBar_discover}>
                            {discover.map((el, i) => (
                                <p key={i + 1}>
                                    <Link href={{ pathname: el.link }}>
                                        {el.name}
                                    </Link>
                                </p>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <div
                        className={Style.sideBar_menu_box}
                        onClick={() => openHelpMenu()}
                    >
                        <p>Help Center</p>
                        <TiArrowSortedDown />
                    </div>
                    {openHelp && (
                        <div className={Style.sideBar_discover}>
                            {helpCenter.map((el, i) => (
                                <p key={i + 1}>
                                    <Link href={{ pathname: el.link }}>
                                        {el.name}
                                    </Link>
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className={Style.sideBar_button}>
                {currentAccount ? (
                    <Link href={'/upload-nft'}>
                        <Button btnName='Create' handleClick={closeSideBar} />
                    </Link>
                ) : (
                    <Button btnName='Connect' handleClick={connectWallect} />
                )}
                <Button btnName='Connect Wallet' handleClick={() => {}} />
            </div>
        </div>
    )
}

export default SideBar
