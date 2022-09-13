import React, { useEffect, useState } from 'react';
import axios from 'axios';
import store from '../store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, listProducts, updateProduct } from '../actions/productActions';
import { PRODUCT_DETAILS_RESET, PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const [uploading, setUploading] = useState(false);

    const { id: productId } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, product, error } = productDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productUpdate = useSelector(state => state.productUpdate);
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            navigate('/admin/productlist');
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name);
                setPrice(Number(product.price));
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(Number(product.countInStock));
                setDescription(product.description);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, navigate, productId, product._id, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault();   
        dispatch(updateProduct({ _id: productId, name, price, image, brand, category, countInStock, description }));
    }

    const uploadFileHandler = async(e) => {
        // 0 because we are only uploading 1 file, but removing it allow us to upload multiples
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userInfo.token}`
                },
            }

            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    }

  return (
    <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='pb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='description' className='pb-3'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='price' className='pb-3'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control 
                        type='number' 
                        placeholder='Enter price'
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='image' className='pb-3'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter image'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                    <Form.Control
                        type='file'
                        label='Choose File'
                        custom='true'
                        onChange={uploadFileHandler}
                    />
                    {uploading && <Loader />}
                </Form.Group>
                <Form.Group controlId='brand' className='pb-3'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='category' className='pb-3'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='countInStock' className='pb-3'>
                    <Form.Label>Count in stock</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter count in stock'
                        value={countInStock}
                        onChange={(e) => setCountInStock(Number(e.target.value))}
                    ></Form.Control>
                </Form.Group>

                
                <Button type='submit' variant='primary' className='pb-3'>
                    Update
                </Button>
            </Form>
            )}
        </FormContainer>
            
    </>
  )
}
