'use client'
import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'

//INTERNAL IMPORT
import Style from './connectWallet.module.css'
import images from '@/img'
import { expectFunc } from '@/utils'
import { NFTMarketplaceContext } from '@/context/NFTMarketplaceContext'

const ConnectWallet = () => {
    const [activeBtn, setActiveBtn] = useState(1)
    const { connectWallect } = useContext(NFTMarketplaceContext)
    const providerArray = [
        {
            provider: images.provider1,
            name: 'MetaMask',
        },
        {
            provider: images.provider2,
            name: 'walletConnect',
        },
        {
            provider: images.provider3,
            name: 'walletlink',
        },
        {
            provider: images.provider4,
            name: 'Formatic',
        },
    ]
    return (
        <div className={Style.connectWallet}>
            <div className={Style.connectWallet_box}>
                <h1>Connect your wallet</h1>
                <p className={Style.connectWallet_box_para}>
                    Connect with one of our avaliabl wallet providers or create
                    a new one
                </p>

                <div className={Style.connectWallet_box_provider}>
                    {providerArray.map((el, i) => (
                        <div
                            className={`${Style.connectWallet_box_provider_item} ${
                                activeBtn == i + 1 ? Style.active : ''
                            }`}
                            key={i + 1}
                            onClick={() => {
                                setActiveBtn(i + 1)
                                console.log(el.name)
                                if (el.name !== 'MetaMask') {
                                    expectFunc()
                                } else {
                                    connectWallect()
                                }
                            }}
                        >
                            <Image
                                src={el.provider}
                                alt={el.name}
                                width={50}
                                height={50}
                                className={
                                    Style.connectWallet_box_provider_item_img
                                }
                            />
                            <p>{el.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ConnectWallet
