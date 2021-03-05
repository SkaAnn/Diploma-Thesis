import React, { useState } from 'react'
import BaseSelect from 'react-select';
import FixRequiredSelect from './FixRequiredSelect.js';

const ReactSelect = (props) => {

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
                ? <Select options={options} placeholder={<span>Vyberte...</span>} required />
                : <Select options={options} placeholder={<span>Vyberte...</span>} />
            }
        </>
    )
}

export default ReactSelect
