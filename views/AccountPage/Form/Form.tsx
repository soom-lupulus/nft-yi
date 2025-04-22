import React, { useContext, useEffect, useRef, useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { MdOutlineHttp, MdOutlineContentCopy } from 'react-icons/md'

//INTERNAL IMPORT
import Style from './Form.module.css'
import { Button } from '@/components'
import { NFTMarketplaceContext } from '@/context/NFTMarketplaceContext'
import toast from 'react-hot-toast'

const Form = () => {
    const { currentAccount } = useContext(NFTMarketplaceContext)
    const [profile, setProfile] = useState({
        username: '匿名用户',
        email: '',
    })
    const addressRef = useRef<HTMLInputElement>(null)
    const updateProfile = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(profile)
        fetch(
            `/api/v1/users?walletAddress=${currentAccount}&username=${profile.username}&email=${profile.email}`,
            { method: 'PUT' },
        )
            .then(async res => {
                if (!res.ok) {
                    return Promise.reject(await res.json())
                }
                return res.json()
            })
            .then(res => {
                toast.success('修改成功！')
            })
            .catch(err => {
                toast.error(err.msg)
            })
    }
    const copyAddress = () => {
        const address = addressRef.current?.value || ''
        navigator.clipboard.writeText(address)
        toast.success('已复制钱包地址')
    }
    useEffect(() => {
        if (!currentAccount) {
            setProfile({
                username: '匿名用户',
                email: '',
            })
            return
        }
        fetch(`/api/v1/users?walletAddress=${currentAccount}`, {
            method: 'GET',
        })
            .then(v => v.json())
            .then(res => {
                console.log(res)
                setProfile(res.data)
            })
    }, [currentAccount])
    return (
        <div className={Style.Form}>
            <div className={Style.Form_box}>
                <form>
                    <div className={Style.Form_box_input}>
                        <label htmlFor='name'>Username</label>
                        <input
                            type='text'
                            placeholder='username*'
                            value={profile.username}
                            onChange={e =>
                                setProfile({
                                    ...profile,
                                    username: e.target.value,
                                })
                            }
                            className={Style.Form_box_input_userName}
                        />
                    </div>

                    <div className={Style.Form_box_input}>
                        <label htmlFor='email'>Email</label>
                        <div className={Style.Form_box_input_box}>
                            <div className={Style.Form_box_input_box_icon}>
                                <HiOutlineMail />
                            </div>

                            <input
                                type='email'
                                placeholder='Email?'
                                value={profile.email}
                                onChange={e =>
                                    setProfile({
                                        ...profile,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className={Style.Form_box_input}>
                        <label htmlFor='wallet'>Wallet address</label>
                        <div className={Style.Form_box_input_box}>
                            <div className={Style.Form_box_input_box_icon}>
                                <MdOutlineHttp />
                            </div>
                            <input
                                disabled
                                type='text'
                                value={currentAccount || '请登录您的钱包账户！'}
                                ref={addressRef}
                            />
                            <div
                                className={Style.Form_box_input_box_icon}
                                onClick={copyAddress}
                            >
                                <MdOutlineContentCopy />
                            </div>
                        </div>
                    </div>

                    <div className={Style.Form_box_btn}>
                        {currentAccount && (
                            <Button
                                btnName='Update profile'
                                handleClick={updateProfile}
                                classStyle={Style.button}
                            />
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form
