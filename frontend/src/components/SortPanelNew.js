import React, { useState, useEffect } from 'react'
import ReactSelect from '../components/ReactSelect'

const SortPanelNew = ({ history, keyword }) => {
    const [sortKey, setSortKey] = useState()

    const customStyles = {
        control: base => ({
          ...base,
          height: 20,
          minHeight: 35
        })
      };

    const sortOptions = [
        { label: 'najnovšie', value: 'time_asc' },
        { label: 'najstaršie', value: 'time_desc' },
        { label: 'najlacnejšie', value: 'price_asc' },
        { label: 'najdrahšie', value: 'price_desc' },
    ]

    useEffect(() => {
        //const onChangeHandler = (e) => {
        // const sortKey = e.target.value;
        // console.log(`sortKey: ${sortKey}`)
        // if (sortKey === 'time_asc') {
        //     history.push('/')
        // } else {
        //     history.push(`/sort/${sortKey}`)
        // }
        if (sortKey) {
            if (keyword) {
                if (sortKey === 'time_asc') {
                    history.push(`/sort/time_asc/search/${keyword}/page/1`)
                } else {
                    history.push(`/sort/${sortKey}/search/${keyword}/page/1`)
                }
            } else {
                if (sortKey === 'time_asc') {
                    history.push('/')
                }
                else {
                    history.push(`/sort/${sortKey}`)
                }
            }
        }
    }, [sortKey])

    return (
        // <select className="my-auto browser-default custom-select" placeholder='Zoradiť podľa...' onChange={onChangeHandler}>
        //     <option value=''></option>
        //     <option value='time_asc'>Najnovšie</option>
        //     <option value='time_desc'>Najstaršie</option>
        //     <option value='price_asc'>Najlacnejšie</option>
        //     <option value='price_desc'>Najdrahšie</option>
        // </select>
        <ReactSelect req={false} options={sortOptions} onSelect={(val) => setSortKey(val.value)} styles={customStyles} />
        // <ReactSelect options={sortOptions} onChange={onChangeHandler} />
    )
}

export default SortPanelNew