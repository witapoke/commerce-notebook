import { useEffect, useState, useContext } from 'react'
import { db } from '../firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import '../estilos/ItemListContainer.css'
import '../estilos/SideCart.css'
import ItemListComponent from '../componentes/ItemListComponent'
import { ProductsContext } from '../context/ProductsContext'
import { CartContext } from '../context/CartContext'
import SideCartItem from '../componentes/SideCartItem'

const ItemListContainer = () => {
  const { products, setProducts } = useContext(ProductsContext)
  const { getFromLocalStorage, cart, cartOn, setCartOn } =
    useContext(CartContext)

  const productsCollectionRef = collection(db, 'products')

  useEffect(() => {
    getFromLocalStorage()
  }, [])

  useEffect(() => {
    if (products.length === 0) {
      const getProducts = async () => {
        try {
          const data = await getDocs(productsCollectionRef)
          setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        } catch (error) {
          console.error('Ha ocurrido un error', error)
        }
      }
      getProducts()
    }
  }, [products.length])

  return (
    <div className='itemListContainerFather'>
      {products.length > 0 ? (
        <ul className='itemListContainer'>
          {products.map((product) => (
            <ItemListComponent key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <h1>Cargando...</h1>
      )}
      {cartOn && (
        <div className='sideCart'>
          <p onClick={() => setCartOn(false)} className='sideCartCloseBtn'>
            ❌
          </p>
          <ul className='sideCartList'>
            {cart.map((item) => (
              <SideCartItem item={item} key={item.id} />
            ))}
          </ul>
          {cart.length > 0 && (
            <button className='sideCartFinishBtn'>Finalizar compra</button>
          )}
        </div>
      )}
    </div>
  )
}

export default ItemListContainer
