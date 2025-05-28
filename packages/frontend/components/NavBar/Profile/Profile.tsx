'use client'
import React, { Dispatch, SetStateAction, useContext, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaUserAlt, FaRegImage, FaUserEdit } from 'react-icons/fa'
import { MdHelpCenter } from 'react-icons/md'
import { TbDownloadOff, TbDownload } from 'react-icons/tb'
import { MdLogout } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa6'
//
import Style from './Profile.module.css'
import images from '@/img'
import { useClickOutside } from '@/hooks'
import { AccountInfo } from '@/context/typing'
import { NFTMarketplaceContext } from '@/context/NFTMarketplaceContext'
import toast from 'react-hot-toast'

const Profile = ({
    setProfile,
}: {
    setProfile: Dispatch<SetStateAction<boolean>>
}) => {
    const {
        currentAccount,
        accounts,
        setCurrentAccount,
        connectWallect,
        checkIfWalletConnected,
        logout,
    } = useContext(NFTMarketplaceContext)
    const wrapperRef = useRef<HTMLDivElement>(null)
    useClickOutside(wrapperRef, () => setProfile(false))

    const toggleAccount = (account: string) => {
        if (account !== currentAccount) {
            setCurrentAccount(account)
            toast.success('账户已切换！')
        }
    }

    return (
        <div className={Style.profile} ref={wrapperRef}>
            {accounts.map(i => (
                <div
                    className={Style.profile_account}
                    key={i.account}
                    onClick={() => toggleAccount(i.account)}
                >
                    <Image
                        src={images.avatar}
                        alt='user profile'
                        width={30}
                        height={30}
                        className={Style.profile_account_img}
                    />
                    <div className={Style.profile_account_info}>
                        <p
                            title={i.account}
                            className='c_ellipsis'
                            style={{
                                width: '10rem',
                                lineHeight: 1,
                            }}
                        >
                            {i.account}
                        </p>
                        <small title={i.eth}>
                            ETH：{i.eth.slice(0, 15)}...{' '}
                        </small>
                    </div>
                    {currentAccount === i.account && <FaCheck />}
                </div>
            ))}
            <div
                className={Style.profile_menu}
                onClick={() => setProfile(false)}
            >
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
