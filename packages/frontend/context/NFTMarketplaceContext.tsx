'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { BrowserProvider, ethers } from 'ethers'
import { useRouter } from 'next/navigation'
//
import {
    ETHEREUM_METHODS,
    nftMarketplaceAbi,
    nftMarketplaceAddress,
} from './constant'
import { pinata } from '@/utils/config'
import { UploadResponse } from 'pinata'
import { NFTMarketplace as INFTMarketplace } from '@contract/typechain-types'
import toast from 'react-hot-toast'
import { BigNumberish } from 'ethers'
import { generateMerkleProof } from '@/utils'
import {
    AccountInfo,
    NFTFormType,
    NFTInfoType,
    NFTMarketplaceContextType,
} from './typing'
import usePersistedState from '@/hooks/usePersistedState'

export const NFTMarketplaceContext =
    React.createContext<NFTMarketplaceContextType>({
        titleData: '',
        currentAccount: '',
        setCurrentAccount: () => {},
        accounts: [],
        checkIfWalletConnected: () => {},
        connectWallect: () => {},
        uploadToIPFS: (file: File) => Promise.resolve({} as UploadResponse),
        createNFT: (NFTFormData: NFTFormType) => {},
        createSale: () => {},
        fetchNFTs: () => Promise.resolve([] as NFTInfoType[]),
        fetchMyNFTsOrListedNFTs: () =>
            Promise.resolve(
                [] as {
                    cid: string
                    image: string
                    owner: string
                    seller: string
                    tokenId: bigint
                    price: string
                }[],
            ),
        buyNFT: async () => {},
        getBalance: (address?: string | undefined) => Promise.resolve(''),
        logout: () => {},
    })

