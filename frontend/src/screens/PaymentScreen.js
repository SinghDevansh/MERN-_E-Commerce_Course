import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const ShippingScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    if (!shippingAddress)
    {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
   
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        //console.log('submit')
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                </Form.Group>
                <Col>
                        <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                        
                        </Form.Check>
                </Col>
                <Col>
                        <Form.Check
                        type='radio'
                        label='Stripe or Credit Card'
                        id='Stripe'
                        name='paymentMethod'
                        value='Stripe'
                        
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                        
                        </Form.Check>
                </Col>
                
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
