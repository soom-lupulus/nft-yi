import React from 'react'

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
} from '@/components'

const Home = () => {
    return (
        <div className={Style.homePage}>
            <HeroSection />
            <Service />
            <BigNFTSlider />
            <Title
                heading='Filter By Collection'
                paragraph='Discover the most outstanding NFTs in all topics of life.'
            />
            <Collection />
            <Title
                heading='Featured NFTs'
                paragraph='Discover the most outstanding NFTs in all topics of life.'
            />
            <Filter />
            <NFTCard />
            <Title
                heading='Browser by category'
                paragraph='Explore the NFTs in the most featured categories.'
            />
            <Category />
            <Subscribe />
        </div>
    )
}

export default Home
