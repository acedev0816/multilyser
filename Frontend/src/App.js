import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import SuccessPage from './Components/Success'
import { useSelector } from 'react-redux';
import LandingPage from './Components/Landing'
import TaskPage from './Components/Task'
import PrivacyPage from "./Components/Privacy";
import TermPage from "./Components/Terms"
import CookiePolicyPage from "./Components/Cookie";
import  './App.css'
export default function App() {
  
  
  const paymentStatus = useSelector((state)=> state.protect.paymentStatus)
  const emailStatus = useSelector((state)=> state.protect.emailStatus)


  return (

        <Router>
          <Routes>
            
            <Route exact path="/" element={ <LandingPage/>} />
            <Route exact path="/privacy-policy" element={ <PrivacyPage/>} />
            <Route exact path="/cookie-policy" element={ <CookiePolicyPage/>} />
            <Route exact path="/terms" element={ <TermPage />} />

            <Route element={
              <ProtectedRoute isAuthenticated={emailStatus} redirectTo={"/"}>
                <TaskPage/>
              </ProtectedRoute>
            }
            exact path="/task"
            />

            
            <Route element={
              <ProtectedRoute isAuthenticated={paymentStatus} redirectTo={"/"}>
                <SuccessPage />
              </ProtectedRoute>
            }
            exact path="/payment-success"
            />
    
          </Routes>
      
        </Router>
       
      
  );
}