import React, { Fragment, useState, useEffect } from 'react';

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ name: '', brand: '', price_per_day: '' });
  const [imageFile, setImageFile] = useState(null); // Store the selected file

  useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
    const response = await fetch('http://localhost:5000/cars', {
      method: 'GET',
    });
    const responseData = await response.json();
    setCars(responseData);
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Set the selected file
  };

  const handlePostCar = async () => {
    const formData = new FormData();
    formData.append('name', newCar.name);
    formData.append('brand', newCar.brand);
    formData.append('price_per_day', newCar.price_per_day);
    if (imageFile) {
      formData.append('image', imageFile); // Append the image file
    }

    try {
      const response = await fetch('http://localhost:5000/cars', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setNewCar({ name: '', brand: '', price_per_day: '' });
        setImageFile(null); // Clear the file input
        getCars(); // Reload the cars list
      } else {
        console.error('Failed to add car');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteCar = async (id) => {
    const response = await fetch(`http://localhost:5000/cars/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      getCars();
    }
  };

  return (
    <Fragment>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Car Management</h2>
        </div>

        {/* Add Car Form */}
        <div className="mb-6">
          <h3 className="text-lg font-medium">Add New Car</h3>
          <form className="space-y-4">
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Car Name"
              value={newCar.name}
              onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
            />
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Brand"
              value={newCar.brand}
              onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
            />
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Price per Day"
              value={newCar.price_per_day}
              onChange={(e) => setNewCar({ ...newCar, price_per_day: e.target.value })}
            />
            <input
              type="file"
              className="w-full p-2 border rounded"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={handlePostCar}
              className="w-full p-2 bg-blue-500 text-white rounded"
            >
              Add Car
            </button>
          </form>
        </div>

        {/* Car List */}
        <div>
          <h3 className="text-lg font-medium">Car List</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cars.map((car) => (
              <div key={car.id} className="border p-4 rounded shadow">
                <img
                src={`http://localhost:5000${car.image_url}`} // Image URL from backend
                alt={car.name}
                className="w-full h-42 object-cover mb-4 rounded"
                />
                <h4 className="text-xl font-semibold">{car.name}</h4>
                <p>Brand: {car.brand}</p>
                <p>Price per Day: ${car.price_per_day}</p>
                <button
                  onClick={() => handleDeleteCar(car.id)}
                  className="w-full p-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CarManagement;
