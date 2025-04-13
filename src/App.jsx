import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Register';
import Login from './Login'

const App = ()=> {
  return(
   <>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>} />
          <Route path="login" element={<Login/>} />
         
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
