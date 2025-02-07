import React from 'react'
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import {Routes,Route} from 'react-router-dom'
import Layout from './Layout'
import SignupPage from './pages/auth/SignupPage'
import AdminDashboard from './components/navbars/AdminDashboard'
import UsersPage from './pages/admin/UsersPage'
import HotelsPage from './pages/admin/HotelsPage'
import BookingsPage from './pages/admin/BookingsPage'
import BookingDetailPage from './pages/admin/BookingDetailPage'

import MyBookingsPage from './pages/booking/MyBookingsPage'
import MyBookingDetail from './pages/booking/MyBookingDetail'
import AccountNav from './components/navbars/AccountNav'
import ProfilePage from './pages/auth/ProfilePage'
import HotelFormPage from './pages/hotel/HotelFormPage'
import PlacesPage from './pages/hotel/PlacesPage'
import HotelPage from './pages/hotel/HotelPage'
import Footer from './components/Footer'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'

const App = () => {
  return (
    <>
      


    <Routes>
   
   
      <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />}/>
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/hotel/:id" element={<HotelPage />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
    
{/* Admin Routes */}
      
       {/* Admin Users Page */}
      <Route path="/admin" element={<UsersPage/>} />
      {/* Admin Hotels Page */}
      <Route path="/admin/:subpage" element={<UsersPage />} /> 
      {/* Admin Bookings Page */}
      <Route path="/admin/:subpage" element={<AdminDashboard />} /> 

      
      {/* Admin Bookings Page */}
      <Route path="/admin/bookings" element={<BookingsPage />} />
      <Route path="/admin/bookings/:id" element={<BookingDetailPage />} /> 
      <Route path="/admin/hotels" element={<HotelsPage />} />

 {/* user Routes */}
      <Route path="/account" element={<ProfilePage/>} />
      <Route path="/account/:subpage" element={<ProfilePage />} />
      <Route path="/account/:subpage?" element={<AccountNav />} />

      <Route path="/account/places" element={<PlacesPage />} />

      <Route path="/account/places/new" element={<HotelFormPage />} />

      <Route path="/account/places/:id" element={<HotelFormPage />} />
    
  
      <Route path="/account/bookings" element={<MyBookingsPage/>} />

      <Route path="/account/bookings/:id" element={<MyBookingDetail />} />

      </Route>
      
  
    </Routes>
    <Footer/>
    </>
  )
}

export default App
