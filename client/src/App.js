import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from 'scenes/homePage/HomePage';
import LoginPage from 'scenes/loginPage/Login';
import UploadPhoto from 'scenes/loginPage/uploadPhoto';
import ProfilePage from 'scenes/profilePage/ProfilePage';
import { themeSettings } from 'theme';

const App = () => {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  const isAuth = Boolean(useSelector((state) => state.token))

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme} >
          <CssBaseline>

            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/uploadPhoto' element={isAuth ? <UploadPhoto /> : <Navigate to='/' />} />
              <Route path='/home' element={isAuth ? <HomePage /> : <Navigate to='/' />} />
              <Route path='/profile/:userId' element={isAuth ? <ProfilePage /> : <Navigate to='/' />} />
            </Routes>

          </CssBaseline>
        </ThemeProvider>
      </BrowserRouter>


    </div >
  )
};

export default App