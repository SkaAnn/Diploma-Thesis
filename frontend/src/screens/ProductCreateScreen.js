import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'

const ProductCreateScreen = () => {

    // Local state
    const [propsList, setPropsList] = useState([]);

    // Handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...propsList];
        list[index][name] = value;
        setPropsList(list);
    };

    // Handle click event of the Remove button
    const handleRemoveClick = index => {
        console.log(`remove ${index}`)
        const list = [...propsList];
        console.log(`list before ${JSON.stringify(list)}`)
        list.splice(index, 1);
        console.log(`list after ${JSON.stringify(list)}`)
        setPropsList(list);
    };

    // Handle click event of the Add button
    const handleAddClick = () => {
        setPropsList([...propsList, { key: '', val: '' }]);
    };

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
                        <option value='car'>auto</option>
                        <option value='elektro'>elektronika</option>
                        <option value='books'>knihy</option>
                        <option value='toys'>hračky</option>
                        <option value='household'>domáce potreby</option>
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
                    <Form.Control type='number' step={'.01'} min={0}
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

                {/* https://www.cluemediator.com/add-or-remove-input-fields-dynamically-with-reactjs */}
                {propsList.length === 0
                    ? <Button type='button' className='btn btn-primary' onClick={handleAddClick}>Pridať</Button>
                    :
                    propsList.map((x, i) => {
                        return (
                            <Form.Group>
                                <Form.Control
                                    type='text'
                                    name='key'
                                    placeholder='Zadajte názov vlastnosti'
                                    value={x.key}
                                    onChange={e => handleInputChange(e, i)}
                                />

                                <Form.Control
                                    type='text'
                                    className="ml10"
                                    name='val'
                                    placeholder='Zadajte hodnotu vlastnosti'
                                    value={x.val}
                                    onChange={e => handleInputChange(e, i)}
                                />

                                <div className="btn-box">
                                    {propsList.length >= 1 &&
                                        <Button type='button' className="mr10" onClick={() => handleRemoveClick(i)}>
                                            <i className="fas fa-trash" /> Odstrániť</Button>
                                    }
                                    {propsList.length - 1 === i &&
                                        <Button type='button' onClick={handleAddClick} className="btn btn-outline-primary">
                                            <i className="fas fa-plus-circle" /> Pridať</Button>}
                                </div>
                            </Form.Group>
                        );
                    })}
                
                <div style={{ marginTop: 20 }}>{JSON.stringify(propsList)}</div>

                <Button type='submit' variant='indigo' style={{ width: '100%' }}>ULOŽIŤ</Button>
            </Form>
        </FormContainer>
    )
}

export default ProductCreateScreen
