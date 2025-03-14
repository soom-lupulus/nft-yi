'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { AiFillFire, AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { MdVerified, MdTimer } from 'react-icons/md'
import {
    TbArrowBigLeftLines,
    TbArrowAutofitRight,
    TbArrowBigRightLine,
    TbArrowBigLeftLine,
} from 'react-icons/tb'
//
import Style from './BigNFTSlider.module.css'
import images from '@/img'
import Button from '../Button/Button'

const BigNFTSlider = () => {
    const [idNumber, setIdNumber] = useState(1)
    const sliderData = [
        {
            title: 'Hello NFT',
            id: 1,
            name: 'Neil',
            collection: 'Gym',
            price: '00000064664 ETH',
            like: 243,
            image: images.user1,
            nftImage: images.nft_image_1,
            time: {
                days: 27,
                hours: 10,
                minutes: 20,
                seconds: 55,
            },
        },
        {
            title: 'ggg NFT',
            id: 2,
            name: 'Neil2',
            collection: 'plum',
            price: '00000037963 ETH',
            like: 248,
            image: images.user2,
            nftImage: images.nft_image_2,
            time: {
                days: 27,
                hours: 10,
                minutes: 20,
                seconds: 55,
            },
        },
        {
            title: 'hghg NFT',
            id: 3,
            name: 'Neil3',
            collection: 'liusi',
            price: '00000045687 ETH',
            like: 53,
            image: images.user3,
            nftImage: images.nft_image_3,
            time: {
                days: 27,
                hours: 10,
                minutes: 20,
                seconds: 55,
            },
        },
    ]
    const inc = useCallback(() => {
        if (idNumber + 1 < sliderData.length) {
            setIdNumber(idNumber + 1)
        }
    }, [idNumber, sliderData.length])
    const dec = useCallback(() => {
        if (idNumber > 0) {
            setIdNumber(idNumber - 1)
        }
    }, [idNumber, sliderData.length])

    // useEffect(() => {
    //     inc()
    // }, [])

    return (
        <div className={Style.bigNFTSlider}>
            <div className={Style.bigNFTSlider_box}>
                <div className={Style.bigNFTSlider_box_left}>
                    <h2>{sliderData[idNumber].title}</h2>
                    <div className={Style.bigNFTSlider_box_left_creator}>
                        <div
                            className={
                                Style.bigNFTSlider_box_left_creator_profile
                            }
                        >
                            <Image
                                className={
                                    Style.bigNFTSlider_box_left_creator_profile_img
                                }
                                src={sliderData[idNumber].image}
                                alt='profile image'
                                width={50}
                                height={50}
                            />
                            <div
                                className={
                                    Style.bigNFTSlider_box_left_creator_profile_img
                                }
                            >
                                <p>Creator</p>
                                <h4>
                                    {sliderData[idNumber].name}{' '}
                                    <span>
                                        <MdVerified />
                                    </span>
                                </h4>
                            </div>
                        </div>
                        <div
                            className={
                                Style.bigNFTSlider_box_left_creator_collection
                            }
                        >
                            <AiFillFire
                                className={
                                    Style.bigNFTSlider_box_left_creator_collection_icon
                                }
                            />
                            <div
                                className={
                                    Style.bigNFTSlider_box_left_creator_collection_info
                                }
                            >
                                <p>Collection</p>
                                <h4>{sliderData[idNumber].collection}</h4>
                            </div>
                        </div>
                    </div>
                    <div className={Style.bigNFTSlider_box_left_bidding}>
                        <div
                            className={Style.bigNFTSlider_box_left_bidding_box}
                        >
                            <small>Current Bid</small>
                            <p>
                                {sliderData[idNumber].price}{' '}
                                <span>$,221,21</span>
                            </p>
                        </div>
                        <p
                            className={
                                Style.bigNFTSlider_box_left_bidding_box_auction
                            }
                        >
                            <MdTimer
                                className={
                                    Style.bigNFTSlider_box_left_bidding_box_icon
                                }
                            />
                            <span>Auction ending in</span>
                        </p>
                        <div
                            className={
                                Style.bigNFTSlider_box_left_bidding_box_timer
                            }
                        >
                            <div
                                className={
                                    Style.bigNFTSlider_box_left_bidding_box_timer_item
                                }
                            >
                                <p>{sliderData[idNumber].time.days}</p>
                                <span>Days</span>
                            </div>
                            <div
                                className={
                                    Style.bigNFTSlider_box_left_bidding_box_timer_item
                                }
                            >
                                <p>{sliderData[idNumber].time.hours}</p>
                                <span>Hours</span>
                            </div>
                            <div
                                className={
                                    Style.bigNFTSlider_box_left_bidding_box_timer_item
                                }
                            >
                                <p>{sliderData[idNumber].time.minutes}</p>
                                <span>Minutes</span>
                            </div>
                            <div
                                className={
                                    Style.bigNFTSlider_box_left_bidding_box_timer_item
                                }
                            >
                                <p>{sliderData[idNumber].time.seconds}</p>
                                <span>Seconds</span>
                            </div>
                        </div>
                        <div className={Style.bigNFTSlider_box_left_button}>
                            <Button
                                btnName='Place'
                                handleClick={() => {}}
                            ></Button>
                            <Button
                                btnName='View'
                                handleClick={() => {}}
                            ></Button>
                        </div>
                    </div>
                    <div className={Style.bigNFTSlider_box_left_sliderBtn}>
                        <TbArrowBigLeftLine
                            className={
                                Style.bigNFTSlider_box_left_sliderBtn_icon
                            }
                            onClick={() => dec()}
                        />
                        <TbArrowBigRightLine
                            className={
                                Style.bigNFTSlider_box_left_sliderBtn_icon
                            }
                            onClick={() => inc()}
                        />
                    </div>
                </div>
                <div className={Style.bigNFTSlider_box_right}>
                    <div className={Style.bigNFTSlider_box_right_box}>
                        <Image
                            src={sliderData[idNumber].nftImage}
                            alt='NFT IMAGE'
                            className={Style.bigNFTSlider_box_right_box_img}
                        ></Image>
                        <div className={Style.bigNFTSlider_box_right_box_like}>
                            <AiFillHeart />
                            <span>{sliderData[idNumber].like}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BigNFTSlider
