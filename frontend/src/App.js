import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import UserScreen from './screens/UserScreen'
import UserRegisterScreen from './screens/UserRegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import  ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'

const App = ()=> {
  return (
    <Router>
      <Header />
      
      <main>
      {/* <h1>Welcome to ElectroStore</h1>  */}
        <Container >
          <Route path='/payment' component={PaymentScreen}></Route>
          <Route path='/shipping' component={ShippingScreen}></Route>
          <Route path='/placeorder' component={PlaceOrderScreen}></Route>
          <Route path='/order/:id' component={OrderScreen}></Route>
          <Route path='/register' component={UserRegisterScreen}></Route>
          <Route path='/login' component={UserScreen}></Route>
          <Route path='/profile' component={ProfileScreen}></Route>
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} ></Route>
          <Route path='/admin/user/:id/edit' component={UserEditScreen}></Route>
          <Route path='/admin/productlist' component={ProductListScreen}></Route>
          <Route path='/admin/product/:id/edit' component={ProductEditScreen}></Route>
          <Route path='/admin/orderlist' component={OrderListScreen}></Route>
          <Route path='/search/:keyword' component={HomeScreen} exact></Route>
          <Route path='/page/:pageNumber' component={HomeScreen} exact></Route>
          <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact></Route>
          <Route path='/' component={HomeScreen} exact></Route>
      </Container>
      </main>
      
      
      <Footer />
    </Router>  
  );
}

export default App;
