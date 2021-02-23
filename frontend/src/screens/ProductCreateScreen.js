import React from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'

const ProductCreateScreen = () => {

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <FormContainer>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId="category">
                    <Form.Label>Kategória</Form.Label>
                    <Form.Control as="select" required>
                        <option value=''>Vyberte z možností...</option>
                        <option>auto</option>
                        <option>elektronika</option>
                        <option>knihy</option>
                        <option>hračky</option>
                        <option>domáce potreby</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='title'>
                    <Form.Label>Názov</Form.Label>
                    <Form.Control type='text' placeholder='Zadajte názov produktu' required></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>Popis</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder='Zadajte popis produktu' required />
                </Form.Group>

                <Form.Group controlId="price">
                    <Form.Label>Cena</Form.Label>
                    <Form.Control type='number' componentClass={'input'} step={'.01'} min={0}
                        onChange={(e) => console.log(e.target.value)} />
                    <Form.Text id="priceBlock" muted> Ak chcete niečo darovať zadajte 0 </Form.Text>
                </Form.Group>

                <Form.Group controlId="conditionBox">
                    <Form.Label>Stav tovaru</Form.Label>
                    <Form.Check type="radio" name='condition' value='new' label="nový" required />
                    <Form.Check type="radio" name='condition' value='used' label="použitý" required />
                    <Form.Check type="radio" name='condition' value='handmade' label="vlastná výroba" required />
                </Form.Group>

                <Form.Group controlId="classificationBox">
                    <Form.Label>Typ</Form.Label>
                    <Form.Check type="radio" name='classification' value='supply' label="ponuka" required />
                    <Form.Check type="radio" name='classification' value='demand' label="dopyt" required />
                    <Form.Check type="radio" name='classification' value='donor' label="darujem" required />
                </Form.Group>

                <Form.Group controlId="moreProperties">
                    <Form.Label>Pridaj ďalšie vlastnosti</Form.Label>
                </Form.Group>

                <Button type='submit' variant='indigo'>ULOŽIŤ</Button>
            </Form>
        </FormContainer>
    )
}

export default ProductCreateScreen
