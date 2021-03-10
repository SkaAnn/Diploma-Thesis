import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import ReactSelect from '../components/ReactSelect'
import { categoryOptions } from '../utils/options'
import Loader from '../components/Loader'
import UploadMultipleImages from '../components/UploadMultipleImages'

const ProductCreateScreen = ({ history }) => {
    const dispatch = useDispatch()

    // Component level states from Form
    // ---> REQUIRED
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')         // Need to pass onSelect={(val) => setCategory(val.value)}
    const [price, setPrice] = useState(0)
    // active set when product is created
    const [classification, setClassification] = useState('')
    const [condition, setCondition] = useState('')
    const [countInStock, setCountInStock] = useState(1)
    const [origin, setOrigin] = useState('')
    // ---> OPTIONAL
    const [brand, setBrand] = useState('')
    const [images, setImages] = useState([])
    const [size, setSize] = useState('')        // TODO: measures
    const [weight, setWeight] = useState('')
    const [shipping, setShipping] = useState([])
    const [propsList, setPropsList] = useState([])  // moreProperties

    // Global state
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productCreate = useSelector(state => state.productCreate)
    const { loading, error: errorCreate, success: successCreate } = productCreate


    const uploadFiles = async (e) => {
        console.log(images)
        const formData = new FormData()
        formData.append('userId', userInfo._id);
        // formData.append('photos', images)    // photos in backend
        // https://stackoverflow.com/questions/65496648/cant-upload-multiple-files-by-using-multer-on-react
        for (var i = 0; i < images.length; i++) {
            formData.append('photos', images[i])
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post(`/api/upload/photos`, formData, config)
            console.log(data)
            return data

        } catch (error) {
            console.error(error)
            return error
        }
    }

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

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo) {
            history.push('/login')
        }

        if (successCreate) {
            // TODO prepnut na zoznam mojich produktov a vypisat uspesnu hlasku
            history.push(`/`)
        }

    }, [dispatch, userInfo, history, successCreate])

    const submitHandler = (e) => {
        e.preventDefault()

        console.log(images)

        // UPLOAD IMAGES
        const imagesArr = uploadFiles()
        console.log(imagesArr)

        // TODO: images upload >> images: imagesArr
        const newProduct = {
            name, description, category, price,
            active: true, classification, condition,
            countInStock, origin,
            moreProperties: propsList,

        }
        console.log(newProduct)
        // DISPATCH CREATE PRODUCT
        dispatch(createProduct(newProduct))
    }

    return (
        <FormContainer>
            <Form onSubmit={submitHandler}>
                <h2> Typ produktu </h2>

                <Form.Group as={Row} controlId="category">
                    <Form.Label column sm="3">Kategória</Form.Label>
                    <Col sm="9">
                        <ReactSelect req={true} options={categoryOptions} onSelect={(val) => setCategory(val.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="classificationBox" value={classification} onChange={(e) => setClassification(e.target.value)}>
                    <Form.Label column sm="3">Typ</Form.Label>
                    <Col sm="9">
                        <Form.Check className="form-check-inline mr-3" type="radio" name='classification' value='supply' label="ponuka" required />
                        <Form.Check className="form-check-inline mr-3" type="radio" name='classification' value='demand' label="dopyt" required />
                        <Form.Check className="form-check-inline" type="radio" name='classification' value='donor' label="darujem" required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="conditionBox" value={condition} onChange={(e) => setCondition(e.target.value)}>
                    <Form.Label column sm="3">Stav tovaru</Form.Label>
                    <Col sm="9">
                        <Form.Check className="form-check-inline mr-3" type="radio" name='condition' value='new' label="nový" required />
                        <Form.Check className="form-check-inline mr-3" type="radio" name='condition' value='used' label="použitý" required />
                        <Form.Check className="form-check-inline" type="radio" name='condition' value='handmade' label="vlastná výroba" required />
                    </Col>
                </Form.Group>

                <h2> Základné informácie </h2>
                <Form.Group as={Row} controlId='name'>
                    <Form.Label column sm="3">Názov</Form.Label>
                    <Col sm="9">
                        <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)}
                            placeholder='Zadajte názov produktu' required></Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="countInStock">
                    <Form.Label column sm="3" >Počet kusov</Form.Label>
                    <Col sm="9">
                        <Form.Control type='number' step={'1'} min={1}
                            value={countInStock} onChange={(e) => setCountInStock(Number(e.target.value))} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="price">
                    <Form.Label column sm="3">Cena</Form.Label>
                    <Col sm="9">
                        {classification && classification === 'donor' ?
                            <Form.Control plaintext readOnly value="Zadarmo" />
                            :
                            <Form.Control type='number' step={'.01'} min={0}
                                value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                        }
                        {/* <Form.Text id="priceBlock" muted> Ak chcete niečo darovať zadajte 0 </Form.Text> */}
                    </Col>
                </Form.Group>

                <Form.Group controlId='images'>
                    <Form.Label>Fotky</Form.Label>
                    <UploadMultipleImages onUpload={(val) => setImages(val)} />
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>Popis</Form.Label>
                    <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)}
                        placeholder='Zadajte popis produktu' rows={4} required />
                </Form.Group>

                <h2> Špecifikácia produktu </h2>

                <Form.Group as={Row} controlId='origin'>
                    <Form.Label column sm="3">Pôvod</Form.Label>
                    <Col sm="9">
                        <Form.Control type='text' value={origin} onChange={(e) => setOrigin(e.target.value)}
                            placeholder='Vyrobené v...' required ></Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId='brand'>
                    <Form.Label column sm="3">Výrobca</Form.Label>
                    {/* Značka */}
                    <Col sm="9">
                        <Form.Control type='text' value={brand} onChange={(e) => setBrand(e.target.value)}
                            placeholder='Značka produktu' ></Form.Control>
                        <Form.Text id="brandBlock" muted> Ak nie je známa alebo na nej nezáleží zadajte pomlčku </Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group controlId='measures'>
                    <Form.Label>Rozmery výrobku</Form.Label>
                    {/* šírka, výška, hĺbka, váha */}
                    <Row>
                        <Col sm='6'>
                            <div className='form-check-inline w-5r'>šírka</div>
                            <Form.Control className='form-check-inline w-50 pad-control' type='text'
                                value={size} onChange={(e) => setSize(e.target.value)}
                                placeholder='' ></Form.Control>
                        </Col>
                        <Col sm='6'>
                            <div className='form-check-inline w-5r'>výška</div>
                            <Form.Control className='form-check-inline w-50 pad-control' type='text'
                                value={size} onChange={(e) => setSize(e.target.value)}
                                placeholder='' ></Form.Control>
                        </Col>
                        <Col sm='6'>
                            <div className='form-check-inline w-5r'>hĺbka</div>
                            <Form.Control className='form-check-inline w-50 pad-control' type='text'
                                value={size} onChange={(e) => setSize(e.target.value)}
                                placeholder='' ></Form.Control>
                        </Col>
                        <Col sm='6'>
                            <div className='form-check-inline w-5r'>hmotnosť</div>
                            <Form.Control className='form-check-inline w-50 pad-control' type='text'
                                value={weight} onChange={(e) => setWeight(e.target.value)}
                                placeholder='' ></Form.Control>
                        </Col>
                    </Row>
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
                            <Row key={i}>
                                <Col sm='6'>
                                    <Form.Control
                                        type='text'
                                        name='key'
                                        placeholder='Zadajte názov vlastnosti'
                                        value={x.key}
                                        onChange={e => handleInputChange(e, i)}
                                    />
                                </Col>

                                <Col sm='6'>
                                    <Form.Control
                                        type='text'
                                        // className="ml10"
                                        name='val'
                                        placeholder='Zadajte hodnotu vlastnosti'
                                        value={x.val}
                                        onChange={e => handleInputChange(e, i)}
                                    />
                                </Col>

                                <div className="btn-box">
                                    {propsList.length >= 1 &&
                                        <Button type='button' className="mr10" onClick={() => handleRemoveClick(i)}>
                                            <i className="fas fa-trash" /></Button>
                                    }
                                    {propsList.length - 1 === i &&
                                        <Button type='button' onClick={handleAddClick} className="btn btn-outline-primary">
                                            <i className="fas fa-plus-circle" /></Button>}
                                </div>
                            </Row>
                        );
                    })}

                <div style={{ marginTop: 20 }}>{JSON.stringify(propsList)}</div>

                <Button type='submit' variant='indigo' style={{ width: '100%' }}>ULOŽIŤ</Button>
            </Form>
        </FormContainer>
    )
}

export default ProductCreateScreen
