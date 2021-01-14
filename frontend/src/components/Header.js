import React from 'react'
import { Route } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'




const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const logOutHandler = () => {
        dispatch(logout())
    }
    return (

        <header>

            <Navbar bg="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                    <Navbar.Brand>ElectroStore</Navbar.Brand>
                    </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({ history }) => <SearchBox history={ history }/>}></Route>
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                            <Nav.Link><i className="fa fa-shopping-cart"></i>Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                    <NavDropdown.Item >Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logOutHandler}>LogOut</NavDropdown.Item>
                                </NavDropdown>
                                
                            ): (<LinkContainer to='/login'>
                            <Nav.Link><i className="fa fa-user"></i>SignIn</Nav.Link>
                            </LinkContainer>
                        
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/userlist'>
                                <NavDropdown.Item >User Details</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist'>
                                <NavDropdown.Item >Product Details</NavDropdown.Item>
                                </LinkContainer>    
                                <LinkContainer to='/admin/orderlist'>
                                <NavDropdown.Item >Order Details</NavDropdown.Item>
                                </LinkContainer>        
                               
                            </NavDropdown>
                            ) }
                            
                    </Nav>
                    </Navbar.Collapse>
                   </Container> 
            </Navbar>
            
        </header>
    )
}

export default Header
