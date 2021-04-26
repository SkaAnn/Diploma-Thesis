import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, Row, Col } from 'react-bootstrap'
import UploadMultipleImages from '../components/UploadMultipleImages'
import ReactSelect from '../components/ReactSelect'
import { categoryOptions, hintOptions } from '../utils/options'
import { createProduct } from '../actions/productActions'
import Message from '../components/Message'

// osetrit aby sa do propList nezaratavali prazdne polozky
const ProductCreateScreen = ({ history }) => {
    const dispatch = useDispatch()

    const [message, setMessage] = useState('')
    const [message2, setMessage2] = useState('')
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
    const [shippingList, setShippingList] = useState([])

    const [part, setPart] = useState(1)
    const [step1, setStep1] = useState(true)
    const [step2, setStep2] = useState(false)
    const [step3, setStep3] = useState(false)
    const [allDone, setAllDone] = useState(false)

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
            history.push('/my/profile')
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
    // MORE SHIPPING FUNCTIONS 
    // Handle input change
    const handleInputChangeShipping = (e, index) => {
        const { name, value } = e.target;
        const list = [...shippingList];
        list[index][name] = value;
        setShippingList(list);
    };

    // Handle click event of the Remove button
    const handleRemoveClickShipping = index => {
        const list = [...shippingList];
        list.splice(index, 1);
        setShippingList(list);
    };

    // Handle click event of the Add button
    const handleAddClickShipping = () => {
        setShippingList([...shippingList, { typ: '', price: '' }]);
    };
    //////////////////////////////


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

    const isBlankShippingList = () => {
        let isBlank = false
        shippingList.map((it) => (
            (it.typ === "" || it.price === "") && (isBlank = true)
        ))
        return isBlank
    }

    const submitAllHandler = async (e) => {
        e.preventDefault()
        setMessage('')
        setMessage2('')
        console.log(images)

        const blankPropList = isBlankPropList()
        const blankShippingList = isBlankShippingList()
        if (blankPropList || blankShippingList) {
            console.log("List je prazdny")
            console.log(blankShippingList, blankPropList)
            if (blankShippingList) setMessage('Položky v časti Shipping nesmú byť prázdne')
            if (blankPropList) setMessage2('Položky v tejto časti nesmú byť prázdne')
        }
        else {
            setAllDone(true)

            // UPLOAD IMAGES
            let imagesArr = []
            if (images.length !== 0) {
                imagesArr = await uploadFiles()
                console.log(imagesArr)
            }

            const newProduct = form
            // https://www.codegrepper.com/code-examples/javascript/javascript+object+can+add+attribute
            // newProduct['active'] = true
            newProduct['images'] = imagesArr
            newProduct['measures'] = measures
            newProduct['shipping'] = shippingList
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
        <Container className='mt-5rem mb-3'>
           <h2 className='mb-4 pt-4 fw-600'><i className="fas fa-plus mr-1" style={{ color: 'plum' }}></i> Pridať produkt</h2>
            <Row style={{ minHeight: '70vh' }}>
                <Col md={3} className='p-0' style={{ background: '#3f599e' }}>
                    {/* if step 1 then on click */}
                    {/* if setpart1 tak tie ostatne steps dame false, aby sme sa museli preklikat znovu  */}
                    <div className='my-form-section px-3'
                        onClick={(e) => { step1 && setPart(1) }}
                        style={{ color: `${!step1 ? '#6c757d' : 'white'}` }}>

                        <div className='ml-2' style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                            {step2 ? <i className="far fa-check-circle fa-2x" style={{ color: '#28a745' }}></i>
                                : <i className="far fa-times-circle fa-2x" style={{ color: `${step1 && 'red'}` }}></i>}
                        </div>
                        <div className="ml-3" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                            <h5> <strong>1. KROK</strong></h5> Typ produktu
                         </div>
                    </div>

                    <div className='my-form-section px-3' onClick={(e) => { step2 && setPart(2) }}
                        style={{ color: `${!step2 ? 'rgb(165 170 175)' : 'white'}` }}>

                        <div className='ml-2 inline-block-middle'>
                            {step3 ? <i className="far fa-check-circle fa-2x" style={{ color: '#28a745' }}></i>
                                : <i className="far fa-times-circle fa-2x" style={{ color: `${step2 && 'red'}` }}></i>}
                        </div>
                        <div className="ml-3 inline-block-middle">
                            <h5><strong>2. KROK</strong></h5> Základné informácie
                         </div>

                    </div>
                    <div className='my-form-section px-3' onClick={(e) => { step3 && setPart(3) }}
                        style={{ color: `${!step3 ? 'rgb(165 170 175)' : 'white'}` }} >

                        <div className='ml-2 inline-block-middle'>
                            {allDone ? <i className="far fa-check-circle fa-2x" style={{ color: '#28a745' }}></i>
                                : <i className="far fa-times-circle fa-2x" style={{ color: `${step3 && 'red'}` }}></i>}
                        </div>
                        <div className="ml-3 inline-block-middle">
                            <h5><strong>3. KROK</strong></h5> Špecifikácia produktu
                         </div>
                    </div>
                </Col>
                <Col md={9} style={{ background: '#fff4bf' }} className='my-form-body'>

                    <div style={{ display: `${step1 && part === 1 ? 'block' : 'none'}` }}>
                        <h2 className='text-uppercase fw-500 mb-4'> Typ produktu </h2>
                        <Form onSubmit={submitFirstPartHandler}>
                            <Form.Group as={Row} controlId="category" className='my-5'>
                                <Form.Label column sm="3" className='my-form-label'>Kategória*</Form.Label>
                                <Col sm="9">
                                    <ReactSelect req={true} options={categoryOptions} onSelect={(val) => setField('category', val.value)} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="classificationBox" className='my-5' onChange={(e) => setField('classification', e.target.value)}>
                                <Form.Label column sm="3" className='my-form-label'>Typ*</Form.Label>
                                <Col sm="9">
                                    <Form.Check className="form-check-inline mr-3" type="radio" name='classification' value='supply' label="ponuka" required />
                                    <Form.Check className="form-check-inline mr-3" type="radio" name='classification' value='demand' label="dopyt" required />
                                    <Form.Check className="form-check-inline" type="radio" name='classification' value='donor' label="darujem" required />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="conditionBox" className='my-5' onChange={(e) => setField('condition', e.target.value)}>
                                <Form.Label column sm="3" className='my-form-label'>Stav tovaru*</Form.Label>
                                <Col sm="9">
                                    <Form.Check className="form-check-inline mr-3" type="radio" name='condition' value='new' label="nový" required />
                                    <Form.Check className="form-check-inline mr-3" type="radio" name='condition' value='used' label="použitý" required />
                                    <Form.Check className="form-check-inline" type="radio" name='condition' value='handmade' label="vlastná výroba" required />
                                </Col>
                            </Form.Group>
                            <button type='submit' className='mt-3 my-form-checkout-btn' style={{ float: 'right' }}>Pokračovať <i className="fas fa-chevron-circle-right fa-2x ml-2"></i></button>
                        </Form>
                    </div>


                    <div style={{ display: `${step1 && step2 && part === 2 ? 'block' : 'none'}` }}>
                        <h2 className='text-uppercase fw-500 mb-3'> Základné informácie </h2>
                        <Form onSubmit={submitSecondPartHandler}>
                            <Form.Group as={Row} controlId='name' className='my-5'>
                                <Form.Label column sm="2" className='my-form-label'>Názov* </Form.Label>
                                <Col sm="10">
                                    <Form.Control type='text' onChange={e => setField('name', e.target.value)}
                                        placeholder='Zadajte názov produktu' required
                                        isInvalid={!!errors.name}></Form.Control>
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="countInStockAndPrice" className='my-5'>
                                <Form.Label column sm="2" className='my-form-label' >Počet kusov* </Form.Label>
                                <Col sm="4">
                                    <Form.Control type='number' step={'1'} min={1}
                                        onChange={(e) => setField('countInStock', Number(e.target.value))} required />
                                </Col>

                                <Form.Label column sm="2" className='my-form-label'>Cena* [€]</Form.Label>
                                <Col sm="4">
                                    {form.classification && form.classification === 'donor' ?
                                        <Form.Control plaintext readOnly value="Zadarmo" />
                                        :
                                        <Form.Control type='number' step={'.01'} min={0}
                                            onChange={(e) => setField('price', Number(e.target.value))} />
                                    }
                                    {form.classification && form.classification === 'demand' &&
                                    <Form.Text id="priceBlock" muted className='text-center'> Zadajte 0 ak hľadáte darcu alebo iné číslo na cenu Dohodou</Form.Text>
                                    }
                                </Col>
                            </Form.Group>

                            <Form.Group controlId='images' className='my-5'>
                                <Form.Label className='my-form-label'>Fotky</Form.Label>
                                <UploadMultipleImages onUpload={(val) => setImages(val)} />
                            </Form.Group>

                            <Form.Group controlId='description' className='my-5'>
                                <Form.Label className='my-form-label'>Popis* </Form.Label>
                                <Form.Control as="textarea" onChange={(e) => setField('description', e.target.value)}
                                    isInvalid={!!errors.description}
                                    placeholder='Zadajte popis produktu' rows={4} required />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.description}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <button type='submit' className='my-form-checkout-btn' style={{ float: 'right' }}>Pokračovať <i className="fas fa-chevron-circle-right fa-2x ml-2"></i></button>
                        </Form>
                    </div>


                    <div style={{ display: `${step1 && step2 && step3 && part === 3 ? 'block' : 'none'}` }}>
                        <h2 className='text-uppercase fw-500 mb-4'> Špecifikácia produktu </h2>
                        <Form onSubmit={submitAllHandler}>
                            <Form.Group as={Row} controlId='originAndBrand' className='my-5'>
                                <Form.Label column sm="2" className='my-form-label'>Pôvod</Form.Label>
                                <Col sm="4">
                                    <Form.Control type='text' onChange={(e) => setField('origin', e.target.value)}
                                        placeholder='Vyrobené v...' required ></Form.Control>
                                </Col>

                                <Form.Label column sm="2" className='my-form-label'>Výrobca</Form.Label>
                                {/* Značka */}
                                <Col sm="4">
                                    <Form.Control type='text' onChange={(e) => setField('brand', e.target.value)}
                                        placeholder='Značka produktu' ></Form.Control>
                                    {/* <Form.Text id="brandBlock" muted> Ak nie je známa alebo na nej nezáleží zadajte pomlčku </Form.Text> */}
                                </Col>
                            </Form.Group>

                            <Form.Group controlId='measures' className='my-5'>
                                <Form.Label className='my-form-label'>Rozmery výrobku</Form.Label>
                                {/* šírka, výška, hĺbka, váha */}
                                <Row>
                                    <Col sm='6' className='mb-2'>
                                        <div className='form-check-inline w-5r'>šírka </div>
                                        <Form.Control className='form-check-inline w-50 pad-control' type='text'
                                            value={measures.width} onChange={(e) => setMeasures({ ...measures, width: e.target.value })}
                                            placeholder='' /> cm
                                    </Col>
                                    <Col sm='6' className='mb-2'>
                                        <div className='form-check-inline w-5r'>výška</div>
                                        <Form.Control className='form-check-inline w-50 pad-control' type='text'
                                            value={measures.height} onChange={(e) => setMeasures({ ...measures, height: e.target.value })}
                                            placeholder='' /> cm
                                    </Col>
                                    <Col sm='6' className='mb-2'>
                                        <div className='form-check-inline w-5r'>hĺbka</div>
                                        <Form.Control className='form-check-inline w-50 pad-control' type='text'
                                            value={measures.depth} onChange={(e) => setMeasures({ ...measures, depth: e.target.value })}
                                            placeholder='' /> cm
                                    </Col>
                                    <Col sm='6' className='mb-2'>
                                        <div className='form-check-inline w-5r'>hmotnosť</div>
                                        <Form.Control className='form-check-inline w-50 pad-control' type='text'
                                            value={measures.weight} onChange={(e) => setMeasures({ ...measures, weight: e.target.value })}
                                            placeholder='' /> g
                                    </Col>
                                </Row>
                            </Form.Group>


                            <Form.Group controlId="shipping">
                                <Form.Label className='my-form-label'>Spôsoby dodania</Form.Label>
                                <Form.Text id="propBlock" muted> Zvoľte spôsob a cenu doručenia produktu. napr. osobný odber - zadarmo, Slovenská pošta - 1.5e </Form.Text>
                            </Form.Group>
                            {message && <Message>{message}</Message>}
                            {shippingList.length === 0
                                ? <button className='my-btn-small' onClick={handleAddClickShipping} style={{ width: '120px', borderRadius: '0' }}> <i className="fas fa-plus" /> Pridať</button>
                                :
                                shippingList.map((x, i) => {
                                    return (
                                        <Row key={i} className='mb-2'>
                                            <Col sm='4' className='pad-r1'>
                                                <Form.Control
                                                    type='text'
                                                    name='typ'
                                                    placeholder='Zadajte spôsob doručenia'
                                                    value={x.key}
                                                    onChange={e => handleInputChangeShipping(e, i)}
                                                />
                                            </Col>

                                            <Col sm='4' className='pad-l0'>
                                                <Form.Control
                                                    type='text'
                                                    // className="ml10"
                                                    name='price'
                                                    placeholder='Zadajte cenu doručenia'
                                                    value={x.val}
                                                    onChange={e => handleInputChangeShipping(e, i)}
                                                />
                                            </Col>

                                            <Col sm='4' className='pad-l0'>
                                                <div className="btn-box">
                                                    {shippingList.length >= 1 &&
                                                        <button type='button' className="mr10 py-2 my-btn-small" style={{ borderRadius: '0' }} onClick={() => handleRemoveClickShipping(i)}>
                                                            <i className="fas fa-trash" /> Zmazať</button>
                                                    }
                                                    {shippingList.length - 1 === i &&
                                                        <button type='button' onClick={handleAddClickShipping} style={{ borderRadius: '0' }} className="py-2 my-btn-small">
                                                            <i className="fas fa-plus" /> Pridať</button>}
                                                </div>
                                            </Col>
                                        </Row>
                                    );
                                })}



                            <Form.Group controlId="moreProperties" className='mt-5'>
                                <Form.Label className='my-form-label'>Ďalšie vlastnosti</Form.Label>
                                {hintOptions[form.category-1] && hintOptions[form.category-1] !== '' &&
                                <Form.Text id="propBlock" muted> napr. {hintOptions[form.category-1]} </Form.Text>}
                            </Form.Group>
                            {message2 && <Message>{message2}</Message>}
                            {/* https://www.cluemediator.com/add-or-remove-input-fields-dynamically-with-reactjs */}
                            {propsList.length === 0
                                ? <button className='my-btn-small' onClick={handleAddClick} style={{ width: '120px', borderRadius: '0' }}> <i className="fas fa-plus" /> Pridať</button>
                                :
                                propsList.map((x, i) => {
                                    return (
                                        <Row key={i} className='mb-2'>
                                            <Col sm='4' className='pad-r1'>
                                                <Form.Control
                                                    type='text'
                                                    name='key'
                                                    placeholder='Zadajte názov vlastnosti'
                                                    value={x.key}
                                                    onChange={e => handleInputChange(e, i)}
                                                />
                                            </Col>

                                            <Col sm='4' className='pad-l0'>
                                                <Form.Control
                                                    type='text'
                                                    // className="ml10"
                                                    name='val'
                                                    placeholder='Zadajte hodnotu vlastnosti'
                                                    value={x.val}
                                                    onChange={e => handleInputChange(e, i)}
                                                />
                                            </Col>

                                            <Col sm='4' className='pad-l0'>
                                                <div className="btn-box">
                                                    {propsList.length >= 1 &&
                                                        <button type='button' className="p-2 mr10 my-btn-small" style={{ borderRadius: '0' }} onClick={() => handleRemoveClick(i)}>
                                                            <i className="fas fa-trash" /> Zmazať</button>
                                                    }
                                                    {propsList.length - 1 === i &&
                                                        <button type='button' onClick={handleAddClick} className="p-2 my-btn-small" style={{ borderRadius: '0' }}>
                                                            <i className="fas fa-plus" /> Pridať</button>}
                                                </div>
                                            </Col>
                                        </Row>
                                    );
                                })}

                            <button type='submit' className='w-100 mt-4 my-form-checkout-btn' style={{ float: 'right' }}> Uložiť </button>
                            {/* <Button type='submit' variant='indigo' className='w-100 mt-4'>uložiť</Button> */}
                        </Form>
                    </div>

                </Col>
            </Row >
        </Container >
    )
}

export default ProductCreateScreen
