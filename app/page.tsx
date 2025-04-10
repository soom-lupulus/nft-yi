'use client'
import React, { useContext, useEffect } from 'react'

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
} from '@/components'
import { NFTMarketplaceContext } from '@/context/NFTMarketplaceContext'
import useFetchNFTs from '@/hooks/useFetchNFTs'
import { GridLoader } from 'react-spinners'

const Home = () => {
    const { checkIfWalletConnected } = useContext(NFTMarketplaceContext)
    const { nfts, filterNFTsByName } = useFetchNFTs()

    useEffect(() => {
        checkIfWalletConnected()
    }, [])
    return (
        <div className={Style.homePage}>
            <HeroSection />
            <Service />
            <BigNFTSlider />
            <Title
                heading='Audio Collection'
                paragraph='Discover the most outstanding NFTs in all topics of life.'
            />
            <AudioLive />
            <FollowerTab />
            <Slider />
            <Collection />
            <Title
                heading='Featured NFTs'
                paragraph='Discover the most outstanding NFTs in all topics of life.'
            />
            <Filter />
            {nfts.length ? (
                <NFTCard NFTData={nfts} />
            ) : (
                <div style={{ display: 'flex', minHeight: '20rem' }}>
                    <GridLoader
                        cssOverride={{margin: 'auto'}}
                        color={'var(--icons-color)'}
                        size={20}
                        aria-label='Loading Spinner'
                        data-testid='loader'
                    />
                </div>
            )}
            <Title
                heading='Browser by category'
                paragraph='Explore the NFTs in the most featured categories.'
            />
            <Category />
            <Brand />
            <Video />
            <Subscribe />
        </div>
    )
}

export default Home
