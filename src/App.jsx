import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Cart from './components/Cart';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Products/>}/>
          <Route path='/cart' element={<Cart/>} />
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App

