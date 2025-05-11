import React, { useCallback, useEffect, useState } from 'react'
import { BsSearch, BsArrowRight } from 'react-icons/bs'

//INTERNAL IMPORT
import Style from './SearchBar.module.css'
const SearchBar = ({
    filterNFTsByName,
}: {
    filterNFTsByName: (name: string) => void
}) => {
    const [isComposing, setIsComposing] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')

    const handleCompositionStart = () => {
        setIsComposing(true)
    }
    const handleCompositionEnd = (value: string) => {
        setIsComposing(false)
    }
    useEffect(() => {
        if (isComposing) return
        filterNFTsByName(searchValue)
    }, [isComposing, searchValue])
    return (
        <div className={Style.SearchBar}>
            <div className={Style.SearchBar_box}>
                <BsSearch className={Style.SearchBar_box_icon} />
                <input
                    type='text'
                    placeholder='Type your keyword...'
                    value={searchValue}
                    onInput={e => setSearchValue(e.currentTarget.value)}
                    onChange={e => setSearchValue(e.currentTarget.value)}
                    onCompositionEnd={e =>
                        handleCompositionEnd(e.currentTarget.value)
                    }
                    onCompositionStart={handleCompositionStart}
                />
                <BsArrowRight className={Style.SearchBar_box_icon} />
            </div>
        </div>
    )
}

export default SearchBar
