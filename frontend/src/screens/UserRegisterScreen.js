import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const UserRegisterScreen = ({ history, location }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister
    
    useEffect( () => {
        if (userInfo)
        {
            history.push(redirect)    
        }
    }, [history, userInfo, redirect])
    
    const submitHandler = (e) => {
        e.preventDefault()
        //Dispatch Register
        if (password !== confirmPassword)
        {
            setMessage('Password Do not match')    
        }
        dispatch(register(name, email, password))
        
    }
    return <FormContainer>
        <h1 style={{ color: 'red' }}>Sign Up</h1>
        {message && <Message>{message}</Message>}
        {error && <Message>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    type='name'
                    placeholder='Enter Your Name'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>E-Mail Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter Your Password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter Your Password'
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Register</Button>
        </Form>
        <Row className='py-3'>
            <Col>
                Have An Account ? {' '}
                <Link to={redirect ? `/login?redirect=${redirect}`: '/login'}>Login</Link>
            </Col>

        </Row>
    </FormContainer>
}

export default UserRegisterScreen