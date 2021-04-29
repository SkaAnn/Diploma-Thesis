import React, { useState, useEffect } from 'react'
import Select from 'react-select';

const SortPanel = ({ history, keyword, filter, prevProps }) => {
    const [sortKey, setSortKey] = useState()
    const [oldKeyword, setOldKeyword] = useState('')

    const customStyles = {
        control: base => ({
            ...base,
            height: 20,
            minHeight: 35
        })
    };

    const [state, setState] = useState({})

    const handleChange = (selectedOption) => {
        setState({ selectedOption });
        setSortKey(selectedOption.value)
    };

    const { selectedOption } = state;

    const sortOptions = [
        { label: 'najnovšie', value: 'time_asc' },
        { label: 'najstaršie', value: 'time_desc' },
        { label: 'najlacnejšie', value: 'price_asc' },
        { label: 'najdrahšie', value: 'price_desc' },
    ]

    const componentDidUpdate = (prevProps) => {
        if (oldKeyword !== keyword) {//match.params.pageNumber) {
            setOldKeyword(keyword)//match.params.pageNumber);
            // vynulovat
            setSortKey('')
            setState({ selectedOption: '' })
            return true
        }
        return false
    }

    useEffect(() => {
        const reload = componentDidUpdate(prevProps)

        if (sortKey && !reload) {
            if (keyword || filter) {
                let url = ''
                if (sortKey === 'time_asc') {
                    url += '/sort/time_asc'
                    // history.push(`/sort/time_asc/search/${keyword}/page/1`)
                } else {
                    url += `/sort/${sortKey}`
                    // history.push(`/sort/${sortKey}/search/${keyword}/page/1`)
                }

                if (keyword) url += `/search/${keyword}`

                if (filter) url += `/filter/${filter}`

                url += '/page/1'
                history.push(url)

            } else {
                if (sortKey === 'time_asc') {
                    history.push('/')
                }
                else {
                    history.push(`/sort/${sortKey}`)
                }
            }
        }

    }, [sortKey, keyword])


    return (
        <Select
            value={selectedOption}
            onChange={handleChange}
            options={sortOptions}
            placeholder={<span>Vyberte...</span>}
            styles={customStyles}
        />

    )
}

export default SortPanel