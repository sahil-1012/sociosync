import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from 'scenes/homePage/HomePage';
import LoginPage from 'scenes/loginPage/Login';
import ProfilePage from 'scenes/profilePage/ProfilePage';

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/profile/:userId' element={<ProfilePage />} />

        </Routes>
      </BrowserRouter>


    </div>
  )
};

export default App