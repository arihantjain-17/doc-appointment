import "./App.css";
import { BrowserRouter , Route, Routes } from 'react-router-dom';

import Landingpage from "./pages/Landingpage"
import Docpage from './pages/Docpage';
import Userprofile from './pages/Userprofile'
import DoctorProfile from './pages/DoctorProfile';
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import DoctorSignupPage from './pages/DoctorSignupPage';
import DoctorLoginPage from './pages/DoctorLoginPage';
import Homepage from './pages/Homepage'
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/user/:id' element={<Landingpage/>}/>
        <Route path="/doctor/:id" element={<Docpage/>} />
        <Route path="/profile/:id" element={<Userprofile/>}/>
        <Route path="/doctor-profile/:id" element={<DoctorProfile/>} /> 
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/doctor/signup" element={<DoctorSignupPage />} />
        <Route path="/doctor/login" element={<DoctorLoginPage />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  )
} 

export default App 
 