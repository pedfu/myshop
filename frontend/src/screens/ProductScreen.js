import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import { listUserOrders } from '../actions/orderActions';


export default function ProductScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    const productCreateReview = useSelector(state => state.productCreateReview);
    const { error: errorProductReview, success: successProductReview } = productCreateReview;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const ordersListUser = useSelector(state => state.ordersListUser);
    const { loading: loadingOrders, orders, error: errorOrders } = ordersListUser;

    const [userBought, setUserBought] = useState(false);

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {       
        if(successProductReview) {
            alert('Review Submitted');
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET});
        }

        dispatch(listProductDetails(id));
    }, [dispatch, id, successProductReview])

    useEffect(() => {
        if(userInfo) {
            checkOrders();
            dispatch(listUserOrders());
        }
    }, [])

    useEffect(() => {
        checkOrders();
    }, [orders])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createReview(id, {rating, comment}))
    }

    const addToCartHandler = () => {
        if(product.countInStock > 0) {
            navigate(`/cart/${id}?qty=${qty}`);
        }
    }

    const checkOrders = () => {
        if(orders && orders.length > 0) {
            const array = orders.map(order => order.orderItems.map(item => {
                if(item.product === id) {
                    setUserBought(true);
                    return true;
                } else {
                    return null;
                }
            }));
        }
    }

  return (
    <>
        <Link to="/" className='btn btn-light my-3'>Go Back</Link>
        {loading ? 
         <Loader /> :
         error ?
         <Message variant='danger'>{error}</Message> :
         (
            <>
                <Row>
                    <Col md={6}>
                        <Image src={`${product.image}`} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating rating={product.rating} numReviews={product.numReviews} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col><strong>${product.price}</strong></Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                    {[...Array(product.countInStock).keys()].map(x => (
                                                        <option className={`option-${x+1}`} key={x+1} value={x+1}>
                                                            {x+1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item>
                                    <button
                                        className='btn col-12 btn-dark'
                                        type='button'
                                        disabled={product.countInStock === 0}
                                        onClick={addToCartHandler}
                                    >
                                        Add To Cart
                                    </button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h2 className='mt-3'>Reviews</h2>
                        {errorProductReview && (<Message variant='danger'>{errorProductReview}</Message>)}
                        <ListGroup.Item>
                            {userInfo && (orders && orders.length > 0 && userBought) ? (
                                <>
                                <h4>Write a Customer Review</h4>
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                            <option value=''>Select...</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='comment' className='mt-3'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button type='submit' variant='primary' className='my-3'>
                                        Submit
                                    </Button>
                                </Form>
                                </>
                            ) : userInfo ? (null) : (
                                <Message>Please <Link to='/login'>sign in</Link> to write a review</Message>
                            )}
                        </ListGroup.Item>

                        {product.reviews.length === 0 ? <Message>No Reviews</Message> : product.reviews.map(review => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating rating={review.rating} noString={true}/>
                                <p>{review.createdAt.substring(0,10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}

                    </Col>
                </Row>
            </>
         )
        }       
    </>
  )
}
