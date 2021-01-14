import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

//props or { product }
const Product = (props) => {
    return (
        <div>
            <Card className="my-3 p-3">
                <Link to={`product/${props.product._id}`}>
                 <Card.Img variant="top" src={props.product.image} />
                </Link>
                <Card.Body>
                    <Link to={`product/${props.product._id}`}>
                        <Card.Title><strong>{props.product.name}</strong></Card.Title>
                        </Link>
                    <Card.Text as='div'>
                        <Rating value={props.product.rating} text={`${props.product.numReviews} reviews`} />
                    </Card.Text>
                    <Card.Text as='h4'>
                        ${props.product.price}
                    </Card.Text>
                    <Link to={`product/${props.product._id}`}>
                        <Button variant="primary">View</Button>
                    </Link>
                    </Card.Body>
                
            </Card>
        </div>
    )
}

export default Product
