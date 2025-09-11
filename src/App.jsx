import { Route, Routes } from 'react-router-dom'
import ItemListContainer from './pages/ItemListContainer'
import './estilos/App.css'
import NavBar from './componentes/Navbar'
import FilteredProducts from './pages/FilteredProducts'
import ProductDetail from './pages/ProductDetail'

export default function App() {
  return (
    <div className='appContainer'>
      <NavBar />
      <Routes>
        <Route path='/' element={<ItemListContainer />} />
        <Route
          path='/products/:category'
          element={<FilteredProducts />}
        ></Route>
        <Route path='/product/:detail' element={<ProductDetail />} />
      </Routes>
    </div>
  )
}
