import React, { Fragment, useState, useEffect } from 'react';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    user_id: '',
    car_id: '',
    start_date: '',
    end_date: '',
    total_price: '',
    status: '',
  });
  const [editingBooking, setEditingBooking] = useState(null);
  const [editBookingData, setEditBookingData] = useState({
    user_id: '',
    car_id: '',
    start_date: '',
    end_date: '',
    total_price: '',
    status: '',
  });

  // Fetch all bookings on component mount
  useEffect(() => {
    getBookings();
  }, []);

  // Fetch bookings
  const getBookings = async () => {
    try {
      const response = await fetch('http://localhost:5000/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // Create new booking
  const handleCreateBooking = async () => {
    const response = await fetch('http://localhost:5000/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBooking),
    });
    if (response.ok) {
      setNewBooking({
        user_id: '',
        car_id: '',
        start_date: '',
        end_date: '',
        total_price: '',
        status: '',
      });
      getBookings(); // Refresh the bookings list
    }
  };

  // Edit booking
  const handleEditBooking = (booking) => {
    setEditingBooking(booking.id);
    setEditBookingData({ ...booking });
  };

  // Update booking
  const handleUpdateBooking = async () => {
    const response = await fetch(`http://localhost:5000/bookings/${editingBooking}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editBookingData),
    });
    if (response.ok) {
      setEditingBooking(null); // Close the edit form
      getBookings(); // Refresh the bookings list
    }
  };

  // Delete booking
  const handleDeleteBooking = async (id) => {
    const response = await fetch(`http://localhost:5000/bookings/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      getBookings(); // Refresh the bookings list
    }
  };

  return (
    <Fragment>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Booking Management</h2>
        </div>

        {/* Create New Booking Form */}
        <div className="mb-6">
          <h3 className="text-lg font-medium">Create New Booking</h3>
          <form className="space-y-4">
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="User ID"
              value={newBooking.user_id}
              onChange={(e) => setNewBooking({ ...newBooking, user_id: e.target.value })}
            />
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Car ID"
              value={newBooking.car_id}
              onChange={(e) => setNewBooking({ ...newBooking, car_id: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={newBooking.start_date}
              onChange={(e) => setNewBooking({ ...newBooking, start_date: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={newBooking.end_date}
              onChange={(e) => setNewBooking({ ...newBooking, end_date: e.target.value })}
            />
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Total Price"
              value={newBooking.total_price}
              onChange={(e) => setNewBooking({ ...newBooking, total_price: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded"
              value={newBooking.status}
              onChange={(e) => setNewBooking({ ...newBooking, status: e.target.value })}
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              type="button"
              onClick={handleCreateBooking}
              className="w-full p-2 bg-blue-500 text-white rounded"
            >
              Create Booking
            </button>
          </form>
        </div>

        {/* Edit Booking Form */}
        {editingBooking && (
          <div className="mb-6">
            <h3 className="text-lg font-medium">Edit Booking</h3>
            <form className="space-y-4">
              <input
                type="number"
                className="w-full p-2 border rounded"
                placeholder="User ID"
                value={editBookingData.user_id}
                onChange={(e) => setEditBookingData({ ...editBookingData, user_id: e.target.value })}
              />
              <input
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Car ID"
                value={editBookingData.car_id}
                onChange={(e) => setEditBookingData({ ...editBookingData, car_id: e.target.value })}
              />
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={editBookingData.start_date}
                onChange={(e) => setEditBookingData({ ...editBookingData, start_date: e.target.value })}
              />
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={editBookingData.end_date}
                onChange={(e) => setEditBookingData({ ...editBookingData, end_date: e.target.value })}
              />
              <input
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Total Price"
                value={editBookingData.total_price}
                onChange={(e) => setEditBookingData({ ...editBookingData, total_price: e.target.value })}
              />
              <select
                className="w-full p-2 border rounded"
                value={editBookingData.status}
                onChange={(e) => setEditBookingData({ ...editBookingData, status: e.target.value })}
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                type="button"
                onClick={handleUpdateBooking}
                className="w-full p-2 bg-green-500 text-white rounded"
              >
                Update Booking
              </button>
            </form>
          </div>
        )}

        {/* Bookings List */}
        <div>
          <h3 className="text-lg font-medium">Bookings List</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border p-4 rounded shadow">
                <h4 className="text-xl font-semibold">Booking #{booking.id}</h4>
                <p>User ID: {booking.user_id}</p>
                <p>Car ID: {booking.car_id}</p>
                <p>Start Date: {booking.start_date}</p>
                <p>End Date: {booking.end_date}</p>
                <p>Total Price: ${booking.total_price}</p>
                <p>Status: {booking.status}</p>
                <button
                  onClick={() => handleEditBooking(booking)}
                  className="w-full p-2 bg-yellow-500 text-white rounded my-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBooking(booking.id)}
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

export default BookingManagement;
