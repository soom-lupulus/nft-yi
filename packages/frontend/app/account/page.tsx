'use client'
import React, { useState, useMemo, useCallback, useContext } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'

//INTERNAL IMPORT
import Style from './account.module.css'
import images from '@/img'
import From from '@/views/AccountPage/Form/Form'

const Account = () => {
    const [fileUrl, setFileUrl] = useState('')

    const onDrop = useCallback(async (acceptedFile: File[]) => {
        // setFileUrl(acceptedFile[0]);
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
        <div className={Style.account}>
            <div className={Style.account_info}>
                <h1>Profile settings</h1>
                <p>
                    You can set preferred display name, create your profile URL
                    and manage other personal settings.
                </p>
            </div>

            <div className={Style.account_box}>
                <div className={Style.account_box_img} {...getRootProps()}>
                    {/* <input {...getInputProps()} /> */}
                    <Image
                        src={images.avatar}
                        alt='account upload'
                        width={150}
                        height={150}
                        className={Style.account_box_img_img}
                    />
                    {/* <p className={Style.account_box_img_para}>Change Image</p> */}
                </div>
                <div className={Style.account_box_from}>
                    <From />
                </div>
            </div>
        </div>
    )
}

export default Account
