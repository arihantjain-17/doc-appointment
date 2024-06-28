import "./App.css";
import { BrowserRouter , Route, Routes } from 'react-router-dom';

import Landingpage from "./pages/Landingpage"
import Docpage from './pages/Docpage';


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landingpage/>}/>
        <Route path="/doctor/:id" element={<Docpage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
