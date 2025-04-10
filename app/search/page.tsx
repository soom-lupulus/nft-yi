'use client'
import React, { CSSProperties } from 'react'
import { ClipLoader, ClimbingBoxLoader, GridLoader } from 'react-spinners'

//INTRNAL IMPORT
import Style from './search.module.css'
import { Slider, Brand } from '@/components'
import { SearchBar } from '@/SearchPage'
import { Filter } from '@/components'

import { NFTCardTwo, Banner } from '@/collectionPage/collectionIndex'
import images from '@/img'
import useFetchNFTs from '@/hooks/useFetchNFTs'

const searchPage = () => {
    const { nfts, filterNFTsByName } = useFetchNFTs()

    const override: CSSProperties = {
        margin: 'auto'
    }
    const collectionArray = [
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,
        images.nft_image_1,
        images.nft_image_2,
    ]

    return (
        <div className={Style.searchPage}>
            <Banner bannerImage={images.creatorbackground2} />
            <SearchBar filterNFTsByName={filterNFTsByName} />
            <Filter />
            {nfts.length ? (
                <NFTCardTwo NFTData={nfts} />
            ) : (
                <div style={{ display: 'flex', minHeight: '20rem' }}>
                    <GridLoader
                        cssOverride={override}
                        color={'var(--icons-color)'}
                        size={20}
                        aria-label='Loading Spinner'
                        data-testid='loader'
                    />
                </div>
            )}
            <Slider />
            <Brand />
        </div>
    )
}

export default searchPage
