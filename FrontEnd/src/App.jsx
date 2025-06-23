import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Video from './Pages/Video';
import Stalls from './Pages/Stalls';
import Biryanispot from './Pages/Biryanispot';
import Pizzarity from './Pages/Pizzarity';
import BurgerVault from './Pages/BurgerVault';
import Wrapeats from './Pages/Wrapeats';
import Sippity from './Pages/Sippity';
import Snoozyscoops from './Pages/Snoozyscoops';
import Cart from './Components/Cart';
import Payment from './Components/Payment';
import Admin from './Admin/Admin';
import PaymentSuccess from './Components/PaymentSucess';

const stripePromise = loadStripe('pk_test_51RP0qvR2xnlM6CS3V2N2eVLbDlSl4DQBdCnmWu9Gt3kxOpsKUujHyzRqsAXFEH6GSJ5FUj0VTcjgc4jdlnmYy2rA00CZmgURoh');

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Video />} />
        <Route path="/stalls" element={<Stalls />} />
        <Route path="/biryanispot" element={<Biryanispot />} />
        <Route path="/pizzarity" element={<Pizzarity />} />
        <Route path="/burgervault" element={<BurgerVault />} />
        <Route path="/wrapeats" element={<Wrapeats />} />
        <Route path="/sippity" element={<Sippity />} />
        <Route path="/snoozyscoops" element={<Snoozyscoops />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/paymentqr" element={<PaymentQR />} /> */}
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
        <Route path="/payment-success" element={<PaymentSuccess/>} />
      </Routes>
    </Router>
  );
}

export default App;
