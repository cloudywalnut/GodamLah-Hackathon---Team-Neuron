import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function BookingForm() {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        checkIn: '',
        checkOut: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
    });

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'expiry') {
            const numericValue = value.replace(/[^\d/]/g, '');

            if (numericValue.length > 5) return;

            if (numericValue.length === 2 && formData.expiry.length === 3) {
                setFormData((prev) => ({ ...prev, expiry: numericValue.slice(0, -1) }));
                return;
            }

            if (numericValue.length === 2 && !numericValue.includes('/')) {
                setFormData((prev) => ({ ...prev, expiry: numericValue + '/' }));
                return;
            }

            setFormData((prev) => ({ ...prev, expiry: numericValue }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const { email } = formData;

            const response = await axios.post('http://localhost:5000/validation/email', { email });
    
            if (response.status === 200) {
                const confidenceScore = response.data[0][0];
    
                if (confidenceScore < 0.5) {
                    setErrorMessage(
                        'We have detected some anomalies in your booking, please contact our booking manager directly to confirm your booking'
                    );
                    setShowErrorModal(true);
                    return;
                }
    
                navigate('/success');
            } else {
                setErrorMessage(response.data.message || 'Something went wrong. Please try again.');
                setShowErrorModal(true);
            }
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || 'Network error. Please check your connection.'
            );
            setShowErrorModal(true);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div
                        className="card shadow-lg p-4 mb-5"
                        style={{
                            borderRadius: '15px',
                            background: 'linear-gradient(135deg, #ffffff, #f9f9f9)',
                        }}
                    >
                        <h2 className="text-center mb-4" style={{ color: '#007bff', fontWeight: 'bold' }}>
                            Book Your Stay
                        </h2>
                        <form onSubmit={handleSubmit}>
                            {/* Guest Information */}
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName" className="form-label">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        placeholder="John"
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName" className="form-label">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            {/* Stay Period */}
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="checkIn" className="form-label">
                                        Check-In Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="checkIn"
                                        name="checkIn"
                                        value={formData.checkIn}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="checkOut" className="form-label">
                                        Check-Out Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="checkOut"
                                        name="checkOut"
                                        value={formData.checkOut}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Billing Information */}
                            <h4 className="mt-4" style={{ color: '#007bff' }}>
                                Billing Information
                            </h4>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="example@mail.com"
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    placeholder="1234 Main St"
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="city" className="form-label">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        placeholder="Kuala Lumpur"
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="state" className="form-label">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                        placeholder="Selangor"
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="zip" className="form-label">
                                        ZIP Code
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="zip"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleChange}
                                        required
                                        placeholder="50000"
                                    />
                                </div>
                            </div>

                            {/* Payment Information */}
                            <h4 className="mt-4">Payment Information</h4>
                            <div className="mb-3">
                                <label htmlFor="cardName" className="form-label">
                                    Name on Card
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cardName"
                                    name="cardName"
                                    value={formData.cardName}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cardNumber" className="form-label">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder="1234 5678 9012 3456"
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="expiry" className="form-label">
                                        Expiry Date (MM/YY)
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="expiry"
                                        name="expiry"
                                        value={formData.expiry}
                                        onChange={handleChange}
                                        required
                                        placeholder="MM/YY"
                                        maxLength={5}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="cvv" className="form-label">
                                        CVV
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cvv"
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={handleChange}
                                        required
                                        placeholder="123"
                                        maxLength={3} // Restrict CVV to 3 digits
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100 mt-4"
                                style={{ fontWeight: 'bold', fontSize: '18px' }}
                            >
                                Confirm Booking
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* Error Modal */}
            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default BookingForm