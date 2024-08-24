
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Forgotpassword from './Components/Forgotpassword';
import ResetPassword from './Components/Loginandsignup/ReserPassword';
import LoginSignup from './Components/Loginandsignup/LoginSignup';
import Dashboard from './Components/Loginandsignup/Dashboard';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/forgot-password" element={<Forgotpassword/>} />
                <Route path="/reset-password/:token" element={<ResetPassword/>} />
                <Route path="/" element={<LoginSignup/>} />
                <Route path="/Dashboard" element={<Dashboard/>} />
               
            </Routes>
        </Router>
    );
}

export default App;
