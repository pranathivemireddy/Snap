import { useState } from 'react'
import Video from './Components/Video'
import Stalls from './Components/Stalls'
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Biryanispot from './Components/Biryanispot'
import Pizzarity from './Components/Pizzarity'
import BurgerVault from './Components/BurgerVault'
import Wrapeats from './Components/Wrapeats'  
import Sippity from './Components/Sippity'  
import Snoozyscoops from './Components/Snoozyscoops'
import Admin from '../FrontEnd/Admin/admin'
function App() {
  const [count, setCount] = useState(0)

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
          <Route path='/admin' element={<Admin/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default App
