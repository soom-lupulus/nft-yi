import React from 'react'

//
import Style from './index.module.css'
import { HeroSection, Service } from '@/components'

const Home = () => {
    return (
        <div className={Style.homePage}>
            <HeroSection />
            <Service />
        </div>
    )
}

export default Home
