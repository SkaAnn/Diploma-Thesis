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


    // Need to pass onSelect={(val) => setSelected(val)}
    const [selected, setSelected] = useState({})    // SELECTED OPTION FROM SELECTOR


    const dispatch = useDispatch()

    // Component level states from Form
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [classification, setClassification] = useState('')
    const [condition, setCondition] = useState('')
    const [propsList, setPropsList] = useState([])  // moreProperties

    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    // Product images
    const [images, setImages] = useState()

    // Global state
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productCreate = useSelector(state => state.productCreate)
    const { loading, error: errorCreate, success: successCreate } = productCreate

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]  // can upload multiple files
        console.log(file)
        const formData = new FormData()
        formData.append('userId', userInfo._id);
        formData.append('avatar', file)    // image sa vola i v backend
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            console.log(formData)

            const { data } = await axios.post(`/api/upload/profile`, formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const uploadFiles = async (e) => {
        console.log(images)
        //const file = new File([images[0]], "profile_image.jpg",{type: 'image/jpg', lastModified:new Date().getTime()})
        // const fileName='profile_img.jpg'
        // const theBlob = images[0]
        // const file = new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
        //const file = images[0]
        //console.log(file)
        const formData = new FormData()
        formData.append('userId', userInfo._id);
        formData.append('photos', images[0])    // image sa vola i v backend
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            console.log(formData)

            const { data } = await axios.post(`/api/upload/photos`, formData, config)
            console.log(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
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

        uploadFiles()

        const newProduct = {
            name, description, price,
            classification, condition, moreProperties: propsList,
            category: selected.value
        }
        //console.log(newProduct)
        // DISPATCH CREATE PRODUCT
        //dispatch(createProduct(newProduct))
    }

    return (
        <FormContainer>
            <Form onSubmit={submitHandler}>

                <UploadMultipleImages onUpload={(val) => setImages(val)}  />

                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='text' placeholder='Enter image url' value={image}
                        onChange={(e) => setImage(e.target.value)} ></Form.Control>
                    <Form.File id='image-file' label='Choose File' custom
                        onChange={uploadFileHandler}></Form.File>
                    {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId="category">
                    <Form.Label>Kategória</Form.Label>
                    <ReactSelect req={true} options={categoryOptions} onSelect={(val) => setSelected(val)} />
                </Form.Group>

                <Form.Group controlId='name'>
                    <Form.Label>Názov</Form.Label>
                    <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)}
                        placeholder='Zadajte názov produktu' required></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>Popis</Form.Label>
                    <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)}
                        placeholder='Zadajte popis produktu' rows={4} required />
                </Form.Group>

                <Form.Group controlId="price">
                    <Form.Label>Cena</Form.Label>
                    <Form.Control type='number' step={'.01'} min={0}
                        value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                    <Form.Text id="priceBlock" muted> Ak chcete niečo darovať zadajte 0 </Form.Text>
                </Form.Group>

                <Form.Group controlId="conditionBox" value={condition} onChange={(e) => setCondition(e.target.value)}>
                    <Form.Label>Stav tovaru</Form.Label>
                    <Form.Check type="radio" name='condition' value='new' label="nový" required />
                    <Form.Check type="radio" name='condition' value='used' label="použitý" required />
                    <Form.Check type="radio" name='condition' value='handmade' label="vlastná výroba" required />
                </Form.Group>

                <Form.Group controlId="classificationBox" value={classification} onChange={(e) => setClassification(e.target.value)}>
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
                            <Form.Group key={i}>
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
