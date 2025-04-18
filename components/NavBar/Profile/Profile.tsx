'use client'
import React, { Dispatch, SetStateAction, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaUserAlt, FaRegImage, FaUserEdit } from 'react-icons/fa'
import { MdHelpCenter } from 'react-icons/md'
import { TbDownloadOff, TbDownload } from 'react-icons/tb'
import { MdLogout } from "react-icons/md";
//
import Style from './Profile.module.css'
import images from '@/img'
import { useClickOutside } from '@/hooks'

const Profile = ({
    currentAccount,
    accountEth,
    setProfile,
    logout,
}: {
    currentAccount: string
    accountEth: string
    setProfile: Dispatch<SetStateAction<boolean>>
    logout: () => void
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    useClickOutside(wrapperRef, () => setProfile(false))
    return (
        <div className={Style.profile} ref={wrapperRef}>
            <div className={Style.profile_account}>
                <Image
                    src={images.avatar}
                    alt='user profile'
                    width={50}
                    height={50}
                    className={Style.profile_account_img}
                />
                <div className={Style.profile_account_info}>
                    <p
                        title={currentAccount}
                        className='c_ellipsis'
                        style={{
                            width: '10rem',
                            lineHeight: 1,
                        }}
                    >
                        {currentAccount}
                    </p>
                    <small title={accountEth}>
                        ETH：{accountEth.slice(0, 15)}...{' '}
                    </small>
                </div>
            </div>
            <div className={Style.profile_menu}>
                <div className={Style.profile_menu_one}>
                    <div className={Style.profile_menu_one_item}>
                        <FaUserAlt />
                        <p>
                            <Link href={{ pathname: '/author' }}>
                                myprofile
                            </Link>
                        </p>
                    </div>
                    <div className={Style.profile_menu_one_item}>
                        <FaRegImage />
                        <p>
                            <Link href={{ pathname: '/author' }}>my items</Link>
                        </p>
                    </div>
                    <div className={Style.profile_menu_one_item}>
                        <FaUserEdit />
                        <p>
                            <Link href={{ pathname: '/account' }}>
                                edit profile
                            </Link>
                        </p>
                    </div>
                </div>
                <div className={Style.profile_menu_two}>
                    <div className={Style.profile_menu_one_item}>
                        <MdHelpCenter />
                        <p>
                            <Link href={{ pathname: '/contact-us' }}>Help</Link>
                        </p>
                    </div>
                    <div className={Style.profile_menu_one_item}>
                        <TbDownload />
                        <p>
                            <Link href={{ pathname: '/about-us' }}>
                                About us
                            </Link>
                        </p>
                    </div>
                    <div
                        className={Style.profile_menu_one_item}
                        onClick={logout}
                    >
                        <MdLogout />
                        <p>
                            <Link href={{ pathname: '/' }}>Log out</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
