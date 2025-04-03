'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Router } from 'next/router'
import axios from 'axios'
import { ethers } from 'ethers'
//
import {
    ETHEREUM_METHODS,
    nftMarketplaceAbi,
    nftMarketplaceAddress,
} from './constant'
import { pinata } from '@/utils/config'
import { UploadResponse } from 'pinata'
import { NFTMarketplace as INFTMarketplace } from '@/contract/typechain-types/index'


export type NFTMarketplaceContextType = {
    titleData: string
    currentAccount: string
    checkIfWalletConnected: () => void
    connectWallect: () => void
    uploadToIPFS: (file: File) => Promise<UploadResponse>
    createNFT: (NFTData: {
        price: string
        name: string
        description: string
        image: string
        uploadResponse: UploadResponse
    }) => void
    createSale: (
        url: string,
        price: string,
        isReselling?: boolean,
        id?: string,
    ) => void
    fetchNFTs: () => Promise<unknown[]>
    fetchMyNFTsOrListedNFTs: () => void
    buyNFT: () => void
}

// export interface INFTMarketplaceContract extends ethers.BaseContract {
//     getListingPrice: () => Promise<bigint>
//     name: () => Promise<string>
//     // 添加其他ABI中定义的方法...
//     createToken: (tokenURI: string, price: string) => Promise<bigint>
// }
//

/**
 * 获取智能合约实例
 * @link https://docs.ethers.org/v6/api/contract/#Contract
 * @link_v5 https://learnblockchain.cn/ethers_v5/api/contract/contract/
 * @param signerOrProvider
 * @returns 合约
 */
const fetchContract = (
    signerOrProvider: ethers.ContractRunner,
): INFTMarketplace => {
    return new ethers.BaseContract(
        nftMarketplaceAddress,
        nftMarketplaceAbi,
        signerOrProvider,
    ) as INFTMarketplace
}

/**
 * 连接钱包并且获取合约
 * @returns 合约
 */
const connectingWithSmartContract = async () => {
    let signer = null
    let provider
    try {
        if (window.ethereum == null) {
            console.log('MetaMask not installed; using read-only defaults')
            provider = ethers.getDefaultProvider()
        } else {
            provider = new ethers.BrowserProvider(window.ethereum)
            signer = await provider.getSigner()
        }
        return fetchContract(signer || provider)
    } catch (error) {
        console.log(error)
    }
}

export const NFTMarketplaceContext =
    React.createContext<NFTMarketplaceContextType>({
        titleData: '',
        currentAccount: '',
        checkIfWalletConnected: () => {},
        connectWallect: () => {},
        uploadToIPFS: (file: File) => Promise.resolve({} as UploadResponse),
        createNFT: (NFTData: {
            price: string
            name: string
            description: string
            image: string
            uploadResponse: UploadResponse
        }) => {},
        createSale: () => {},
        fetchNFTs: () => {},
        fetchMyNFTsOrListedNFTs: () => {},
        buyNFT: () => {},
    })

