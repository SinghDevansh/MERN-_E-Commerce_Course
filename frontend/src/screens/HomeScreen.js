import React, { useEffect } from 'react'
import {Container, Row, Col, Badge } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'


const HomeScreen = ({ match }) => {
    const pageNumber = match.params.pageNumber || 1
    const keyword = match.params.keyword
    const dispatch = useDispatch()
   
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList
    
    useEffect(() => {
       dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])
   
    return (
        <Container className='m-3'>
            
            <Meta />
            {!keyword && <ProductCarousel />}
            <h2 style={{ fontSize: '30px', color: 'red' }}>Latest Products
            <Badge style={{color:'blue'}} variant='secondary'>New</Badge></h2>
            {loading
                ? <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    
                    : 
                        <>
                <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={ product }/>
                    </Col>
                ))}
                    </Row>
                <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              />
                        </>
            }
            
            
        </Container>
    )
}

export default HomeScreen
