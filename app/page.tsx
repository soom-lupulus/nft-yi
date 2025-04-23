'use client'
import React, { useContext, useEffect, useMemo } from 'react'

//
import Style from './index.module.css'
import {
    BigNFTSlider,
    HeroSection,
    Service,
    Subscribe,
    Title,
    Category,
    Filter,
    NFTCard,
    Collection,
    FollowerTab,
    AudioLive,
    Slider,
    Brand,
    Video,
    Loading,
    Empty,
} from '@/components'
import { NFTMarketplaceContext } from '@/context/NFTMarketplaceContext'
import useFetchNFTs from '@/hooks/useFetchNFTs'
import { getTopCreators } from '@/utils/getTopCreators'

const Home = () => {
    const { checkIfWalletConnected } = useContext(NFTMarketplaceContext)
    const { nfts, filterNFTsByName, isLoading } = useFetchNFTs()

    const creators = getTopCreators(nfts)
    const topCreatorsArr = useMemo(() => {
        let resArr = []
        for (const [key, value] of Object.entries(creators)) {
            resArr.push({
                seller: key,
                totalETHs: value,
            })
        }
        return resArr
    }, [creators])

    useEffect(() => {
        checkIfWalletConnected()
    }, [])
    return (
        <div className={Style.homePage}>
            <HeroSection />
            <Service />
            <BigNFTSlider />
            {/* <Title
                heading='Audio Collection'
                paragraph='Discover the most outstanding NFTs in all topics of life.'
            />
            <AudioLive /> */}
            {/* <FollowerTab creators={topCreatorsArr} /> */}
            {/* <Slider /> */}
            {/* <Collection /> */}
            {/* <Title
                heading='Featured NFTs'
                paragraph='Discover the most outstanding NFTs in all topics of life.'
            />
            <Filter /> */}
            {isLoading ? (
                <Loading />
            ) : nfts.length ? (
                <NFTCard NFTData={nfts} />
            ) : (
                <Empty />
            )}
            {/* <Title
                heading='Browser by category'
                paragraph='Explore the NFTs in the most featured categories.'
            />
            <Category /> */}
            <Brand />
            {/* <Video /> */}
            <Subscribe />
        </div>
    )
}

export default Home