export const NFTMarketplaceProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const titleData = 'Discover, collect, and sell NFTs '
    // 当前用户
    const [currentAccount, setCurrentAccount] = useState<string>('')
    /**
     * 检查钱包是否已经授权连接
     * @returns
     */
    const checkIfWalletConnected = async () => {
        try {
            if (window.ethereum == null) {
                console.log('metamask don not install')
                return
            }
            const accounts = await window.ethereum.request({
                method: ETHEREUM_METHODS.ACCOUNTS,
            })
            if (Array.isArray(accounts) && accounts.length) {
                setCurrentAccount(accounts[0])
                console.log('钱包已连接! 已连接账户:', accounts[0])
            } else {
                console.log('钱包未连接！')
            }
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * 首次连接钱包
     * @returns
     */
    const connectWallect = async () => {
        try {
            if (window.ethereum == null) {
                console.log('metamask don not install')
                return
            }
            const accounts = await window.ethereum.request({
                method: ETHEREUM_METHODS.REQUEST_ACCOUNTS,
            })
            if (Array.isArray(accounts) && accounts.length) {
                setCurrentAccount(accounts[0])
                console.log('首次连接成功！已连接账户:', accounts[0])
                // 刷新
            } else {
                console.log('accounts are not found!')
            }
        } catch (error: any) {
            if (error.code === 4001) {
                console.log('用户拒绝了授权')
            }
            console.log(error)
        }
    }

    /**
     * 上传照片到ipfs
     * @param file 图片文件
     * @returns ipfs的图片url
     */
    const uploadToIPFS = async (file: File): Promise<UploadResponse> => {
        try {
            const urlRequest = await fetch('/api/url') // Fetches the temporary upload URL
            const urlResponse = await urlRequest.json() // Parse response
            const upload = await pinata.upload.public
                .file(file)
                .url(urlResponse.url) // Upload the file with the signed URL
            return upload
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    // 创建NFT
    const createNFT = async ({
        name,
        description,
        price,
        image,
        uploadResponse,
    }: {
        name: string
        description: string
        price: string
        image: string
        uploadResponse: UploadResponse
    }) => {
        try {
            if (!name || !description || !price || !image || !uploadResponse) {
                console.log('参数不全')
                return
            }
            const update = await pinata.files.public.update({
                id: uploadResponse.id,
                name,
                keyvalues: {
                    description,
                    image,
                },
            })
            console.log(update)
            await createSale(image, price)
        } catch (error) {
            console.log(error)
        }
    }

    // 售卖NFT
    const createSale = async (
        url: string,
        price: string,
        isReselling?: boolean,
        id?: string,
    ) => {
        try {
            const eth_price = ethers.parseEther(price)
            const contract = await connectingWithSmartContract()
            if (!contract) return console.log('合约获取失败！')
            // 获取价格
            const listingPrice = await contract.getListingPrice()
            let transaction = null
            if (!isReselling) {
                transaction = await contract.createToken(url, eth_price, {
                    value: listingPrice,
                })
            } else {
                transaction = await contract.resellToken(url, eth_price, {
                    value: listingPrice.toString(),
                })
            }
            // 等待区块
            await transaction.wait()
            console.log(transaction)
        } catch (error) {
            console.log(error)
        }
    }

    // 获取NFT
    const fetchNFTs = async () => {
        try {
            // url默认
            const provider = new ethers.JsonRpcProvider()
            const contract = fetchContract(provider)
            const data = await contract.fetchMarketItem()
            const formatData = await Promise.all(
                data.map(
                    async ({
                        tokenId,
                        seller,
                        owner,
                        price: unformattedPrice,
                    }) => {
                        const tokenURI = await contract.tokenURI(tokenId)
                        const cid = tokenURI.match(/ipfs\/(.*)/)?.at(-1)
                        return {
                            tokenId,
                            seller,
                            owner,
                            unformattedPrice,
                            cid,
                            image: tokenURI,
                        }
                    },
                ),
            )
            const allFiles = await pinata.files.public.list()
            console.log(allFiles)
            const f = allFiles.files.map(i => {
                const target = formatData.find(j => j.cid === i.cid)
                if (target) {
                    return {
                        tokenId: Number(target.tokenId),
                        seller: target.seller,
                        owner: target.owner,
                        price: ethers.formatEther(target.unformattedPrice),
                        image: target.image,
                        name: i.name,
                        description: i.keyvalues['description'],
                    }
                }
            })
            return f.filter(Boolean).reverse()
        } catch (error) {
            console.log(error)
        }
    }

    // 获取我的NFT，或者
    const fetchMyNFTsOrListedNFTs = async type => {
        return
        try {
            const contract = await connectingWithSmartContract()
            let data = null
            if (type === 'fetchItemsListed') {
                data = await contract.fetchItemsListed()
            } else {
                data = await contract.fetchMyNFT()
            }
            return await Promise.all(
                data.map(
                    ({ tokenId, seller, owner, price: unformattedPrice }) => {
                        const tokenURI = await contract.tokenURI(tokenId)
                        const {
                            data: { image, name, description },
                        } = await axios.get(tokenURI)
                        const price = ethers.formatEther(unformattedPrice)
                        return {
                            price,
                            tokenId: tokenId.toNumber(),
                            seller,
                            owner,
                            image,
                            name,
                            description,
                            tokenURI,
                        }
                    },
                ),
            )
        } catch (error) {
            console.log(error)
        }
    }

    // 购买NFT
    const buyNFT = async nft => {
        try {
            const contract = await connectingWithSmartContract()
            const price = ethers.formatEther(nft.price.toString())
            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price,
            })
            await transaction.wait()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <NFTMarketplaceContext.Provider
            value={{
                titleData,
                checkIfWalletConnected,
                connectWallect,
                uploadToIPFS,
                fetchNFTs,
                buyNFT,
                fetchMyNFTsOrListedNFTs,
                createNFT,
                currentAccount,
            }}
        >
            {children}
        </NFTMarketplaceContext.Provider>
    )
}
