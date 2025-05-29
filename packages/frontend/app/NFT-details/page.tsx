'use client'
import React, { Suspense } from 'react'
//INTERNAL IMPORT
import { Button, Category, Brand } from '@/components'
import NFTDetailsPage from '@/views/NFTDetailsPage/NFTDetailsPage'
const NFTDetails = () => {
    return (
        <div>
            <Suspense>
                <NFTDetailsPage />
            </Suspense>
            {/* <Category /> */}
            <Brand />
        </div>
    )
}

export default NFTDetails
