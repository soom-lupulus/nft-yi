import React from 'react'
import Style from './HelpCenter.module.css'
import Link from 'next/link'

const HelpCenter = () => {
    const helpCenter = [
        {
            name: 'About',
            link: 'about',
        },
        {
            name: 'Contact us',
            link: 'contact-us',
        },
        {
            name: 'Sign Up',
            link: 'sign-up',
        },
        {
            name: 'Sign In',
            link: 'sign-in',
        },
        {
            name: 'Subscription',
            link: 'subscription',
        },
    ]
    return (
        <div>
            <div className={Style.box}>
                {helpCenter.map((el, i) => (
                    <div key={i + 1} className={Style.helpCenter}>
                        <Link href={{ pathname: el.link }}>{el.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HelpCenter
