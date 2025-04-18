'use client'
import React, { useState, useEffect, useContext, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// icon
import { MdNotifications, MdWallet } from 'react-icons/md'
import { BsSearch } from 'react-icons/bs'
import { CgMenuLeft, CgMenuRight } from 'react-icons/cg'
// internal
import Style from './NavBar.module.css'
import { Discover, HelpCenter, Notification, Profile, SideBar } from './index'
import { Button } from '@/components'
import images from '@/img'
import { NFTMarketplaceContext } from '@/context/NFTMarketplaceContext'
import { DiJqueryLogo } from 'react-icons/di'
import { useScrollTrigger, useClickOutside } from '@/hooks'

const NavBar = () => {
    const {
        currentAccount,
        accountEth,
        connectWallect,
        checkIfWalletConnected,
        logout,
    } = useContext(NFTMarketplaceContext)
    const [discover, setDiscover] = useState(false)
    const [help, setHelp] = useState(false)
    const [notification, setNotification] = useState(false)
    const [profile, setProfile] = useState(false)
    const [openSideMenu, setOpenSideMenu] = useState(false)
    const { scrolled } = useScrollTrigger(10)
    const wrapperDiscoverRef = useRef<HTMLDivElement>(null)
    const wrapperHelpRef = useRef<HTMLDivElement>(null)

    useClickOutside(wrapperDiscoverRef, () => setDiscover(false))
    useClickOutside(wrapperHelpRef, () => setHelp(false))

    const openMenu = (e: React.MouseEvent<HTMLParagraphElement>) => {
        const btnText = e.currentTarget.innerText
        console.log(btnText)

        if (btnText === 'Discover') {
            setDiscover(true)
            setHelp(false)
            setNotification(false)
            setProfile(false)
        } else if (btnText === 'Help Center') {
            setDiscover(false)
            setHelp(true)
            setNotification(false)
            setProfile(false)
        } else {
            setDiscover(false)
            setHelp(false)
            setNotification(false)
            setProfile(false)
        }
    }

    const openNotification = () => {
        if (!notification) {
            setNotification(true)
            setDiscover(false)
            setHelp(false)
            setProfile(false)
        } else {
            setNotification(false)
        }
    }

    const openProfile = () => {
        if (!profile) {
            setNotification(false)
            setDiscover(false)
            setHelp(false)
            setProfile(true)
        } else {
            setProfile(false)
        }
    }

    const openSideBar = () => {
        if (!openSideMenu) {
            setOpenSideMenu(true)
        } else {
            setOpenSideMenu(false)
        }
    }

    useEffect(() => {
        checkIfWalletConnected()
    }, [])

    return (
        <div className={`${Style.navbar} ${scrolled ? Style.scrolled : ''}`}>
            <div className={Style.navbar_container}>
                <div className={Style.navbar_container_left}>
                    <div className={Style.logo}>
                        <Link href={{ pathname: '/' }}>
                            <DiJqueryLogo size={30} />
                        </Link>
                    </div>
                    <div className={Style.navbar_container_left_box_input}>
                        <div
                            className={
                                Style.navbar_container_left_box_input_box
                            }
                        >
                            <input type='text' placeholder='Search NFT' />
                            <BsSearch
                                onClick={() => {}}
                                className={Style.search_icon}
                            />
                        </div>
                    </div>
                </div>
                <div className={Style.navbar_container_right}>
                    {/* discover */}
                    <div className={Style.navbar_container_right_discover}>
                        <p onClick={e => openMenu(e)}>Discover</p>
                        {discover && (
                            <div
                                ref={wrapperDiscoverRef}
                                className={
                                    Style.navbar_container_right_discover_box
                                }
                                onClick={() => setDiscover(false)}
                            >
                                <Discover />
                            </div>
                        )}
                    </div>
                    {/* help center */}
                    <div className={Style.navbar_container_right_help}>
                        <p onClick={e => openMenu(e)}>Help Center</p>
                        {help && (
                            <div
                                className={
                                    Style.navbar_container_right_help_box
                                }
                                ref={wrapperHelpRef}
                                onClick={() => setHelp(false)}
                            >
                                <HelpCenter />
                            </div>
                        )}
                    </div>
                    {/* notification */}
                    <div className={Style.navbar_container_right_notify}>
                        <MdNotifications
                            className={Style.notify}
                            onClick={() => openNotification()}
                        />
                        {notification && <Notification />}
                    </div>
                    {/* button */}
                    <div className={Style.navbar_container_right_button}>
                        {currentAccount ? (
                            <Link href={'/upload-nft'}>
                                <Button
                                    btnName='Create NFT'
                                    handleClick={() => {}}
                                />
                            </Link>
                        ) : (
                            <>
                                <Button
                                    btnName='Connect Wallet'
                                    handleClick={connectWallect}
                                ></Button>
                            </>
                        )}
                    </div>
                    {/* user profile */}
                    {currentAccount && (
                        <div
                            className={Style.navbar_container_right_profile_box}
                        >
                            <div
                                className={Style.navbar_container_right_profile}
                            >
                                <Image
                                    src={images.avatar}
                                    alt='Profile'
                                    width={40}
                                    height={40}
                                    onClick={() => openProfile()}
                                    className={
                                        Style.navbar_container_right_profile
                                    }
                                />
                                {profile && (
                                    <Profile
                                        currentAccount={currentAccount}
                                        accountEth={accountEth}
                                        setProfile={setProfile}
                                        logout={logout}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                    {/* menu button */}
                    <div className={Style.navbar_container_right_menuBtn}>
                        <CgMenuRight
                            className={Style.meenuIcon}
                            onClick={() => openSideBar()}
                        />
                    </div>
                </div>
            </div>
            {/* sidebar */}
            {openSideMenu && (
                <div className={Style.sideBar}>
                    <SideBar setOpenSideMenu={setOpenSideMenu} />
                </div>
            )}
        </div>
    )
}

export default NavBar
