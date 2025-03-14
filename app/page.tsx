import React from 'react'

//
import Style from './index.module.css'
import { BigNFTSlider, HeroSection, Service } from '@/components'

const Home = () => {
    return (
        <div className={Style.homePage}>
            <HeroSection />
            <Service />
            <BigNFTSlider />
        </div>
    )
}

export default Home
