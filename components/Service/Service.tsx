import React from 'react'
import Image from 'next/image'
//
import images from '@/img'
import Style from './Service.module.css'

const Service = () => {
    return (
        <div className={Style.service}>
            <div className={Style.service_box}>
                <div className={Style.service_box_item}>
                    <Image
                        src={images.wallet_c}
                        alt='Filter & Discover'
                        width={100}
                        height={100}
                    ></Image>
                    <p className={Style.service_box_item_step}>
                        <span>Step 1</span>
                    </p>
                    <h3>Connect with wallet</h3>
                    <p>Connect your wallet and join the NFT family</p>
                </div>
                <div className={Style.service_box_item}>
                    <Image
                        src={images.search_c}
                        alt='Filter & Discover'
                        width={100}
                        height={100}
                    ></Image>
                    <p className={Style.service_box_item_step}>
                        <span>Step 2</span>
                    </p>
                    <h3>Discover NFTs</h3>
                    <p>Search for NFTs you like and check it out</p>
                </div>
                <div className={Style.service_box_item}>
                    <Image
                        src={images.trading_c}
                        alt='Connect Wallet'
                        width={100}
                        height={100}
                    ></Image>
                    <p className={Style.service_box_item_step}>
                        <span>Step 3</span>
                    </p>
                    <h3>Start trading</h3>
                    <p>Try to own it and start your Frist NFT trading</p>
                </div>
                <div className={Style.service_box_item}>
                    <Image
                        src={images.upload_c}
                        alt='Filter & Discover'
                        width={100}
                        height={100}
                    ></Image>
                    <p className={Style.service_box_item_step}>
                        <span>Step 4</span>
                    </p>
                    <h3>Mint your NFTs</h3>
                    <p>Mint your own NFT and make it popular</p>
                </div>
            </div>
        </div>
    )
}

export default Service
