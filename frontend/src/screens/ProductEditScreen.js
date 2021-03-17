import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_DETAILS_RESET } from '../constants/productConstants'
import UploadMultipleImages2 from '../components/UploadMultipleImages2'

// TODO: countInStock
const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id
    const dispatch = useDispatch()

    // Component level state    
    // Can edit
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [countInStock, setCountInStock] = useState(1)
    const [brand, setBrand] = useState('')
    const [images, setImages] = useState([])
    const [size, setSize] = useState('')        // TODO: measures
    const [weight, setWeight] = useState('')
    const [origin, setOrigin] = useState('')
    const [shipping, setShipping] = useState([])
    const [propsList, setPropsList] = useState([])  // moreProperties
    // Cannot edit 
    const [category, setCategory] = useState('')
    const [classification, setClassification] = useState('')
    const [condition, setCondition] = useState('')
    // More
    // const [imageFiles, setImageFiles] = useState([])
    const [reload, setReload] = useState(false)

    // Global states
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

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
                history.push('/user/my/profile')
            } else {

                if (!product || !product.name || product._id !== productId) {
                    dispatch(listProductDetails(productId))
                } else {
                    // Pre-set formular with actual data
                    setName(product.name)
                    setDescription(product.description)
                    setCategory(product.category)
                    setPrice(product.price)
                    setCountInStock(product.countInStock)
                    setClassification(product.classification)
                    setCondition(product.condition)
                    setImages(product.images)
                    console.log('updatovane ', images)
                    setReload(true)
                    setBrand(product.brand)
                    setOrigin(product.origin)
                    setSize(product.size)
                    setWeight(product.weight)
                    setShipping(product.shipping)
                    setPropsList(product.moreProperties)
                }
            }
        }
    }, [dispatch, productId, product, history, successUpdate])

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
            _id: productId, name, description, category, price,
            classification, condition,
            countInStock, origin, images: imagesArr,
            moreProperties: propsList,
            // todo doplnit ostatne properties
        }

        console.log(JSON.stringify(newProduct))
        dispatch(updateProduct(newProduct))
    }

    return (
        <>
            <Link to='/user/my/profile' className='btn btn-light my-3'>Go Back</Link>

            <div>
                <h2>Edit Product</h2>
                {/* {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}
                {loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        : (
                            <Form onSubmit={submitHandler}>
                                <Row>
                                    <Col md={5} >

                                        {/* {product._id} */}
                                        {/* <img src='/uploads/60475bbaaead2a9cd8ee114a/photos-1615390190415.jpg'/> */}

                                        {reload &&
                                            <Form.Group controlId='images'>
                                                <Form.Label>Fotky</Form.Label>
                                                {/* <Form.Control type='text' value={images} onChange={(e) => setImages(e.target.value)} /> */}
                                                <UploadMultipleImages2 images={product.images} userId={userInfo._id} onLoad={(val) => setImages(val)} onUpload={(val) => setImages(val)} />
                                            </Form.Group>}

                                        <Form.Group as={Row} controlId='name'>
                                            <Form.Label column sm="2">Názov</Form.Label>
                                            <Col sm="10">
                                                <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)}
                                                    placeholder='Zadajte názov produktu' required></Form.Control>
                                            </Col>
                                        </Form.Group>

                                        {classification !== 'donor' &&
                                            <Form.Group as={Row} controlId="price">
                                                <Form.Label column sm="2">Cena</Form.Label>
                                                <Col sm="10">
                                                    <Form.Control type='number' step={'.01'} min={0}
                                                        value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                                                </Col>
                                            </Form.Group>
                                        }

                                        <Form.Group controlId='description'>
                                            <Form.Label>Popis</Form.Label>
                                            <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)}
                                                placeholder='Zadajte popis produktu' rows={4} required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={7} >

                                        <Form.Group as={Row} controlId='origin'>
                                            <Form.Label column sm="2">Pôvod</Form.Label>
                                            <Col sm="10">
                                                <Form.Control type='text' value={origin} onChange={(e) => setOrigin(e.target.value)}
                                                    placeholder='Vyrobené v...' required ></Form.Control>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId='brand'>
                                            <Form.Label column sm="2">Výrobca</Form.Label>

                                            <Col sm="10">
                                                <Form.Control type='text' value={brand} onChange={(e) => setBrand(e.target.value)}
                                                    placeholder='Značka produktu' ></Form.Control>
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
                                            <Form.Label>Ďalšie vlastnosti</Form.Label>
                                        </Form.Group>

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
                                        <Button type='submit' variant='primary'>Aktualizovať</Button>
                                    </Col>
                                </Row>
                            </Form>
                            //
                            //     <Form.Group controlId='name'>
                            //         <Form.Label>Name</Form.Label>
                            //         <Form.Control type='text' placeholder='Enter name' value={name}
                            //             onChange={(e) => setName(e.target.value)} ></Form.Control>
                            //     </Form.Group>

                            //     <Form.Group controlId='description'>
                            //         <Form.Label>Popis</Form.Label>
                            //         <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)}
                            //             placeholder='Zadajte popis produktu' rows={4} />
                            //     </Form.Group>

                            //     <Form.Group controlId='price'>
                            //         <Form.Label>Price</Form.Label>
                            //         <Form.Control type='number' placeholder='Enter price' value={price}
                            //             onChange={(e) => setPrice(e.target.value)} ></Form.Control>
                            //     </Form.Group>


                            //     <Form.Group controlId="moreProperties">
                            //         <Form.Label>Pridaj ďalšie vlastnosti</Form.Label>
                            //     </Form.Group>
                            //     {propsList.length === 0
                            //         ? <Button type='button' className='btn btn-primary' onClick={handleAddClick}>Pridať</Button>
                            //         :
                            //         propsList.map((x, i) => {
                            //             return (
                            //                 <Form.Group key={i}>
                            //                     <Form.Control
                            //                         type='text'
                            //                         name='key'
                            //                         placeholder='Zadajte názov vlastnosti'
                            //                         value={x.key}
                            //                         onChange={e => handleInputChange(e, i)}
                            //                     />

                            //                     <Form.Control
                            //                         type='text'
                            //                         className="ml10"
                            //                         name='val'
                            //                         placeholder='Zadajte hodnotu vlastnosti'
                            //                         value={x.val}
                            //                         onChange={e => handleInputChange(e, i)}
                            //                     />

                            //                     <div className="btn-box">
                            //                         {propsList.length >= 1 &&
                            //                             <Button type='button' className="mr10" onClick={() => handleRemoveClick(i)}>
                            //                                 <i className="fas fa-trash" /> Odstrániť</Button>
                            //                         }
                            //                         {propsList.length - 1 === i &&
                            //                             <Button type='button' onClick={handleAddClick} className="btn btn-outline-primary">
                            //                                 <i className="fas fa-plus-circle" /> Pridať</Button>}
                            //                     </div>
                            //                 </Form.Group>
                            //             );
                            //         })}

                            //     <Button type='submit' variant='primary'>Aktualizovať</Button>

                            // </Form>
                        )}

            </div>
        </>
    )
}

export default ProductEditScreen
