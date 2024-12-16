import React from 'react'
import BookingForm from './BookingForm'
import Footer from './Footer'
import Navbar from './Navbar'

function BookingPage() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
                <BookingForm />
            </main>
            <Footer />
        </div>
    )
}

export default BookingPage