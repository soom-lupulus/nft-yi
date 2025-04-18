'use client'
import React, { useContext } from 'react'
import Image from 'next/image'
//
import Style from './HeroSection.module.css'
import images from '@/img'
import { Button } from '@/components'
import { NFTMarketplaceContext } from '@/context/NFTMarketplaceContext'
import Link from 'next/link'

const HeroSection = () => {
    const { titleData } = useContext(NFTMarketplaceContext)
    return (
        <div className={Style.heroSection}>
            <div className={Style.heroSection_box}>
                <div className={Style.heroSection_box_left}>
                    <h1>{titleData}🖼️</h1>
                    <p>
                        Discover the most outstanding NFTs in all topic of
                        life.Creative your NFTs and sell them
                    </p>
                    <Link href={{pathname: '/search'}}>
                        <Button
                            btnName='Start your search'
                            handleClick={() => {}}
                        ></Button>
                    </Link>
                </div>
                <div className={Style.heroSection_box_right}>
                    <Image
                        src={images.hl}
                        alt='hero section'
                        width={600}
                        height={600}
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    ></Image>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
