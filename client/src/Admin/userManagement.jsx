import React, { Fragment, useState, useEffect } from "react";

const Customers = () => {
    const [users, setUsers] = useState([]);

    // Function to fetch users from the backend
    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/users", {
                method: "GET",
            });
            const responseData = await response.json();
            setUsers(responseData); // Update users state with data
        } catch (err) {
            console.error("Error fetching users:", err.message);
        }
    };

    // Function to delete a user
    const deleteUser = async (id) => {
        try {
            await fetch(`http://localhost:5000/users/${id}`, {
                method: "DELETE",
            });
            setUsers(users.filter((user) => user.id !== id)); // Update state to reflect deletion
        } catch (err) {
            console.error("Error deleting user:", err.message);
        }
    };

    // Fetch users when component mounts
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Fragment>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Customers Management
                </h1>
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="min-w-full table-auto border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                                    Username
                                </th>
                                <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-center text-gray-700 font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b hover:bg-gray-50 transition duration-200"
                                    >
                                        <td className="px-6 py-4">{user.id}</td>
                                        <td className="px-6 py-4">{user.username}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">{user.role}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center px-6 py-4 text-gray-500"
                                    >
                                        No customers found.
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

export default Customers;
