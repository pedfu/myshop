import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';
import Rating from './Rating';

export default function Product({ product }) {
  return (
    <Card className="p-3 my-3 rounded">
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant="top" />
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`} className="text-decoration-none">
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as="div">
                <Rating rating={product.rating} numReviews={product.numReviews} />
            </Card.Text>

            <Card.Text as="h3">
                ${product.price}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}
