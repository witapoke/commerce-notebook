import { CartContext } from '../context/CartContext'
import '../estilos/Cart.css'
import { memo, useContext, useEffect } from 'react'

const CartWidget = memo(({ price }) => {
  useEffect(() => {
    console.log('cart widget render')
  })

  const { setCartOn, cartOn, cartPrice } = useContext(CartContext)

  return (
    <div className='cart-container'>
      <div className='cart-icon' onClick={() => setCartOn(!cartOn)}>
        🛒
      </div>
      <div className='cart-description'>
        <p>Cart</p>
        <h4>${cartPrice}</h4>
      </div>
    </div>
  )
})

export default CartWidget
