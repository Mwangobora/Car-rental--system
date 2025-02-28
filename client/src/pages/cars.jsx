import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCars = async () => {
      try {
        const response = await fetch("http://localhost:5000/cars");
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    getCars();
  }, []);

  const handleBookCar = (carId) => {
    navigate(`/booking/${carId}`);
  };

  return (
    <Fragment>
      <div className="bg-gradient-to-r from-blue-500 to-blue-900 text-white py-16">
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold text-center mb-6 animate__animated animate__fadeIn">
            Discover Our Amazing Cars
          </h1>
          <p className="text-center text-lg mb-6 animate__animated animate__fadeIn animate__delay-1s">
            Find the perfect car for your next adventure! Choose from a variety
            of cars to rent. Affordable prices, luxurious options, and great
            customer service.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div
                key={car.id}
                className="border rounded-lg shadow-lg overflow-hidden bg-white transition-all transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100 duration-300"
              >
                <img
                  src={`http://localhost:5000${car.image_url}`} // Assuming the backend serves the image
                  alt={car.name}
                  className="w-full h-50 object-cover transition-transform transform hover:scale-110"
                />
                <div className="p-4">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {car.name}
                  </h3>
                  <p className="text-gray-600">Brand: {car.brand}</p>
                  <p className="text-lg font-bold text-gray-800">
                    Price per Day: ${car.price_per_day}
                  </p>
                  <button
                    onClick={() => handleBookCar(car.id)}
                    className="w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Cars;
