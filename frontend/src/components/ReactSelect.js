import React, { useState } from 'react'
import BaseSelect from 'react-select';
import FixRequiredSelect from './FixRequiredSelect.js';

const ReactSelect = (props) => {

    const [state, setState] = useState({})

    const handleChange = (selectedOption) => {
        setState({ selectedOption });
        props.onSelect(selectedOption)
    };

    const { selectedOption } = state;

    const options = props.options

    const Select = (props) => (
        <FixRequiredSelect
            {...props}
            SelectComponent={BaseSelect}
            options={options}
        />
    );

    return (
        <>
            {props.req
                ? <Select value={selectedOption} onChange={handleChange} options={options} placeholder={<span>Vyberte...</span>} required />
                : <Select value={selectedOption} onChange={handleChange} options={options} placeholder={<span>Vyberte...</span>} />
            }
        </>
    )
}

export default ReactSelect
