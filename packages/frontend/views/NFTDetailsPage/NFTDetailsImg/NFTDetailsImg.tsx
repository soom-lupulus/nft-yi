'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { BsImages } from 'react-icons/bs'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { useSearchParams } from 'next/navigation'

//INTERNAL IMPORT
import Style from './NFTDetailsImg.module.css'
import images from '@/img'

const NFTDetailsImg = () => {
    const [description, setDescription] = useState(true)
    const [details, setDetails] = useState(true)
    const [like, setLike] = useState(false)
    const searchParams = useSearchParams()
    const openDescription = () => {
        if (!description) {
            setDescription(true)
        } else {
            setDescription(false)
        }
    }

    const openDetails = () => {
        if (!details) {
            setDetails(true)
        } else {
            setDetails(false)
        }
    }

    const likeNFT = () => {
        if (!like) {
            setLike(true)
        } else {
            setLike(false)
        }
    }

    return (
        <div className={Style.NFTDetailsImg}>
            <div className={Style.NFTDetailsImg_box}>
                <div className={Style.NFTDetailsImg_box_NFT}>
                    <div className={Style.NFTDetailsImg_box_NFT_like}>
                        <BsImages
                            className={Style.NFTDetailsImg_box_NFT_like_icon}
                        />
                        <p onClick={() => likeNFT()}>
                            {like ? (
                                <AiOutlineHeart
                                    className={
                                        Style.NFTDetailsImg_box_NFT_like_icon
                                    }
                                />
                            ) : (
                                <AiFillHeart
                                    className={
                                        Style.NFTDetailsImg_box_NFT_like_icon
                                    }
                                />
                            )}
                            <span>23</span>
                        </p>
                    </div>

                    <div className={Style.NFTDetailsImg_box_NFT_img}>
                        <Image
                            src={searchParams.get('image')}
                            className={Style.NFTDetailsImg_box_NFT_img_img}
                            alt='NFT image'
                            width={700}
                            height={800}
                        />
                    </div>
                </div>

                <div
                    className={Style.NFTDetailsImg_box_description}
                    onClick={() => openDescription()}
                >
                    <p style={{ color: 'var(--main-bg-color)' }}>Description</p>
                    {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                </div>

                {description && (
                    <div className={Style.NFTDetailsImg_box_description_box}>
                        <p>{searchParams.get('description')}</p>
                    </div>
                )}

                <div
                    className={Style.NFTDetailsImg_box_details}
                    onClick={() => openDetails()}
                >
                    <p style={{ color: 'var(--main-bg-color)' }}>Details</p>
                    {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                </div>

                {details && (
                    <div className={Style.NFTDetailsImg_box_details_box}>
                        {/* <small>2000 x 2000 px.IMAGE(685KB)</small> */}
                        <p>
                            <small>Contract Address</small>
                            <br></br>
                            {searchParams.get('owner')}
                        </p>
                        <p>
                            <small>Token ID</small>
                            &nbsp;{searchParams.get('tokenId')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NFTDetailsImg
