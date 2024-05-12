import Products from "./components/products";
import { CartProvider } from "./components/cartContext";


function App() {
  
  return (
    <CartProvider>
    <Products />
    </CartProvider>
  )
}

export default App