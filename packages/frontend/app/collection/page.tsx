import React from 'react'

//INTERNAL IMPORT
import Style from './collection.module.css'
import images from '@/img'
import {
    Banner,
    CollectionProfile,
    NFTCardTwo,
} from '../../views/collectionPage/collectionIndex'
import { Slider, Brand } from '@/components'
import Filter from '@/components/Filter/Filter'

const collection = () => {
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
        <div className={Style.collection}>
            <Banner bannerImage={images.creatorbackground1} />
            <CollectionProfile />
            <Filter />
            {/* <NFTCardTwo NFTData={collectionArray} /> */}

            <Slider />
            <Brand />
        </div>
    )
}

export default collection
