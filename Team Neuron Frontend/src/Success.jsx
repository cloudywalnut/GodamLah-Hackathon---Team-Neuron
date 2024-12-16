import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Success() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <div className="container my-5">
          <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Booking Successful!</h4>
            <p>Your booking has been confirmed. Thank you for choosing us.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Success