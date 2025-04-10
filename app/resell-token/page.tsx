'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
//
import Style from './resellToken.module.css'
import formStyle from '@/AccountPage/Form/Form.module.css'
import { NFTMarketplaceContext } from '@/context/NFTMarketplaceContext'
import { useRouter, useSearchParams } from 'next/navigation'
import { pinata } from '@/utils/config'
import toast from 'react-hot-toast'
import { Button } from '@/components'

const ResellToken: React.FC = () => {
    const { createSale } = useContext(NFTMarketplaceContext)
    const router = useRouter()
    const searchParams = useSearchParams()
    //
    const [latestPrice, setLatestPrice] = useState<string>('')

    // 拿id, tokenURI
    const data = searchParams.get('data')
    const receivedData = JSON.parse(data || '{}')
    const { id, tokenURI, price: prePrice } = receivedData

    const fetchNFT = async () => {
        const allFiles = await pinata.files.public.list()
        console.log(allFiles)
    }

    const onResell = async () => {
        if(!tokenURI || !latestPrice || !id) return toast.error('参数不全！')
        await createSale(tokenURI, latestPrice, true, id)
        toast.success('上架成功!')
        router.push('/author')
    }

    useEffect(() => {
        // fetchNFT()
    }, [])
    return (
        <div className={Style.reSellToken}>
            <div className={Style.reSellToken_box}>
                <h1>Resell Your Token, Set Price</h1>
                <div className={formStyle.Form_box_input}>
                    <label htmlFor='price'>Price (now: {prePrice} eth)</label>
                    <input
                        type='number'
                        min={1}
                        placeholder='resell token price'
                        className={formStyle.Form_box_input_userName}
                        onInput={e => setLatestPrice(e.currentTarget.value)}
                    />
                </div>
                <div className={Style.reSellToken_box_image}>
                    <Image
                        unoptimized
                        src={tokenURI}
                        alt='resell-nft'
                        width={400}
                        height={400}
                    />
                </div>
                <div className={Style.reSellToken_box_btn}>
                    <Button
                        btnName='Resell NFT'
                        handleClick={onResell}
                    ></Button>
                </div>
            </div>
        </div>
    )
}

export default ResellToken
