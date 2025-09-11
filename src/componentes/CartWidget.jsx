import { CartContext } from '../context/CartContext'
import '../estilos/Cart.css'
import { memo, useContext, useEffect } from 'react'

const CartWidget = memo(() => {
  useEffect(() => {
    console.log('cart widget render')
  })

  const { setCartOn, cartOn } = useContext(CartContext)

  return (
    <div className='cart-container'>
      <div className='cart-icon' onClick={() => setCartOn(!cartOn)}>
        🛒
      </div>
      <div className='cart-description'>
        <p>Cart</p>
        <h4>$1500</h4>
      </div>
    </div>
  )
})

export default CartWidget
