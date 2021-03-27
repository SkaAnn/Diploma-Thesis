import React, { useState, useEffect } from 'react'
import Select from 'react-select';

const SortPanelNew = ({ history, keyword, filter, prevProps }) => {
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
        console.log(`Option selected:`, selectedOption);
    };

    const { selectedOption } = state;

    const sortOptions = [
        { label: 'najnovšie', value: 'time_asc' },
        { label: 'najstaršie', value: 'time_desc' },
        { label: 'najlacnejšie', value: 'price_asc' },
        { label: 'najdrahšie', value: 'price_desc' },
    ]

    const componentDidUpdate = (prevProps) => {
        console.log("porovnanie ", keyword, oldKeyword)
        if (oldKeyword !== keyword) {//match.params.pageNumber) {
            console.log("zmenil sa ", keyword, oldKeyword)
            setOldKeyword(keyword)//match.params.pageNumber);
            // vynulovat
            setSortKey('')
            setState({ selectedOption: '' })
            return true
            // aj vynulovat react select
        }
        return false
    }

    useEffect(() => {
        console.log('OBNOVIL SA SORT PANEL')

        console.log('sortkey', sortKey)

        const reload = componentDidUpdate(prevProps)

        console.log('upravit linku')
        console.log('sortkey', sortKey)



        if (sortKey && !reload) {
            console.log('som tu')
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
        // <select className="my-auto browser-default custom-select" placeholder='Zoradiť podľa...' onChange={onChangeHandler}>
        //     <option value=''></option>
        //     <option value='time_asc'>Najnovšie</option>
        //     <option value='time_desc'>Najstaršie</option>
        //     <option value='price_asc'>Najlacnejšie</option>
        //     <option value='price_desc'>Najdrahšie</option>
        // </select>
        // <ReactSelect req={false} options={sortOptions} onSelect={(val) => setSortKey(val.value)} styles={customStyles} />
        // <ReactSelect options={sortOptions} onChange={onChangeHandler} />

        <Select
            value={selectedOption}
            onChange={handleChange}
            options={sortOptions}
            placeholder={<span>Vyberte...</span>}
            styles={customStyles}
        />

    )
}

export default SortPanelNew