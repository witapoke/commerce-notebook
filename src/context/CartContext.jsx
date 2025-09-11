/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [cartOn, setCartOn] = useState(false)

  const getFromLocalStorage = () => {
    const cartFromStorage = JSON.parse(localStorage.getItem('carrito'))
    if (cartFromStorage) {
      setCart(cartFromStorage)
    } else {
      setCart([])
    }
  }

  const addToCart = (products, id) => {
    const productToAdd = products.find((product) => product.id === id)
    if (productToAdd) {
      if (productToAdd.qty >= 1) {
        productToAdd.qty++
        setCart([...cart])
        localStorage.setItem('carrito', JSON.stringify(cart))
      } else {
        productToAdd.qty = 1
        setCart([...cart, productToAdd])
        localStorage.setItem('carrito', JSON.stringify(cart))
      }
    } else {
      console.error('No se pudo encontrar al producto requerido')
    }
  }

  const RemoveQty = (id) => {
    const productToRemoveQty = cart.find((product) => product.id === id)
    if (productToRemoveQty) {
      if (productToRemoveQty.qty > 1) {
        productToRemoveQty.qty--
        setCart([...cart])
        localStorage.setItem('carrito', JSON.stringify(cart))
      } else if (productToRemoveQty.qty === 1) {
        const carritoFiltrado = cart.filter((item) => item.id !== id)
        setCart(carritoFiltrado)
        localStorage.setItem('carrito', JSON.stringify(carritoFiltrado))
      }
    }
  }

  const contextValue = {
    getFromLocalStorage,
    addToCart,
    RemoveQty,
    cart,
    setCart,
    cartOn,
    setCartOn
  }

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  )
}
