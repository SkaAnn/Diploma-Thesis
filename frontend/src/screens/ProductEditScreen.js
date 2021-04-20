import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { PRODUCT_DETAILS_RESET } from '../constants/productConstants'
import Message from '../components/Message'
import Loader from '../components/Loader'
import UploadMultipleImages2 from '../components/UploadMultipleImages2'
import { listProductDetails, updateProduct } from '../actions/productActions'

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id
    const dispatch = useDispatch()

    // Local states
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState()
    const [countInStock, setCountInStock] = useState()
    const [origin, setOrigin] = useState('')
    const [brand, setBrand] = useState('')
    const [measures, setMeasures] = useState({ width: '', height: '', depth: '', weight: '' })
    const [images, setImages] = useState([])
    const [shippingList, setShippingList] = useState([])
    const [propsList, setPropsList] = useState([])
    // cannot change
    // category, classification, condition
    // Cannot edit 
    const [category, setCategory] = useState('')
    const [classification, setClassification] = useState('')
    const [condition, setCondition] = useState('')
    const [reload, setReload] = useState(false)

    // Global states
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    const uploadFiles = async (e) => {

        // Zisti na ktorych indexoch su nove Image Files
        const newImgFiles = []
        for (var i = 0; i < images.length; i++) {
            if (typeof images[i] !== 'string') {
                newImgFiles.push(i)
            }
        }

        if (newImgFiles.length !== 0) {
            console.log('New files on indexes: ', newImgFiles)
            // ak boli pridane nove fotky
            // dovtedy budu stare images - do prveho indexu vo newImgFiles
            const oldImgs = []
            for (var j = 0; j < newImgFiles[0]; j++) {
                oldImgs.push(images[j])
            }
            console.log('Old files: ', oldImgs)

            // UPLOADNI NOVE IMG FILES
            const formData = new FormData()
            formData.append('userId', userInfo._id);
            for (var k = 0; k < newImgFiles.length; k++) {
                formData.append('photos', images[newImgFiles[k]])
            }

            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

                const { data } = await axios.post(`/api/upload/photos`, formData, config)
                console.log(data)
                return oldImgs.concat(data)

            } catch (error) {
                console.error(error)
                return error
            }

        } else {
            // ak len bola odstranena nejaka z povodnych fotiek 
            return images
        }
    }


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (successUpdate) {
                dispatch({ type: PRODUCT_DETAILS_RESET })
                history.push('/my/profile')
            } else {

                if (!product || !product.name || product._id !== productId) {
                    dispatch(listProductDetails(productId))
                } else {
                    // Pre-set formular with actual data
                    setName(product.name)
                    setDescription(product.description)
                    setPrice(product.price)
                    setCountInStock(product.countInStock)
                    setOrigin(product.origin)
                    setBrand(product.brand)
                    setMeasures(product.measures)
                    // not editable
                    setCategory(product.category)
                    setClassification(product.classification)
                    setCondition(product.condition)
                    // lists
                    setImages(product.images)
                    setReload(true)
                    setShippingList(product.shipping)
                    setPropsList(product.moreProperties)
                }
            }
        }
    }, [dispatch, productId, product, history, successUpdate])

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

    const submitHandler = async (e) => {
        e.preventDefault()

        // console.log('ImageFiles: ', imageFiles)
        console.log('Images: ', images)
        // ak ImagesFiles je prazdne tak to treba len vlozit product.images

        // zisti ci images == product.images
        // ak sa nerovnaju tak vtedy zavolaj uploadFiles
        // zisti kolko je novych Files v images

        let imagesArr
        if (images === product.images) {
            console.log('Ziadne fotky sa nezmenili')
            imagesArr = images
        } else {
            // Su nejake nove/zmazane fotky
            // UPLOAD IMAGES
            console.log('fotky sa zmenili')
            imagesArr = await uploadFiles()
            console.log(imagesArr)
        }

        // DISPATCH UPDATE PRODUCT
        // ak nie su undefined tak ich treba pushnut
        const newProduct = {
            _id: productId, name, description, price,
            category, classification, condition,
            countInStock, origin, brand, measures,
            images: imagesArr,
            shipping: shippingList,
            moreProperties: propsList,
        }

        console.log(JSON.stringify(newProduct))
        dispatch(updateProduct(newProduct))
    }

    return (
        <Container className='mt-5rem'>
            <h2>Edit Product</h2>

            { loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            {/* tu nezmenitelne - category, classification, condition */}
                            <Form.Group as={Row} controlId='name'>
                                <Form.Label column sm="2" className='my-form-label'>Názov </Form.Label>
                                <Col sm="10">
                                    <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)}
                                        placeholder='Zadajte názov produktu' required></Form.Control>
                                </Col>
                            </Form.Group>

                            {reload &&
                                <Form.Group controlId='images'>
                                    <Form.Label className='my-form-label'>Fotky</Form.Label>
                                    {product.images.length === 0 && <div>Žiadne fotky</div>}
                                    {/* <Form.Control type='text' value={images} onChange={(e) => setImages(e.target.value)} /> */}
                                    <UploadMultipleImages2 images={product.images} userId={userInfo._id} onLoad={(val) => setImages(val)} onUpload={(val) => setImages(val)} />
                                </Form.Group>}

                            {product.classification !== 'donor' &&
                                <Form.Group as={Row} controlId="price">
                                    <Form.Label column sm="2" className='my-form-label'>Cena</Form.Label>
                                    <Col sm="10">
                                        <Form.Control type='number' step={'.01'} min={0}
                                            value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
                                    </Col>
                                </Form.Group>
                            }

                            <Form.Group as={Row} controlId="countInStock">
                                <Form.Label column sm="2" className='my-form-label' >Počet kusov </Form.Label>
                                <Col sm="4">
                                    <Form.Control type='number' step={'1'} min={1}
                                        value={countInStock} onChange={(e) => setCountInStock(Number(e.target.value))} required />
                                </Col>
                            </Form.Group>

                            <Form.Group controlId='description' className='my-5'>
                                <Form.Label className='my-form-label'>Popis </Form.Label>
                                <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)}
                                    placeholder='Zadajte popis produktu' rows={4} required />
                                {/* <Form.Control.Feedback type='invalid'>
                                    {errors.description}
                                </Form.Control.Feedback> */}
                            </Form.Group>

                            <Form.Group as={Row} controlId='originAndBrand'>
                                <Form.Label column sm="2" className='my-form-label'>Pôvod</Form.Label>
                                <Col sm="4">
                                    <Form.Control type='text' value={origin} onChange={(e) => setOrigin(e.target.value)}
                                        placeholder='Vyrobené v...' required ></Form.Control>
                                </Col>

                                <Form.Label column sm="2" className='my-form-label'>Výrobca</Form.Label>
                                {/* Značka */}
                                <Col sm="4">
                                    <Form.Control type='text' value={brand} onChange={(e) => setBrand(e.target.value)}
                                        placeholder='Značka produktu' ></Form.Control>
                                    <Form.Text id="brandBlock" muted> Ak nie je známa alebo na nej nezáleží zadajte pomlčku </Form.Text>
                                </Col>
                            </Form.Group>


                            <Form.Group controlId='measures' className='my-5'>
                                <Form.Label className='my-form-label'>Rozmery výrobku</Form.Label>
                                {/* šírka, výška, hĺbka, váha */}
                                <Row>
                                    <Col sm='6' className='mb-2'>
                                        <div className='form-check-inline w-5r'>šírka</div>
                                        <Form.Control className='form-check-inline w-50 pad-control' type='text'
                                            value={measures.width} onChange={(e) => setMeasures({ ...measures, width: e.target.value })}
                                            placeholder='' ></Form.Control>
                                    </Col>
                                    <Col sm='6' className='mb-2'>
                                        <div className='form-check-inline w-5r'>výška</div>
                                        <Form.Control className='form-check-inline w-50 pad-control' type='text'
                                            value={measures.height} onChange={(e) => setMeasures({ ...measures, height: e.target.value })}
                                            placeholder='' ></Form.Control>
                                    </Col>
                                    <Col sm='6' className='mb-2'>
                                        <div className='form-check-inline w-5r'>hĺbka</div>
                                        <Form.Control className='form-check-inline w-50 pad-control' type='text'
                                            value={measures.depth} onChange={(e) => setMeasures({ ...measures, depth: e.target.value })}
                                            placeholder='' ></Form.Control>
                                    </Col>
                                    <Col sm='6' className='mb-2'>
                                        <div className='form-check-inline w-5r'>hmotnosť</div>
                                        <Form.Control className='form-check-inline w-50 pad-control' type='text'
                                            value={measures.weight} onChange={(e) => setMeasures({ ...measures, weight: e.target.value })}
                                            placeholder='' ></Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group controlId="shipping">
                                <Form.Label className='my-form-label'>Spôsoby doručenia / dopravy</Form.Label>
                                <Form.Text id="propBlock" muted> Zvoľte spôsob doručenia produktu. Spôsob aj cena napr. osobný odber - Zadarmo, Slovenská pošta - 1.5e </Form.Text>
                            </Form.Group>
                            {/* {message && <Message>{message}</Message>} */}
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
                                                    value={x.typ}
                                                    onChange={e => handleInputChangeShipping(e, i)}
                                                />
                                            </Col>

                                            <Col sm='4' className='pad-l0'>
                                                <Form.Control
                                                    type='text'
                                                    // className="ml10"
                                                    name='price'
                                                    placeholder='Zadajte cenu doručenia'
                                                    value={x.price}
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
                                <Form.Text id="propBlock" muted> napr. autor, pocet stran, farba, material... bude sa to menit podla kategorie </Form.Text>
                            </Form.Group>
                            {/* {message2 && <Message>{message2}</Message>} */}
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

                            <button type='submit' className='w-100 mt-4 my-form-checkout-btn' > Uložiť </button>
                        </Form>
                    )
            }
        </Container >
    )
}

export default ProductEditScreen
