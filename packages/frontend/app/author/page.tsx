'use client'
import React, { useState, useEffect, useContext } from 'react'

//INTERNAL IMPORT
import Style from './author.module.css'
import { Banner, NFTCardTwo } from '@/views/collectionPage/collectionIndex'
import { Brand, Title } from '@/components/'
import FollowerTabCard from '@/components/FollowerTab/FollowerTabCard/FollowerTabCard'
import images from '@/img'
import {
    AuthorProfileCard,
    AuthorTaps,
    AuthorNFTCardBox,
} from '@/views/authorPage'
import { NFTMarketplaceContext } from '@/context/NFTMarketplaceContext'

const Author = () => {
    const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(
        NFTMarketplaceContext,
    )
    const followerArray = [
        {
            background: images.creatorbackground1,
            user: images.user1,
        },
        {
            background: images.creatorbackground2,
            user: images.user2,
        },
        {
            background: images.creatorbackground3,
            user: images.user3,
        },
        {
            background: images.creatorbackground4,
            user: images.user4,
        },
        {
            background: images.creatorbackground5,
            user: images.user5,
        },
        {
            background: images.creatorbackground6,
            user: images.user6,
        },
    ]

    const [collectiables, setCollectiables] = useState(true)
    const [created, setCreated] = useState(false)
    const [like, setLike] = useState(false)
    const [follower, setFollower] = useState(false)
    const [following, setFollowing] = useState(false)

    const [nfts, setNFTs] = useState<
        {
            cid: string
            image: string
            owner: string
            seller: string
            tokenId: bigint
            price: string
        }[]
    >([])
    const [myNFTs, setMyNFTs] = useState<
        {
            cid: string
            image: string
            owner: string
            seller: string
            tokenId: bigint
            price: string
        }[]
    >([])

    useEffect(() => {
        if(currentAccount){
            fetchMyNFTsOrListedNFTs('fetchItemListed').then(nfts => {
                console.log(nfts)
                setNFTs(nfts)
            })
            fetchMyNFTsOrListedNFTs('fetchMyNFTs').then(nfts => {
                console.log(nfts)
                setMyNFTs(nfts)
            })
        }
    }, [currentAccount])

    return (
        <div className={Style.author}>
            <Banner bannerImage={images.creatorbackground2} />
            {/* <AuthorProfileCard currentAccount={currentAccount} /> */}
            <AuthorTaps
                setCollectiables={setCollectiables}
                setCreated={setCreated}
                setLike={setLike}
                setFollower={setFollower}
                setFollowing={setFollowing}
            />

            <AuthorNFTCardBox
                collectiables={collectiables}
                created={created}
                like={like}
                follower={follower}
                following={following}
                nfts={nfts}
                myNFTs={myNFTs}
            />
            {/* <Title
                heading='Popular Creators'
                paragraph='Click on music icon and enjoy NTF music or audio
'
            />
            <div className={Style.author_box}>
                {followerArray.map((el, i) => (
                    <FollowerTabCard i={i} el={el} key={i + 1} />
                ))}
            </div> */}

            <Brand />
        </div>
    )
}

export default Author
