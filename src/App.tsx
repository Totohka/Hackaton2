import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Auth from './components/Auth/Auth';
import Registration from './components/Registration/Registration';
import Menu from './components/Menu/Menu';
import Dashboard from './components/Dashboard/Dashboard';
import Hub from './components/Hub/Hub';


function App() {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        {/* <div> */}
          <Routes>
            <Route path='*' element={<Auth/>}/>  
            <Route path='/login' element={<Auth/>}/>
            <Route path='/registration' element={<Registration/>}/>
            <Route path='/dashboard' element={<RequireAuth><Dashboard /> </RequireAuth>}/>
            <Route path='/hub' element={<RequireAuth> <Hub/> </RequireAuth>}/>
            <Route path='/menu' element={<RequireAuth><Menu /> </RequireAuth>}/>
          </Routes>
      </div>  
    </BrowserRouter>
  );
}

export default App;
