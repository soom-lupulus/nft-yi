'use client'
import React, { Suspense, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
//
import ResellTokenPage from '@/views/ResellTokenPage/ResellTokenPage'

const ResellToken: React.FC = () => {
    return (
        <Suspense>
            <ResellTokenPage />
        </Suspense>
    )
}

export default ResellToken
