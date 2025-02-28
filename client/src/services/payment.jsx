import React, { useState, Fragment } from "react";

const CarPayments = () => {
  const [formData, setFormData] = useState({
    amount: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.amount) newErrors.amount = "Payment amount is required";
    else if (formData.amount <= 0)
      newErrors.amount = "Amount must be greater than zero";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processPayment = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Payment successful! Thank you.");
        setFormData({
          amount: "",
        });
        console.log(data)
        setErrors({});
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Payment failed. Please try again.");
      }
    } catch (err) {
      console.error(err.message);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <Fragment>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Make a Payment
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
          <form onSubmit={processPayment} className="space-y-6">
            {/* Payment Amount */}
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Amount
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter amount to pay"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount}</p>
              )}
            </div>

            {/* Submit Payment */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CarPayments;
