import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookingPage from './BookingPage';
import Success from './Success';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingPage />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
