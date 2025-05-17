'use client'
import React, { useState } from 'react'
import { MdOutlineHttp, MdOutlineAttachFile } from 'react-icons/md'
import { FaPercent } from 'react-icons/fa'
import { AiTwotonePropertySafety } from 'react-icons/ai'
import { TiTick } from 'react-icons/ti'
import Image from 'next/image'
import { debounce } from 'lodash/fp'
//
import Style from './Upload.module.css'
import formStyle from '@/views/AccountPage/Form/Form.module.css'
import images from '@/img'
import { Button } from '@/components'
import { DropZone } from './index'
import { NFTMarketplaceContextType } from '@/context/typing'
import { UploadResponse } from 'pinata'
import toast from 'react-hot-toast'

type IUploadNFTProps = Pick<
    NFTMarketplaceContextType,
    'uploadToIPFS' | 'createNFT'
>
const UploadNFT = ({ uploadToIPFS, createNFT }: IUploadNFTProps) => {
    const [price, setPrice] = useState<string>('')
    const [active, setActive] = useState(0)
    const [name, setName] = useState('')
    // const [website, setWebsite] = useState('')
    const [description, setDescription] = useState('')
    const [royalty, setRoyalty] = useState<number>()
    // const [fileSize, setFileSize] = useState('')
    const [category, setCategory] = useState(0)
    // const [properties, setProperties] = useState('')
    const [image, setImage] = useState<string>('')
    const [uploadResponse, setUploadResponse] = useState<UploadResponse>(
        {} as UploadResponse,
    )

    const categoryArry = [
        {
            image: images.nft_image_1,
            category: 'Sports',
        },
        {
            image: images.nft_image_2,
            category: 'Arts',
        },
        {
            image: images.nft_image_3,
            category: 'Music',
        },
        {
            image: images.nft_image_1,
            category: 'Digital',
        },
        {
            image: images.nft_image_2,
            category: 'Time',
        },
        {
            image: images.nft_image_3,
            category: 'Photography',
        },
    ]

    return (
        <div className={Style.upload}>
            <DropZone
                title='JPG, PNG, WEBM , MAX 100MB'
                heading='Drag & drop file'
                subHeading='or Browse media on your device'
                name={name}
                // website={website}
                description={description}
                royalty={royalty}
                // fileSize={fileSize}
                category={category}
                // properties={properties}
                image={images.upload}
                setImage={setImage}
                uploadToIPFS={uploadToIPFS}
                setUploadResponse={setUploadResponse}
            />

            <div className={Style.upload_box}>
                <div className={formStyle.Form_box_input}>
                    <label htmlFor='nft'>NFT Name</label>
                    <input
                        type='text'
                        placeholder='set your NFT name'
                        className={formStyle.Form_box_input_userName}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                {/* <div className={formStyle.Form_box_input}>
                    <label htmlFor='website'>Website</label>
                    <div className={formStyle.Form_box_input_box}>
                        <div className={formStyle.Form_box_input_box_icon}>
                            <MdOutlineHttp />
                        </div>

                        <input
                            type='text'
                            placeholder='website'
                            onChange={e => setWebsite(e.target.value)}
                        />
                    </div>

                    <p className={Style.upload_box_input_para}>
                        Ciscrypt will include a link to this URL on this item's
                        detail page, so that users can click to learn more about
                        it. You are welcome to link to your own webpage with
                        more details.
                    </p>
                </div> */}

                <div className={formStyle.Form_box_input}>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        name=''
                        id=''
                        cols='30'
                        rows='6'
                        placeholder='something about yourself in few words'
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>
                    {/* <p>
                        The description will be included on the items detail
                        page underneath its image. Markdown syntax is supported.
                    </p> */}
                </div>

                {/* <div className={formStyle.Form_box_input}>
                    <label htmlFor='name'>Choose collection</label>
                    <p className={Style.upload_box_input_para}>
                        Choose an exiting liked collection
                    </p>

                    <div className={Style.upload_box_slider_div}>
                        {categoryArry.map((el, i) => (
                            <div
                                className={`${Style.upload_box_slider} ${
                                    active == i + 1 ? Style.active : ''
                                }`}
                                key={i + 1}
                                onClick={() => (
                                    setActive(i + 1), setCategory(el.category)
                                )}
                            >
                                <div className={Style.upload_box_slider_box}>
                                    <div
                                        className={
                                            Style.upload_box_slider_box_img
                                        }
                                    >
                                        <Image
                                            src={el.image}
                                            alt='background image'
                                            width={70}
                                            height={70}
                                            className={
                                                Style.upload_box_slider_box_img_img
                                            }
                                        />
                                    </div>
                                    <div
                                        className={
                                            Style.upload_box_slider_box_img_icon
                                        }
                                    >
                                        <TiTick />
                                    </div>
                                </div>
                                <p>Crypto Legend - {el.category} </p>
                            </div>
                        ))}
                    </div>
                </div> */}

                <div className={formStyle.Form_box_input_social}>
                    <div className={formStyle.Form_box_input}>
                        <label htmlFor='Royalties'>Royalties</label>
                        <div className={formStyle.Form_box_input_box}>
                            <div className={formStyle.Form_box_input_box_icon}>
                                <FaPercent />
                            </div>
                            <input
                                type='number'
                                placeholder='Max 20%'
                                onChange={e => {
                                    const value = e.target.value
                                    const parsedValue =
                                        value === '' ? null : parseFloat(value)

                                    if (parsedValue === null) {
                                        setRoyalty(0)
                                    } else if (isNaN(parsedValue)) {
                                        toast.error('请输入有效的数字')
                                    } else if (
                                        parsedValue < 0 ||
                                        parsedValue > 100
                                    ) {
                                        toast.error(
                                            '版税百分比必须在 0 到 100 之间',
                                        )
                                    } else {
                                        setRoyalty(
                                            Math.floor(parsedValue * 100),
                                        ) // 向下取整，转换为整数
                                    }
                                }}
                            />
                        </div>
                    </div>
                    {/* <div className={formStyle.Form_box_input}>
                        <label htmlFor='size'>Size</label>
                        <div className={formStyle.Form_box_input_box}>
                            <div className={formStyle.Form_box_input_box_icon}>
                                <MdOutlineAttachFile />
                            </div>
                            <input
                                type='text'
                                placeholder='165MB'
                                onChange={e => setFileSize(e.target.value)}
                            />
                        </div>
                    </div> */}
                    {/* <div className={formStyle.Form_box_input}>
                        <label htmlFor='Propertie'>Propertie</label>
                        <div className={formStyle.Form_box_input_box}>
                            <div className={formStyle.Form_box_input_box_icon}>
                                <AiTwotonePropertySafety />
                            </div>
                            <input
                                type='text'
                                placeholder='Propertie'
                                onChange={e => setProperties(e.target.value)}
                            />
                        </div>
                    </div> */}
                    <div className={formStyle.Form_box_input}>
                        <label htmlFor='Price'>Price</label>
                        <div className={formStyle.Form_box_input_box}>
                            <div className={formStyle.Form_box_input_box_icon}>
                                <AiTwotonePropertySafety />
                            </div>
                            <input
                                type='text'
                                placeholder='Price'
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className={Style.upload_box_btn}>
                    <Button
                        btnName='Upload'
                        handleClick={debounce(300)(async () =>
                            createNFT({
                                price,
                                description,
                                royalty,
                                image,
                                name,
                                uploadResponse,
                            }),
                        )}
                        classStyle={Style.upload_box_btn_style}
                    />
                    <Button
                        btnName='Preview'
                        handleClick={() => {}}
                        classStyle={Style.upload_box_btn_style}
                    />
                </div>
            </div>
        </div>
    )
}

export default UploadNFT
