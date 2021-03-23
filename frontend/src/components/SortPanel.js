import React, { useState } from 'react'
import { Row, Form, Button } from 'react-bootstrap'

const SortPanel = ({ history, keyword }) => {
    const [sortKey, setSortKey] = useState()

    // console.log(`init sortKey: ${sortKey}`)

    const submitHandler = (e) => {
        e.preventDefault()
        // console.log(`sortKey: ${sortKey}`)

        if (keyword) {
            if (sortKey === '') {
                history.push(`/sort/time_asc/search/${keyword}/page/1`)
            } else {
                history.push(`/sort/${sortKey}/search/${keyword}/page/1`)
            }
        } else {
            if (sortKey === '') {
                history.push('/')
            }
            else {
                history.push(`/sort/${sortKey}`)
            }
        }

        // if (sortKey === '') {
        //     history.push('/')
        // } else {
        //     if (keyword) {
        //         history.push(`/sort/${sortKey}/search/${keyword}/page/1`)
        //     } else {
        //         history.push(`/sort/${sortKey}`)
        //     }
        // }
    }

    return (
        <Row>
            <Form onSubmit={submitHandler} inline>
                <Button type='submit' onClick={(e) => setSortKey('')} variant='outline-success' className='p-2'>
                    Najnovšie</Button>
                <Button type='submit' onClick={(e) => setSortKey('time_desc')} variant='outline-success' className='p-2'>
                    Najstaršie</Button>
                <Button type='submit' onClick={(e) => setSortKey('price_asc')} variant='outline-success' className='p-2'>
                    Najlacnejšie</Button>
                <Button type='submit' onClick={(e) => setSortKey('price_desc')} variant='outline-success' className='p-2'>
                    Najdrahšie</Button>
            </Form>
        </Row>
    )
}

export default SortPanel
