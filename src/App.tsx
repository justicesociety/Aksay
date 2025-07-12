import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Advantages from './components/Advantages';
import Calculator from './components/Calculator';
import WorkSteps from './components/WorkSteps';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import PricingPage from './components/PricingPage';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import CookieNotice from './components/CookieNotice';
import Dashboard from './components/Dashboard';
import { useAuth } from './contexts/AuthContext';

function MainContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <main>
        <Hero />
        <Advantages />
        {!isAuthenticated && <Calculator />}
        <WorkSteps />
        <Pricing />
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<MainContent />} />
          </Routes>
          <Footer />
          <CookieNotice />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;