import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import RequireAuth from './components/RequireAuth/RequireAuth';
import AuthOrRegistration from './components/AuthOrRegistration/AuthOrRegistration';
import Auth from './components/Auth/Auth';
import Registration from './components/Registration/Registration';
import Menu from './components/Menu/Menu';
import Dashboard from './components/Dashboard/Dashboard';
import Hub from './components/Hub/Hub';


function App() {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <div id='gray_space' className='app-wrapper-content'>
          <Routes>
            <Route path='/' element={<AuthOrRegistration/>}/>  
            <Route path='/login' element={<Auth/>}/>
            <Route path='/registration' element={<Registration/>}/>
            <Route path='/registration' element={<RequireAuth><Dashboard /> </RequireAuth>}/>
            <Route path='/hub' element={<RequireAuth> <Hub/> </RequireAuth>}/>
            <Route path='/menu' element={<RequireAuth><Menu /> </RequireAuth>}/>
          </Routes>
        </div>       
      </div>  
    </BrowserRouter>
  );
}

export default App;
