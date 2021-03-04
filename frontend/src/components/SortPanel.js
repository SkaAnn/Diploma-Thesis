import e from 'cors';
import React from 'react'

const SortPanel = ({ history }) => {

    const onChangeHandler = (e) => {
        const sortKey = e.target.value;
        console.log(`sortKey: ${sortKey}`)
        if (sortKey === 'time_asc') {
            history.push('/')
        } else {
            history.push(`/sort/${sortKey}`)
        }
    }

    return (
        <select className="my-auto browser-default custom-select" onChange={onChangeHandler}>
            <option value=''></option>
            <option value='time_asc'>Najnovšie</option>
            <option value='time_desc'>Najstaršie</option>
            <option value='price_asc'>Najlacnejšie</option>
            <option value='price_desc'>Najdrahšie</option>
        </select>
    )
}

export default SortPanel
