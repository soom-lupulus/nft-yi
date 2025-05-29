'use client'
import React, { Suspense, useEffect } from 'react'

//INTERNAL IMPORT
import { NFTDescription, NFTDetailsImg, NFTTabs } from './index'
import Style from './NFTDetailsPage.module.css'

const NFTDetailsPage: React.FC = () => {
    return (
        <div className={Style.NFTDetailsPage}>
            <div className={Style.NFTDetailsPage_box}>
                <NFTDetailsImg />
                <NFTDescription />
            </div>
        </div>
    )
}

export default NFTDetailsPage
