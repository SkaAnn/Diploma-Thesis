import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const FilterPanel = () => {
    const [classification, setClassification] = useState({
        'supply': true,
        'demand': true,
        'donor': true
    })

    const [condition, setCondition] = useState({
        'new': true,
        'used': true,
        'handmade': true
    })

    const submitHandler = (e) => {
        e.preventDefault()
    }
    return (

        <Form onSubmit={submitHandler}>

            <Form.Group controlId="classificationBox" > 
                <Form.Label className='mr-3'>Typ</Form.Label>
                <Form.Check inline type='checkbox' name='classification' checked={classification.supply}
                    onChange={(e) => setClassification({ ...classification, supply: !classification.supply })}
                    label="ponuka" className='mr-3' />
                <Form.Check inline type='checkbox' name='classification' checked={classification.demand}
                    onChange={(e) => setClassification({ ...classification, demand: !classification.demand })}
                    label="dopyt" className='mr-3' />
                <Form.Check inline type='checkbox' name='classification' checked={classification.donor}
                    onChange={(e) => setClassification({ ...classification, donor: !classification.donor })}
                    label="darujem" />
                {/* </Form.Group> */}
            </Form.Group >

            <Form.Group controlId="conditionBox" > 
                <Form.Label className='mr-3'>Stav</Form.Label>
                <Form.Check inline type='checkbox' name='condition' checked={condition.new}
                    onChange={(e) => setCondition({ ...condition, new: !condition.new })}
                    label="nový tovar" className='mr-3' />
                <Form.Check inline type='checkbox' name='condition' checked={condition.used}
                    onChange={(e) => setCondition({ ...condition, used: !condition.used })}
                    label="použitý tovar" className='mr-3' />
                <Form.Check inline type='checkbox' name='condition' checked={condition.handmade}
                    onChange={(e) => setCondition({ ...condition, handmade: !condition.handmade })}
                    label="ručná výroba" />
                {/* </Form.Group> */}
            </Form.Group>

            <div>{JSON.stringify(classification)}</div>
            <div>{JSON.stringify(condition)}</div>
            <Button type='submit' variant='indigo' >Použiť filter!</Button>
        </Form>

    )
}

export default FilterPanel
