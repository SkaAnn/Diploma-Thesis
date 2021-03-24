import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import UploadMultipleImages from '../components/UploadMultipleImages'
import ReactSelect from '../components/ReactSelect'
import { categoryOptions } from '../utils/options'
import { createProduct } from '../actions/productActions'
import Message from '../components/Message'

// osetrit aby sa do propList nezaratavali prazdne polozky
const ProductCreateScreenNew = ({ history }) => {
    const dispatch = useDispatch()

    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({})
    const [images, setImages] = useState([])
    const [measures, setMeasures] = useState({
        width: '',
        height: '',
        depth: '',
        weight: ''
    })
    const [propsList, setPropsList] = useState([])  // moreProperties

    const [part, setPart] = useState(1)
    const [step1, setStep1] = useState(true)
    const [step2, setStep2] = useState(false)
    const [step3, setStep3] = useState(false)

    // Global state
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productCreate = useSelector(state => state.productCreate)
    const { loading, error: errorCreate, success: successCreate } = productCreate

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        if (successCreate) {
            // TODO prepnut na zoznam mojich produktov a vypisat uspesnu hlasku
            history.push('/user/my/profile')
        }

    }, [dispatch, userInfo, history, successCreate])

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })

        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    // https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2
    const findFormErrors = () => {
        const { name, description } = form
        const newErrors = {}
        // name errors
        if (!name || name === '') newErrors.name = 'cannot be blank!'
        else if (name.length > 100) newErrors.name = 'name is too long!'
        // comment errors
        if (!description || description === '') newErrors.description = 'cannot be blank!'
        else if (description.length < 3) newErrors.description = 'comment is too short!'
        else if (description.length > 500) newErrors.description = 'comment is too long!'

        return newErrors
    }

    // MORE PROPERTIES FUNCTIONS 
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
    ////////////////////////////

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

    const submitFirstPartHandler = async (e) => {
        e.preventDefault()
        console.log('part one', form)
        setPart(2)
        setStep2(true)
    }

    const submitSecondPartHandler = async (e) => {
        e.preventDefault()
        console.log('part two', form)

        // get our new errors
        const newErrors = findFormErrors()
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors)
        } else {
            // Mozeme pokracovat
            setPart(3)
            setStep3(true)
        }
    }

    const isBlankPropList = () => {
        let isBlank = false
        propsList.map((it) => (
            (it.key === "" || it.val === "") && (isBlank = true)
        ))
        return isBlank
    }

    const submitAllHandler = async (e) => {
        e.preventDefault()
        setMessage('')
        console.log(images)

        if (isBlankPropList()) {
            console.log("List je prazdny")
            setMessage('Položky v tejto časti nesmú byť prázdne')
            // TODO set message
        } else {


            // UPLOAD IMAGES
            let imagesArr = []
            if (images.length === 0) {
                imagesArr = ['/images/bez-fotky.jpg']
            } else {
                imagesArr = await uploadFiles()
                console.log(imagesArr)
            }

            const newProduct = form
            // https://www.codegrepper.com/code-examples/javascript/javascript+object+can+add+attribute
            newProduct['active'] = true
            newProduct['images'] = imagesArr
            newProduct['measures'] = measures
            newProduct['moreProperties'] = propsList

            // const newProduct = {
            //     //form,
            //     active: true, 
            //     // images: imagesArr,
            //     measures,
            //     moreProperties: propsList,

            // }
            console.log(newProduct)
            // DISPATCH CREATE PRODUCT
            dispatch(createProduct(newProduct))
        }
    }

    return (
        <Container className='mt-5rem'>
            <h1>Pridať produkt</h1>
            <Row>
                <Col md={3}>
                    {/* if step 1 then on click */}
                    {/* if setpart1 tak tie ostatne steps dame false, aby sme sa museli preklikat znovu  */}
                    <div className='py-4' style={{ backgroundColor: 'aqua' }}
                        onClick={(e) => { step1 && setPart(1) }}>Typ produktu
                    </div>
                    <div className='py-4' style={{ backgroundColor: 'pink' }} onClick={(e) => { step2 && setPart(2) }}>Základné informácie</div>
                    <div className='py-4' style={{ backgroundColor: 'gray' }} onClick={(e) => { step3 && setPart(3) }}>Špecifikácia produktu</div>
                </Col>
                <Col md={9}>

                    <div style={{ display: `${step1 && part == 1 ? 'block' : 'none'}` }}>
                        <h2> Typ produktu </h2>
                        <Form onSubmit={submitFirstPartHandler}>
                            <Form.Group as={Row} controlId="category">
                                <Form.Label column sm="3">Kategória</Form.Label>
                                <Col sm="9">
                                    <ReactSelect req={true} options={categoryOptions} onSelect={(val) => setField('category', val.value)} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="classificationBox" onChange={(e) => setField('classification', e.target.value)}>
                                <Form.Label column sm="3">Typ</Form.Label>
                                <Col sm="9">
                                    <Form.Check className="form-check-inline mr-3" type="radio" name='classification' value='supply' label="ponuka" required />
                                    <Form.Check className="form-check-inline mr-3" type="radio" name='classification' value='demand' label="dopyt" required />
                                    <Form.Check className="form-check-inline" type="radio" name='classification' value='donor' label="darujem" required />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="conditionBox" onChange={(e) => setField('condition', e.target.value)}>
                                <Form.Label column sm="3">Stav tovaru</Form.Label>
                                <Col sm="9">
                                    <Form.Check className="form-check-inline mr-3" type="radio" name='condition' value='new' label="nový" required />
                                    <Form.Check className="form-check-inline mr-3" type="radio" name='condition' value='used' label="použitý" required />
                                    <Form.Check className="form-check-inline" type="radio" name='condition' value='handmade' label="vlastná výroba" required />
                                </Col>
                            </Form.Group>
                            <Button type='submit' variant='indigo' className='w-100 mt-4'>Ďalej 1</Button>
                        </Form>
                    </div>


                    <div style={{ display: `${step1 && step2 && part == 2 ? 'block' : 'none'}` }}>
                        <h2> Základné informácie </h2>
                        <Form onSubmit={submitSecondPartHandler}>
                            <Form.Group as={Row} controlId='name'>
                                <Form.Label column sm="3">Názov</Form.Label>
                                <Col sm="9">
                                    <Form.Control type='text' onChange={e => setField('name', e.target.value)}
                                        placeholder='Zadajte názov produktu' required
                                        isInvalid={!!errors.name}></Form.Control>
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="countInStock">
                                <Form.Label column sm="3" >Počet kusov</Form.Label>
                                <Col sm="9">
                                    <Form.Control type='number' step={'1'} min={1}
                                        onChange={(e) => setField('countInStock', Number(e.target.value))} required />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="price">
                                <Form.Label column sm="3">Cena</Form.Label>
                                <Col sm="9">
                                    {form.classification && form.classification === 'donor' ?
                                        <Form.Control plaintext readOnly value="Zadarmo" />
                                        :
                                        <Form.Control type='number' step={'.01'} min={0}
                                            onChange={(e) => setField('price', Number(e.target.value))} />
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
                                <Form.Control as="textarea" onChange={(e) => setField('description', e.target.value)}
                                    isInvalid={!!errors.description}
                                    placeholder='Zadajte popis produktu' rows={4} required />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.description}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button type='submit' variant='indigo' className='w-100 mt-4'>Ďalej 2</Button>
                        </Form>
                    </div>


                    <div style={{ display: `${step1 && step2 && step3 && part == 3 ? 'block' : 'none'}` }}>
                        <h2> Špecifikácia produktu </h2>
                        <Form onSubmit={submitAllHandler}>
                            <Form.Group as={Row} controlId='origin'>
                                <Form.Label column sm="3">Pôvod</Form.Label>
                                <Col sm="9">
                                    <Form.Control type='text' onChange={(e) => setField('origin', e.target.value)}
                                        placeholder='Vyrobené v...' required ></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId='brand'>
                                <Form.Label column sm="3">Výrobca</Form.Label>
                                {/* Značka */}
                                <Col sm="9">
                                    <Form.Control type='text' onChange={(e) => setField('brand', e.target.value)}
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
                                            value={measures.width} onChange={(e) => setMeasures({ ...measures, width: e.target.value })}
                                            placeholder='' ></Form.Control>
                                    </Col>
                                    <Col sm='6'>
                                        <div className='form-check-inline w-5r'>výška</div>
                                        <Form.Control className='form-check-inline w-50 pad-control' type='text'
                                            value={measures.height} onChange={(e) => setMeasures({ ...measures, height: e.target.value })}
                                            placeholder='' ></Form.Control>
                                    </Col>
                                    <Col sm='6'>
                                        <div className='form-check-inline w-5r'>hĺbka</div>
                                        <Form.Control className='form-check-inline w-50 pad-control' type='text'
                                            value={measures.depth} onChange={(e) => setMeasures({ ...measures, depth: e.target.value })}
                                            placeholder='' ></Form.Control>
                                    </Col>
                                    <Col sm='6'>
                                        <div className='form-check-inline w-5r'>hmotnosť</div>
                                        <Form.Control className='form-check-inline w-50 pad-control' type='text'
                                            value={measures.weight} onChange={(e) => setMeasures({ ...measures, weight: e.target.value })}
                                            placeholder='' ></Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group controlId="moreProperties">
                                <Form.Label>Ďalšie vlastnosti</Form.Label>
                                <Form.Text id="propBlock" muted> napr. autor, pocet stran, farba, material... bude sa to menit podla kategorie </Form.Text>
                            </Form.Group>
                            {message && <Message>{message}</Message>}
                            {/* https://www.cluemediator.com/add-or-remove-input-fields-dynamically-with-reactjs */}
                            {propsList.length === 0
                                ? <Button type='button' className='btn btn-primary' onClick={handleAddClick}>Pridať</Button>
                                :
                                propsList.map((x, i) => {
                                    return (
                                        <Row key={i}>
                                            <Col sm='5' className='pad-r1'>
                                                <Form.Control
                                                    type='text'
                                                    name='key'
                                                    placeholder='Zadajte názov vlastnosti'
                                                    value={x.key}
                                                    onChange={e => handleInputChange(e, i)}
                                                />
                                            </Col>

                                            <Col sm='5' className='pad-l0'>
                                                <Form.Control
                                                    type='text'
                                                    // className="ml10"
                                                    name='val'
                                                    placeholder='Zadajte hodnotu vlastnosti'
                                                    value={x.val}
                                                    onChange={e => handleInputChange(e, i)}
                                                />
                                            </Col>

                                            <Col sm='2' className='pad-l0'>
                                                <div className="btn-box">
                                                    {propsList.length >= 1 &&
                                                        <Button type='button' className="p-1 mr10 " onClick={() => handleRemoveClick(i)}>
                                                            <i className="fas fa-trash" /></Button>
                                                    }
                                                    {propsList.length - 1 === i &&
                                                        <Button type='button' onClick={handleAddClick} className="p-1 btn btn-outline-primary">
                                                            <i className="fas fa-plus-circle" /></Button>}
                                                </div>
                                            </Col>
                                        </Row>
                                    );
                                })}

                            <Button type='submit' variant='indigo' className='w-100 mt-4'>uložiť</Button>
                        </Form>
                    </div>

                </Col>
            </Row>
        </Container >
    )
}

export default ProductCreateScreenNew
