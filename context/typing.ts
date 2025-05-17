import { UploadResponse } from 'pinata'

export type NFTInfoType = {
    tokenId: number
    seller: string
    owner: string
    price: string
    image: string
    name: string
    description: string
}

export type NFTFormType = {
    price: string
    royalty: number
    name: string
    description: string
    image: string
    uploadResponse: UploadResponse
}

export type NFTMarketplaceContextType = {
    titleData: string
    currentAccount: string
    accountEth: string
    checkIfWalletConnected: () => void
    connectWallect: () => void
    uploadToIPFS: (file: File) => Promise<UploadResponse>
    createNFT: (NFTData: {
        price: string
        name: string
        royalty: number
        description: string
        image: string
        uploadResponse: UploadResponse
    }) => void
    createSale: (
        url: string,
        price: string,
        royalty: number,
        isReselling?: boolean,
        id?: string,
    ) => void
    fetchNFTs: () => Promise<NFTInfoType[]>
    fetchMyNFTsOrListedNFTs: (
        type: 'fetchItemListed' | 'fetchMyNFTs',
    ) => Promise<
        {
            cid: string
            image: string
            owner: string
            seller: string
            tokenId: bigint
            price: string
        }[]
    >
    buyNFT: (nft: { price: string; tokenId: string }) => void
    getBalance: (address?: string) => Promise<string>
    logout: () => void
}