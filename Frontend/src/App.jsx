import "./App.css";
import { BrowserRouter , Route, Routes } from 'react-router-dom';

import Landingpage from "./pages/Landingpage"
import Docpage from './pages/Docpage';
import Userprofile from './pages/Userprofile'
import DoctorProfile from './pages/DoctorProfile';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landingpage/>}/>
        <Route path="/doctor/:id" element={<Docpage/>} />
        <Route path="/profile" element={<Userprofile/>}/>
        <Route path="/doctor-profile/:id" element={<DoctorProfile/>} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App 
