import './App.css'
import Catalog from './Components/Catalog'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Cart from './Components/Cart';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App