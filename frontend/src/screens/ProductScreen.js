import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Rating from '../components/Rating';


export default function ProductScreen({ match }) {
    const { id } = useParams();
    const [product, setProduct] = useState({});
  
    useEffect(() => {
      const fetchProducts = async() => {
        const { data } = await axios.get(`/api/products/${id}`);
        console.log(id, data);
        setProduct(data);
      }
  
      fetchProducts();
    }, [])

  return (
    <>
        <Link to="/" className='btn btn-light my-3'>Go Back</Link>
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
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

                        <ListGroup.Item>
                            <button
                                className='btn col-12 btn-dark'
                                type='button'
                                disabled={product.countInStock === 0}
                            >
                                Add To Cart
                            </button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}
