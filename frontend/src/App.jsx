import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Gigs from './pages/Gigs';
import GigDetails from './pages/GigDetails';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from "react-hot-toast"
import ProtectedRoute from './components/ProtectedRoute';
import MyGig from './pages/MyGig';
import MyBids from './pages/MyBids';

const App = () => {
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/gigs' element={
          <ProtectedRoute>
            <Gigs />
          </ProtectedRoute>
        } />
        <Route path='/gigs/:id' element={
          <ProtectedRoute>
            <GigDetails />
          </ProtectedRoute>
        } />


        <Route path='/my-gigs' element={
          <ProtectedRoute>
            <MyGig />
          </ProtectedRoute>
        } />
        <Route path='/my-bids' element={
          <ProtectedRoute>
            <MyBids />
          </ProtectedRoute>
        } />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
