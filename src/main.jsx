import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ProductsProvider} from './context/ProductsContext'
import {CartProvider} from './context/CartContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </CartProvider>
  </BrowserRouter>
)
