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
} from '@/components'

const Home = () => {
    return (
        <div className={Style.homePage}>
            <HeroSection />
            <Service />
            <BigNFTSlider />
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
