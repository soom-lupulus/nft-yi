'use client'
import React from 'react'

//INTRNAL IMPORT
import Style from './search.module.css'
import { Slider, Brand, Loading } from '@/components'
import { SearchBar } from '@/views/SearchPage'
import { Filter } from '@/components'

import { NFTCardTwo, Banner } from '@/views/collectionPage/collectionIndex'
import images from '@/img'
import useFetchNFTs from '@/hooks/useFetchNFTs'

const searchPage = () => {
    const { nfts, filterNFTsByName } = useFetchNFTs()

    return (
        <div className={Style.searchPage}>
            <Banner bannerImage={images.creatorbackground2} />
            <SearchBar filterNFTsByName={filterNFTsByName} />
            <Filter />
            {nfts.length ? <NFTCardTwo NFTData={nfts} /> : <Loading />}
            <Slider />
            <Brand />
        </div>
    )
}

export default searchPage
