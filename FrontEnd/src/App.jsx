import { useState } from 'react'
import Video from './Pages/Video'
import Stalls from './Pages/Stalls'
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Biryanispot from './Pages/Biryanispot'
import Pizzarity from './Pages/Pizzarity'
import BurgerVault from './Pages/BurgerVault'
import Wrapeats from './Pages/Wrapeats'  
import Sippity from './Pages/Sippity'  
import Snoozyscoops from './Pages/Snoozyscoops'
import Cart from './Components/Cart'
import Payment from './Components/Payment'
import Admin from '../Admin/Admin'
// import PaymentQR from './Components/PaymentQr'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Video />} />
          <Route path="/stalls" element={<Stalls />} />
          <Route path='/biryanispot' element={<Biryanispot/>}/>
          <Route path='/pizzarity' element={<Pizzarity/>}/>
          <Route path='/burgervault' element={<BurgerVault/>}/>
          <Route path='/wrapeats' element={<Wrapeats/>}/>
          <Route path='/sippity' element={<Sippity/>}/>
          <Route path='/snoozyscoops' element={<Snoozyscoops/>}/>
          <Route path='cart' element={<Cart/>}/>
          <Route path='/payment' element={<Payment />}/>
          {/* <Route path="/paymentqr" element={<PaymentQR />} /> */}
          <Route path='/admin' element={<Admin/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default App
