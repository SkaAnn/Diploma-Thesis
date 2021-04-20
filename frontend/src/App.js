import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
import My404Screen from './screens/My404Screen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='pb-3'>
        <Switch>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/products/user/:id' component={UserProductsScreen} exact />
          <Route path='/products/user/:id/:pageNumber' component={UserProductsScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/my/favorites' component={FavoriteProductsScreen} exact />
          <Route path='/my/favorites/:pageNumber' component={FavoriteProductsScreen} exact />
          <Route path='/my/profile' component={ProfileScreen} exact />
          <Route path='/my/profile/update' component={ProfileUpdateScreen} exact />
          <Route path='/my/profile/page/:pageNumber' component={ProfileScreen} exact />
          <Route path='/my/product/create' component={ProductCreateScreen} />
          <Route path='/my/product/edit/:id' component={ProductEditScreen} />
          {/* 4 jednoice */}
          <Route path='/sort/:sortKey' component={HomeScreen} exact />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/filter/:filter' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          {/* 3 dvojice (s page) */}
          <Route path='/sort/:sortKey/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/filter/:filter/page/:pageNumber' component={HomeScreen} exact />
          {/* 3 trojice */}
          <Route path='/sort/:sortKey/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/sort/:sortKey/filter/:filter/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/search/:keyword/filter/:filter/page/:pageNumber' component={HomeScreen} exact />
          {/* 1 stvorica */}
          <Route path='/sort/:sortKey/search/:keyword/filter/:filter/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/' component={HomeScreen} exact />
          <Route component={My404Screen} />
        </Switch>
      </main>
      <Footer />
    </Router>

  );
}

export default App;
