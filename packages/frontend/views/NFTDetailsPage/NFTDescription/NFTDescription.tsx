'use client'
import React, { useContext, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
    MdVerified,
    MdCloudUpload,
    MdTimer,
    MdReportProblem,
    MdOutlineDeleteSweep,
} from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'
import { FaWallet, FaPercentage } from 'react-icons/fa'
import {
    TiSocialFacebook,
    TiSocialLinkedin,
    TiSocialTwitter,
    TiSocialYoutube,
    TiSocialInstagram,
} from 'react-icons/ti'
import { BiTransferAlt, BiDollar } from 'react-icons/bi'

//INTERNAL IMPORT
import Style from './NFTDescription.module.css'
import images from '@/img'
import { Button } from '@/components'
import { useRouter, useSearchParams } from 'next/navigation'
import { NFTMarketplaceContext } from '@/context/NFTMarketplaceContext'
import toast from 'react-hot-toast'
import { expectFunc } from '@/utils'
import { ButtonHandle } from '@/components/Button/Button'

const NFTDescription = () => {
    const [social, setSocial] = useState(false)
    const [NFTMenu, setNFTMenu] = useState(false)
    const [history, setHistory] = useState(true)
    const [provanance, setProvanance] = useState(false)
    const [owner, setOwner] = useState(false)
    const buyBenRef = useRef<ButtonHandle>(null)

    const searchParams = useSearchParams()
    const { currentAccount, buyNFT } = useContext(NFTMarketplaceContext)
    const router = useRouter()
    console.log(currentAccount)

    const historyArray = [
        images.user1,
        images.user2,
        images.user3,
        images.user4,
        images.user5,
    ]
    const provananceArray = [
        images.user6,
        images.user7,
        images.user8,
        images.user9,
        images.user10,
    ]
    const ownerArray = [
        images.user1,
        images.user8,
        images.user2,
        images.user6,
        images.user5,
    ]

    const isSeller = useMemo(() => {
        console.log(currentAccount)
        console.log(currentAccount == '')

        return (
            currentAccount.toLowerCase() ===
            searchParams.get('seller')?.toLowerCase()
        )
    }, [currentAccount])

    const isOwner = useMemo(() => {
        return (
            currentAccount.toLowerCase() ===
            searchParams.get('owner')?.toLowerCase()
        )
    }, [currentAccount])

    const openSocial = () => {
        if (!social) {
            setSocial(true)
            setNFTMenu(false)
        } else {
            setSocial(false)
        }
    }

    const openNFTMenu = () => {
        if (!NFTMenu) {
            setNFTMenu(true)
            setSocial(false)
        } else {
            setNFTMenu(false)
        }
    }

    const openTabs = e => {
        const btnText = e.target.innerText

        if (btnText == 'Bid History') {
            setHistory(true)
            setProvanance(false)
            setOwner(false)
        } else if (btnText == 'Provanance') {
            setHistory(false)
            setProvanance(true)
            setOwner(false)
        }
    }

    const openOwmer = () => {
        if (!owner) {
            setOwner(true)
            setHistory(false)
            setProvanance(false)
        } else {
            setOwner(false)
            setHistory(true)
        }
    }

    /**
     * 点击购买NFT
     * @returns
     */
    const onBuyThisClick = async () => {
        try {
            buyBenRef.current?.setLoading(true)
            const price = searchParams.get('price')
            const tokenId = searchParams.get('tokenId')
            if (!price || !tokenId) return toast.error('参数信息缺失！')
            await buyNFT({
                price,
                tokenId,
            })
        } finally{
            buyBenRef.current?.setLoading(false)
        }
    }
    const onResellClick = () => {
        const image = searchParams.get('image')
        const tokenId = searchParams.get('tokenId')
        const price = searchParams.get('price')
        if (!image || !tokenId) return toast.error('参数信息缺失！')
        const data = {
            id: tokenId,
            tokenURI: image,
            price: price,
        }
        router.push(`/resell-token?data=${JSON.stringify(data)}`)
    }

    return (
        <div className={Style.NFTDescription}>
            <div className={Style.NFTDescription_box}>
                {/* //Part ONE */}
                <div className={Style.NFTDescription_box_share}>
                    <p>Virtual Worlds</p>
                    <div className={Style.NFTDescription_box_share_box}>
                        <MdCloudUpload
                            className={Style.NFTDescription_box_share_box_icon}
                            onClick={() => openSocial()}
                        />

                        {social && (
                            <div
                                className={
                                    Style.NFTDescription_box_share_box_social
                                }
                            >
                                <a href='#'>
                                    <TiSocialFacebook /> Facebooke
                                </a>
                                <a href='#'>
                                    <TiSocialInstagram /> Instragram
                                </a>
                                <a href='#'>
                                    <TiSocialLinkedin /> LinkedIn
                                </a>
                                <a href='#'>
                                    <TiSocialTwitter /> Twitter
                                </a>
                                <a href='#'>
                                    <TiSocialYoutube /> YouTube
                                </a>
                            </div>
                        )}

                        <BsThreeDots
                            className={Style.NFTDescription_box_share_box_icon}
                            onClick={() => openNFTMenu()}
                        />

                        {NFTMenu && (
                            <div
                                className={
                                    Style.NFTDescription_box_share_box_social
                                }
                            >
                                <a href='#'>
                                    <BiDollar /> Change price
                                </a>
                                <a href='#'>
                                    <BiTransferAlt /> Transfer
                                </a>
                                <a href='#'>
                                    <MdReportProblem /> Report abouse
                                </a>
                                <a href='#'>
                                    <MdOutlineDeleteSweep /> Delete item
                                </a>
                            </div>
                        )}
                    </div>
                </div>
                {/* //Part TWO */}
                <div className={Style.NFTDescription_box_profile}>
                    <h1>
                        {searchParams.get('name')} #{' '}
                        {searchParams.get('tokenId')}
                    </h1>
                    <div className={Style.NFTDescription_box_profile_box}>
                        <div
                            className={
                                Style.NFTDescription_box_profile_box_left
                            }
                        >
                            <Image
                                src={images.user1}
                                alt='profile'
                                width={40}
                                height={40}
                                className={
                                    Style.NFTDescription_box_profile_box_left_img
                                }
                            />
                            <div
                                className={
                                    Style.NFTDescription_box_profile_box_left_info
                                }
                            >
                                <small>Seller</small> <br />
                                <span>
                                    {searchParams.get('seller')} <MdVerified />
                                </span>
                            </div>
                        </div>

                        {/* <div
                            className={
                                Style.NFTDescription_box_profile_box_right
                            }
                        >
                            <Image
                                src={images.user2}
                                alt='profile'
                                width={40}
                                height={40}
                                className={
                                    Style.NFTDescription_box_profile_box_left_img
                                }
                            />

                            <div
                                className={
                                    Style.NFTDescription_box_profile_box_right_info
                                }
                            >
                                <small>Creator</small> <br />
                                <span>
                                    Karli Costa <MdVerified />
                                </span>
                            </div>
                        </div> */}
                    </div>

                    <div className={Style.NFTDescription_box_profile_biding}>
                        <p>
                            <MdTimer /> <span>Auction ending in:</span>
                        </p>

                        <div
                            className={
                                Style.NFTDescription_box_profile_biding_box_timer
                            }
                        >
                            <div
                                className={
                                    Style.NFTDescription_box_profile_biding_box_timer_item
                                }
                            >
                                <p>2</p>
                                <span>Days</span>
                            </div>
                            <div
                                className={
                                    Style.NFTDescription_box_profile_biding_box_timer_item
                                }
                            >
                                <p>22</p>
                                <span>hours</span>
                            </div>
                            <div
                                className={
                                    Style.NFTDescription_box_profile_biding_box_timer_item
                                }
                            >
                                <p>45</p>
                                <span>mins</span>
                            </div>
                            <div
                                className={
                                    Style.NFTDescription_box_profile_biding_box_timer_item
                                }
                            >
                                <p>12</p>
                                <span>secs</span>
                            </div>
                        </div>

                        <div
                            className={
                                Style.NFTDescription_box_profile_biding_box_price
                            }
                        >
                            <div
                                className={
                                    Style.NFTDescription_box_profile_biding_box_price_bid
                                }
                            >
                                <small>Current Bid</small>
                                <p>
                                    {searchParams.get('price')} ETH{' '}
                                    <span>( ≈ $3,221.22)</span>
                                </p>
                            </div>

                            <span>[96 in stock]</span>
                        </div>

                        <div
                            className={
                                Style.NFTDescription_box_profile_biding_box_button
                            }
                        >
                            {isSeller ? (
                                "you can't buy your own NFT"
                            ) : isOwner ? (
                                <Button
                                    icon=<FaWallet />
                                    btnName='List on Market'
                                    handleClick={onResellClick}
                                    classStyle={Style.button}
                                />
                            ) : (
                                <Button
                                    icon=<FaWallet />
                                    btnName='Buy This'
                                    handleClick={onBuyThisClick}
                                    classStyle={Style.button}
                                    ref={buyBenRef}
                                />
                            )}

                            <Button
                                icon=<FaPercentage />
                                btnName='Make offer'
                                handleClick={expectFunc}
                                classStyle={Style.button}
                            />
                        </div>

                        {/* <div
                            className={
                                Style.NFTDescription_box_profile_biding_box_tabs
                            }
                        >
                            <button onClick={e => openTabs(e)}>
                                Bid History
                            </button>
                            <button onClick={e => openTabs(e)}>
                                Provanance
                            </button>
                            <button onClick={() => openOwmer()}>Owner</button>
                        </div> */}

                        {/* {history && (
                            <div
                                className={
                                    Style.NFTDescription_box_profile_biding_box_card
                                }
                            >
                                <NFTTabs dataTab={historyArray} />
                            </div>
                        )}
                        {provanance && (
                            <div
                                className={
                                    Style.NFTDescription_box_profile_biding_box_card
                                }
                            >
                                <NFTTabs dataTab={provananceArray} />
                            </div>
                        )}

                        {owner && (
                            <div
                                className={
                                    Style.NFTDescription_box_profile_biding_box_card
                                }
                            >
                                <NFTTabs
                                    dataTab={ownerArray}
                                    icon=<MdVerified />
                                />
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NFTDescription
