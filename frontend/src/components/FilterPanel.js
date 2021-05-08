import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

const FilterPanel = ({ history, keyword, sortKey }) => {
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

    useEffect(() => {
        // obnovit hodnoty vo filter panely
        setClassification({ 'supply': true, 'demand': true, 'donor': true })
        setCondition({ 'new': true, 'used': true, 'handmade': true })
    }, [keyword])

    const submitHandler = (e) => {
        e.preventDefault()

        let filterStr = ""
        Object.keys(classification).map((keyName) => (
            classification[keyName] ? filterStr += "1" : filterStr += "0"
        ))
        Object.keys(condition).map((keyName) => (
            condition[keyName] ? filterStr += "1" : filterStr += "0"
        ))

        let url = ''

        if (sortKey) {
            url += `/sort/${sortKey}`
        }

        if (keyword) {
            url += `/search/${keyword}`
        }

        if (filterStr !== '111111') {
            url += `/filter/${filterStr}/page/1`
            history.push(url)
        } else {
            url += '/page/1'
            history.push(url)
        }
    }

    return (
        <Form onSubmit={submitHandler}>

            <Form.Group as={Row} controlId="classificationBox" className='mb-0' >
                <Form.Label column sm="1">Typ</Form.Label>
                <Col sm="6">
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
                </Col>
            </Form.Group >

            <Form.Group as={Row} controlId="conditionBox" >
                <Form.Label column sm="1">Stav</Form.Label>
                <Col sm="11">
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
                </Col>
            </Form.Group>
            {/* 
            <div>{JSON.stringify(classification)}</div>
            <div>{JSON.stringify(condition)}</div> */}
            {/* <Button type='submit' variant='indigo' >Použiť filter!</Button> */}
            <button className='my-btn-primary fw-500' type='submit'>Použiť filter!</button>
        </Form>

    )
}

export default FilterPanel