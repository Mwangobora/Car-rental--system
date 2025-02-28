import React, { Fragment, useState, useEffect } from 'react';

const Payments = () => {
    const [payments, setPayments] = useState([]);

    // Fetch all payments
    const getPayments = async () => {
        try {
            const response = await fetch('http://localhost:5000/payments', {
                method: 'GET',
            });
            const responseData = await response.json(); // Parse JSON response
            setPayments(responseData); // Update state with payments
        } catch (err) {
            console.error(err.message);
        }
    };

    // Delete a specific payment
    const deletePayment = async (id) => {
        try {
            await fetch(`http://localhost:5000/payments/${id}`, {
                method: 'DELETE',
            });
            // Update payments state after deletion
            setPayments(payments.filter((payment) => payment.id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    // Fetch payments on component load
    useEffect(() => {
        getPayments();
    }, []);

    return (
        <Fragment>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-center mb-6">Payments</h1>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Payment ID</th>
                                <th className="border border-gray-300 px-4 py-2">Customer</th>
                                <th className="border border-gray-300 px-4 py-2">Amount</th>
                                <th className="border border-gray-300 px-4 py-2">Date</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length > 0 ? (
                                payments.map((payment) => (
                                    <tr key={payment.id} className="text-center hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">{payment.id}</td>
                                        <td className="border border-gray-300 px-4 py-2">{payment.customer}</td>
                                        <td className="border border-gray-300 px-4 py-2">{payment.amount}</td>
                                        <td className="border border-gray-300 px-4 py-2">{payment.date}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                onClick={() => deletePayment(payment.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="border border-gray-300 px-4 py-2 text-center">
                                        No payments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
};

export default Payments;
