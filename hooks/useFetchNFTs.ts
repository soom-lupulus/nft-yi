import React, { useCallback, useContext, useEffect, useState } from 'react'
import { NFTInfoType, NFTMarketplaceContext } from '@/context/NFTMarketplaceContext'

export default function useFetchNFTs() {
    const { fetchNFTs } = useContext(NFTMarketplaceContext)
    const [nfts, setNFTs] = useState<NFTInfoType[]>([])
    const [nftsCopy, setNFTsCopy] = useState<NFTInfoType[]>([])

    useEffect(() => {
        fetchNFTs().then(res => {
            setNFTs(res)
            setNFTsCopy(res)
        })
    }, [])

    const filterNFTsByName = useCallback(
        (name: string) => {
            const filteredNFTs = nfts.filter(n => n.name.toLowerCase().includes(name.toLowerCase()))
            !name ? setNFTs(nftsCopy) : setNFTs(filteredNFTs)
        },
        [nfts],
    )

    return {
        filterNFTsByName,
        nfts,
    }
}

