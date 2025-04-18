'use client'
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import Style from './Discover.module.css'
import Link from 'next/link'
import { useClickOutside } from '@/hooks'
const Discover = ({
    setDiscover,
}: {
    setDiscover: Dispatch<SetStateAction<boolean>>
}) => {
    const discover = [
        {
            name: 'Collection',
            link: 'collection',
        },
        {
            name: 'Search',
            link: 'search',
        },
        {
            name: 'Author Profile',
            link: 'author',
        },
        {
            name: 'NFT Detail',
            link: 'NFT-details',
        },
        {
            name: 'Account Setting',
            link: 'account',
        },
        {
            name: 'Connect Wallet',
            link: 'connect-wallet',
        },
        {
            name: 'Blog',
            link: 'blog',
        },
    ]
    const wrapperRef = useRef<HTMLDivElement>(null)
    useClickOutside(wrapperRef, () => setDiscover(false))
    return (
        <div ref={wrapperRef}>
            {discover.map((el, i) => (
                <div key={i + 1} className={Style.discover}>
                    <Link
                        onClick={() => setDiscover(false)}
                        href={{ pathname: `${el.link}` }}
                    >
                        {el.name}
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Discover
