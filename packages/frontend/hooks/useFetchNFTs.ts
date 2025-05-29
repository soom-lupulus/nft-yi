'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { NFTMarketplaceContext } from '@/context/NFTMarketplaceContext'
import { NFTInfoType } from '@/context/typing'

export default function useFetchNFTs() {
    const { fetchNFTs } = useContext(NFTMarketplaceContext)
    const [nfts, setNFTs] = useState<NFTInfoType[]>([])
    const [nftsCopy, setNFTsCopy] = useState<NFTInfoType[]>([])
    const [isLoading, setIsLoading] = useState(true) // 新增加载状态

    useEffect(() => {
        setIsLoading(true) // 开始加载
        fetchNFTs().then(res => {
            setNFTs(res)
            setNFTsCopy(res)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    const filterNFTsByName = useCallback(
        (name: string) => {
            const filteredNFTs = nfts.filter(n => n.name.toLowerCase().includes(name.toLowerCase()))
            if (!name) {
                setNFTs(nftsCopy)
            } else {
                setNFTs(filteredNFTs)
            }
        },
        [nfts, nftsCopy],
    )

    return {
        filterNFTsByName,
        nfts,
        isLoading, // 返回加载状态
    }
}

