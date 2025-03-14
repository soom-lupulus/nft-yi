import React from 'react'

//
import Style from './index.module.css'
import { HeroSection } from '@/components'

const Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
    </div>
  )
}

export default Home
