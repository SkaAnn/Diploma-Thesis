import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import UserProductsScreen from './screens/UserProductsScreen'
import ProductScreen from './screens/ProductScreen'
import ProductCreateScreen from './screens/ProductCreateScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProfileUpdateScreen from './screens/ProfileUpdateScreen'
import FavoriteProductsScreen from './screens/FavoriteProductsScreen'
import RegisterScreenNew from './screens/RegisterScreenNew'
import ProfileUpdateScreenNew from './screens/ProfileUpdateScreenNew'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        {/* <Container> */}
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreenNew} />
          <Route path='/products/user/:id' component={UserProductsScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/user/my/favorites' component={FavoriteProductsScreen} />
          <Route path='/user/my/profile' component={ProfileScreen} exact/>
          <Route path='/user/my/profile/update' component={ProfileUpdateScreenNew}  exact/>
          <Route path='/user/my/product/create' component={ProductCreateScreen} />
          <Route path='/user/product/:id/edit' component={ProductEditScreen} />
          <Route path='/sort/:sortKey' component={HomeScreen} exact />
          <Route path='/search/:keyword' component={HomeScreen} exact/>
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/sort/:sortKey/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/sort/:sortKey/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/' component={HomeScreen} exact />
        {/* </Container> */}
      </main>
      <Footer />
    </Router>

  );
}

export default App;
