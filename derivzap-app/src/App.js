import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import TradingInterface from './components/TradingDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const navigate = useNavigate();

  // Navigation functions
  const goToAdmin = () => navigate('/admin');
  const goToTrading = () => navigate('/trading');

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/trading" replace />} />
      
      <Route 
        path="/trading" 
        element={<TradingInterface />} 
      />
      
      <Route 
        path="/admin" 
        element={<AdminDashboard />} 
      />

      <Route path="/user/:userId" element={<div>User Details Page</div>} />
    </Routes>
  );
}

export default App;