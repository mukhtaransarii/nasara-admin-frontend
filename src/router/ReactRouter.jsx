import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import ProductAdd from '../pages/ProductAdd.jsx'
import ProductList from '../pages/ProductList.jsx'
import ProductOrder from '../pages/ProductOrder.jsx'

export default function ReactRouter() {
  return (
    <div className="h-screen mb-16 lg:mb-0 w-full overflow-hidden overflow-y-scroll">
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/product-add"  element={<ProductAdd/>}/>
        <Route path="/product-list"  element={<ProductList/>}/>
        <Route path="/product-order"  element={<ProductOrder/>}/>
      </Routes>
    </div>
  )
}