export const NFTMarketplaceProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    // const titleData = 'Discover, collect, and sell NFTs '
    const titleData = `Amazing NFT，Go Discovering yours`
    // 当前用户
    const [currentAccount, setCurrentAccount] = usePersistedState<string>(
        'currentAccount',
        '',
    )
    const [accounts, setAccounts] = usePersistedState<AccountInfo[]>(
        'accounts',
        [],
    )
    const router = useRouter()
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
    const connectingWithSmartContract = useCallback(async () => {
        let signer = null
        let provider
        try {
            if (window.ethereum == null) {
                console.log('MetaMask not installed; using read-only defaults')
                provider = ethers.getDefaultProvider()
            } else {
                provider = new ethers.BrowserProvider(window.ethereum)
                signer = await provider.getSigner(currentAccount)
            }
            return fetchContract(signer || provider)
        } catch (error) {
            console.log(error)
        }
    }, [currentAccount])
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
                // toast.success(`钱包已连接!`)
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
                toast('请先安装MetaMask!')
                console.log('metamask don not install')
                return
            }
            // 请求用户授权
            const accounts = await window.ethereum.request({
                method: ETHEREUM_METHODS.REQUEST_ACCOUNTS,
            })
            if (Array.isArray(accounts) && accounts.length) {
                setCurrentAccount(accounts[0])
                const ethArr = await Promise.all(
                    accounts.map(account => getBalance(account)),
                )
                setAccounts(
                    accounts.map((account, index) => ({
                        account,
                        eth: ethArr[index],
                    })),
                )
                console.log('首次连接成功！已连接账户:', accounts[0])
                toast.success(`连接账户成功! `)
                // 同步数据库信息
                fetch(
                    `/api/v1/users?walletAddress=${accounts[0]}&username=匿名用户`,
                    {
                        method: 'POST',
                    },
                )
                    .then(res => res.json())
                    .then(res => {
                        console.log(res)
                    })
            } else {
                console.log('accounts are not found!')
            }
        } catch (error: any) {
            if (error.code === 4001) {
                console.log('用户拒绝了授权')
            }
            console.log(error)
            toast.error(error.message)
        }
    }

    const logout = async () => {
        await window.ethereum?.request({
            method: ETHEREUM_METHODS.WALLET_REVOKEPERMISSIONS,
            params: [
                {
                    eth_accounts: {}, // 撤销账户访问权限
                },
            ],
        })
        setCurrentAccount('')
        setAccounts([])
        toast.success('已断开钱包连接')
    }

    const listenWallet = () => {
        if (!window.ethereum) return toast.error('未检测到metamask钱包!')
        // 定义清理函数
        const cleanup = () => {
            if (!window.ethereum) return toast.error('未检测到metamask钱包!')
            window.ethereum.removeListener(
                'accountsChanged',
                handleAccountsChanged,
            )
            window.ethereum.removeListener('chainChanged', handleChainChanged)
        }

        const handleAccountsChanged = (accounts: string[]) => {
            console.log('Accounts changed:', accounts)
            if (accounts[0]) {
                setCurrentAccount(accounts[0])
            }
        }

        const handleChainChanged = (chainId: string) => {
            console.log('Chain changed:', chainId)
            window.location.reload()
        }
        console.log('监听开始！')

        // 添加监听
        window.ethereum.on(
            'accountsChanged',
            handleAccountsChanged as (...args: unknown[]) => void,
        )
        window.ethereum.on(
            'chainChanged',
            handleChainChanged as (...args: unknown[]) => void,
        )

        // 返回清理函数
        return cleanup
    }

    const getBalance = async (address?: string) => {
        try {
            const account = address || currentAccount
            if (!account) throw new Error('No account address provided')
            if (!window.ethereum) throw new Error('no metaMask installed')
            const provider = new ethers.BrowserProvider(window.ethereum)
            const balance = await provider.getBalance(account)
            return ethers.formatEther(balance) // 转换为 ETH 单位
        } catch (error) {
            console.error('Error fetching balance:', error)
            return '0'
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
        royalty,
        price,
        image,
        uploadResponse,
    }: NFTFormType) => {
        try {
            if (
                !name ||
                !description ||
                !price ||
                !image ||
                !uploadResponse ||
                !royalty
            ) {
                toast.error('参数不全，请检查参数！')
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
            await createSale(image, price, royalty)
            toast.success('铸造成功！')
        } catch (error) {
            console.log(error)
            toast.error('创建失败，请联系管理员！')
        }
    }

    // 售卖NFT
    const createSale = async (
        url: string,
        price: string,
        royalty: number,
        isReselling?: boolean,
        id?: BigNumberish,
    ) => {
        try {
            const eth_price = ethers.parseEther(price)
            const contract = await connectingWithSmartContract()
            if (!contract) return console.error('合约获取失败！')
            // 获取价格
            const listingPrice = await contract.getListingPrice()
            let transaction = null
            if (!isReselling) {
                transaction = await contract.createToken(
                    url,
                    eth_price,
                    royalty,
                    {
                        value: listingPrice,
                    },
                )
            } else {
                if (!id) return toast.error('resell失败，缺少参数NFT_tokenid')
                transaction = await contract.resellToken(id, eth_price, {
                    value: listingPrice.toString(),
                })
            }
            // 等待区块
            await transaction.wait()
            console.log(transaction)
            router.push('/search')
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    // 获取NFT
    const fetchNFTs = async () => {
        try {
            // url默认
            // const provider = new ethers.JsonRpcProvider()
            // const contract = fetchContract(provider)
            const contract = await connectingWithSmartContract()
            if (!contract) throw new Error('合约获取失败！')
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
            return f.filter(Boolean).reverse() as NFTInfoType[]
        } catch (error) {
            console.log(error)
            return []
        }
    }

    // 获取我的NFT，或者
    const fetchMyNFTsOrListedNFTs = useCallback(
        async (type: 'fetchItemListed' | 'fetchMyNFTs') => {
            try {
                const contract = await connectingWithSmartContract()
                if (!contract) {
                    toast.error('合约获取失败！')
                    return []
                }
                let data = null
                if (type === 'fetchItemListed') {
                    data = await contract.fetchItemListed()
                } else {
                    data = await contract.fetchMyNFTs()
                }
                const formatData = await Promise.all(
                    data.map(
                        async ({
                            tokenId,
                            seller,
                            owner,
                            price: unformattedPrice,
                        }) => {
                            const tokenURI = await contract.tokenURI(tokenId)
                            const cid = tokenURI.match(/ipfs\/(.*)/)?.at(-1)!
                            return {
                                tokenId,
                                seller,
                                owner,
                                price: ethers.formatEther(unformattedPrice),
                                cid,
                                image: tokenURI,
                            }
                        },
                    ),
                )
                return formatData
            } catch (error) {
                console.error(error)
                return []
            }
        },
        [connectingWithSmartContract],
    )

    // 购买NFT
    const buyNFT = async (nft: { price: string; tokenId: string }) => {
        try {
            const contract = await connectingWithSmartContract()
            if (!contract) return toast.error('合约获取失败！')
            const price = ethers.parseEther(nft.price.toString())
            // 证明
            const proof = await generateMerkleProof(currentAccount)
            const transaction = await contract.createMarketSale(
                nft.tokenId,
                proof,
                {
                    value: price,
                },
            )
            await transaction.wait()
            toast.success('购买成功！')
            router.push('/author')
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const cleanup = listenWallet()
        generateMerkleProof('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266').then(
            res => {
                // console.log(res)
            },
        )

        return () => {
            typeof cleanup === 'function' && cleanup()
        }
    }, [])

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
                createSale,
                currentAccount,
                setCurrentAccount,
                accounts,
                getBalance,
                logout,
            }}
        >
            {children}
        </NFTMarketplaceContext.Provider>
    )
}
