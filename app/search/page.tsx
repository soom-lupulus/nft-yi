'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react'

//INTRNAL IMPORT
import Style from './search.module.css'
import { Slider, Brand } from '@/components'
import { SearchBar } from '@/SearchPage'
import { Filter } from '@/components'

import { NFTCardTwo, Banner } from '@/collectionPage/collectionIndex'
import images from '@/img'
import { NFTMarketplaceContext } from '@/context/NFTMarketplaceContext'

const searchPage = () => {
    const { fetchNFTs } = useContext(NFTMarketplaceContext)
    const [nfts, setNFTs] = useState<unknown[]>([])
    const [nftsCopy, setNFTsCopy] = useState<unknown[]>([])
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

    const filterNFTsByName = useCallback((name: string) => {
      const filteredNFTs = nfts.filter(n => {
        const b = n.name.toLowerCase().includes(name.toLowerCase())
        console.log(b);
        
        return b
      })
      !name ? setNFTs(nftsCopy) : setNFTs(filteredNFTs)
    }, [nfts])

    useEffect(() => {
      fetchNFTs().then(res => {
        console.log(res);
        setNFTs(res)
        setNFTsCopy(res)
      })
    }, [])
    return (
        <div className={Style.searchPage}>
            <Banner bannerImage={images.creatorbackground2} />
            <SearchBar filterNFTsByName={filterNFTsByName}/>
            <Filter />
            <NFTCardTwo NFTData={nfts} />
            <Slider />
            <Brand />
        </div>
    )
}

export default searchPage
