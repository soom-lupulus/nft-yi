'use client'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

//INTRNAL IMPORT
import Style from './DropZone.module.css'
import images from '@/img'
import { NFTMarketplaceContextType } from '@/context/typing'
import { pinata } from '@/utils/config'
import { UploadResponse } from 'pinata'
import toast from 'react-hot-toast'
import { Loading } from '@/components'

type IDropZoneProps = {
    uploadToIPFS: NFTMarketplaceContextType['uploadToIPFS']
    setUploadResponse: React.Dispatch<React.SetStateAction<UploadResponse>>
    title: string
    heading: string
    subHeading: string
    name: string
}
const DropZone = ({
    title,
    heading,
    subHeading,
    name,
    website,
    description,
    royalties,
    fileSize,
    category,
    properties,
    image,
    setImage,
    uploadToIPFS,
    setUploadResponse,
}: IDropZoneProps) => {
    const [fileUrl, setFileUrl] = useState('')
    const [loading, setLoading] = useState(false)

    const onDrop = useCallback(async (acceptedFile: File[]) => {
        try {
            if (acceptedFile[0]) {
                setLoading(true)
                const uploadres = await uploadToIPFS(acceptedFile[0])
                // https://${gateway}/ipfs/${cid}
                // const url = `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`
                const fileUrl = await pinata.gateways.public.convert(
                    uploadres.cid,
                )
                setFileUrl(fileUrl)
                setImage(fileUrl)
                setUploadResponse(uploadres)
            } else {
                console.log('file not found')
                toast.error('file not found')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/tiff': ['.tif', '.tiff'],
            'image/png': ['.png'],
            'image/svg+xml': ['.svg'],
            'image/webp+xml': ['.webp'],
        },
        maxSize: 5000000,
    })
    return (
        <div className={Style.DropZone}>
            {loading ? (
                <Loading />
            ) : (
                <div className={Style.DropZone_box} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className={Style.DropZone_box_input}>
                        <p>{title}</p>
                        <div className={Style.DropZone_box_input_img}>
                            <Image
                                src={image}
                                alt='upload'
                                width={100}
                                height={100}
                                className={Style.DropZone_box_input_img_img}
                            />
                        </div>
                        <p>{heading}</p>
                        <p>{subHeading}</p>
                    </div>
                </div>
            )}

            {fileUrl && (
                <aside className={Style.DropZone_box_aside}>
                    <div className={Style.DropZone_box_aside_box}>
                        <Image
                            unoptimized
                            src={fileUrl}
                            alt='nft image'
                            width={200}
                            height={200}
                        />

                        <div className={Style.DropZone_box_aside_box_preview}>
                            <div
                                className={
                                    Style.DropZone_box_aside_box_preview_one
                                }
                            >
                                <p>
                                    <samp>NFT Name:</samp>
                                    {name || ''}
                                </p>
                                <p>
                                    <samp>Website:</samp>
                                    {website || ''}
                                </p>
                            </div>

                            <div
                                className={
                                    Style.DropZone_box_aside_box_preview_two
                                }
                            >
                                <p>
                                    <span>Description</span>
                                    {description || ''}
                                </p>
                            </div>

                            <div
                                className={
                                    Style.DropZone_box_aside_box_preview_three
                                }
                            >
                                <p>
                                    <span>Royalties</span>
                                    {royalties || ''}
                                </p>
                                <p>
                                    <span>FileSize</span>
                                    {fileSize || ''}
                                </p>
                                <p>
                                    <span>Properties</span>
                                    {properties || ''}
                                </p>
                                <p>
                                    <span>Category</span>
                                    {category || ''}
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            )}
        </div>
    )
}

export default DropZone
