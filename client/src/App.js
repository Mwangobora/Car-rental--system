import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Cars from './pages/cars';
import AboutUs from './pages/aboutUs';
import Navigation from './components/navigation';
import LoginForm from './components/login';
import RegisterForm from './components/register';
import Help from './pages/help';
import Booking from './services/booking';
import CarPayments from './services/payment';

import AdminSidebarNavigation from './Admin/Navigation';
import AdminLogin from './Admin/adminLogin';
import CarManagement from './Admin/carManagement';
import BookingManagement from './Admin/bookingMnagement';
import Payments from './Admin/payment';
import Reviews from './Admin/reviews';
import Customers from './Admin/userManagement';
import './App.css';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Function to handle login
  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Admin Dashboard Routes */}
          <Route
            path="/admin/*"
            element={
              isAdminLoggedIn ? (
                <div className="flex h-screen">
                  {/* Sidebar */}
                  <AdminSidebarNavigation />
                  {/* Main Content */}
                  <div className="w-3/4 p-6 overflow-y-auto">
                    <Routes>
                      <Route path="cars" element={<CarManagement />} />
                      <Route path="bookings" element={<BookingManagement />} />
                      <Route path="payments" element={<Payments />} />
                      <Route path="reviews" element={<Reviews />} />
                      <Route path="customers" element={<Customers />} />
                    </Routes>
                  </div>
                </div>
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
          <Route
            path="/admin/login"
            element={
              isAdminLoggedIn ? (
                <Navigate to="/admin/cars" />
              ) : (
                <AdminLogin onLogin={handleAdminLogin} />
              )
            }
          />

          {/* Public Website Routes */}
          <Route
            path="/*"
            element={
              <>
                <Navigation />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cars" element={<Cars />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/sign in" element={<LoginForm />} />
                  <Route path="/register" element={<RegisterForm />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/booking/:carId" element={<Booking />} />
                  <Route path="/Carpayment" element={<CarPayments />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
    