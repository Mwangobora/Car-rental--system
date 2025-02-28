import React, { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Booking = () => {
    const { carId } = useParams(); // Get carId from the URL
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState({
        car_id: carId || "", // Pre-fill car_id if available
        start_date: "",
        end_date: "",
        total_price: "",
    });

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [showPayment, setShowPayment] = useState(false);

    useEffect(() => {
        if (carId) {
            setFormData((prevData) => ({ ...prevData, car_id: carId }));
        }
    }, [carId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.car_id) newErrors.car_id = "Car ID is required.";
        if (!formData.start_date) newErrors.start_date = "Start date is required.";
        if (!formData.end_date) newErrors.end_date = "End date is required.";
        if (!formData.total_price || formData.total_price <= 0)
            newErrors.total_price = "Total price must be greater than zero.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const bookCar = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            
            const response = await fetch("http://localhost:5000/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage("Booking successful! Please proceed with payment.");
                setShowPayment(true); // Show the payment section after booking
                setFormData({
                    car_id: "",
                    start_date: "",
                    end_date: "",
                    total_price: "",
                });
                console.log(data);
                setErrors({});
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || "Booking failed. Please try again.");
            }
        } catch (err) {
            console.error(err.message);
            setMessage("Server error. Please try again later.");
        }
    };

    const handlePayment = (paymentMethod) => {
        setMessage(`Payment method selected: ${paymentMethod}`);
        // Redirect to /carPayment after selecting payment method
        navigate("/carPayment");
    };

    return (
        <Fragment>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                        Book a Car
                    </h2>
                    {message && (
                        <div
                            className={`text-center mb-4 ${
                                message.includes("successful")
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            {message}
                        </div>
                    )}
                    {!showPayment ? (
                        <form onSubmit={bookCar} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="car_id"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Car ID
                                </label>
                                <input
                                    type="text"
                                    name="car_id"
                                    value={formData.car_id}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter car ID"
                                    readOnly
                                />
                                {errors.car_id && (
                                    <p className="text-red-500 text-sm">{errors.car_id}</p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="start_date"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={formData.start_date}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.start_date && (
                                    <p className="text-red-500 text-sm">{errors.start_date}</p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="end_date"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    name="end_date"
                                    value={formData.end_date}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.end_date && (
                                    <p className="text-red-500 text-sm">{errors.end_date}</p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="total_price"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Total Price
                                </label>
                                <input
                                    type="number"
                                    name="total_price"
                                    value={formData.total_price}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter total price"
                                />
                                {errors.total_price && (
                                    <p className="text-red-500 text-sm">{errors.total_price}</p>
                                )}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 hover:bg-blue-600"
                                >
                                    Book Now
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium text-center">Select Payment Method</h3>
                            <div className="space-y-4">
                                <button
                                    onClick={() => handlePayment("Credit Card")}
                                    className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300 hover:bg-green-600"
                                >
                                    Pay with Credit Card
                                </button>
                                <button
                                    onClick={() => handlePayment("PayPal")}
                                    className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600 transition duration-300 hover:bg-yellow-600"
                                >
                                    Pay with PayPal
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default Booking;
