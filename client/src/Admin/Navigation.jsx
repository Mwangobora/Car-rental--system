import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebarNavigation = () => {
    const menuItems = [
        { name: "Car Management", path: "/admin/cars" },
        { name: "Customer Management", path: "/admin/customers" },
        { name: "Payment Management", path: "/admin/payments" },
        { name: "Booking Management", path: "/admin/bookings" },
        { name: "Reviews Management", path: "/admin/reviews" },
    ];

    return (
        <Fragment>
            <div className="h-screen w-64 bg-gray-900 text-white flex flex-col">
                {/* Sidebar Header */}
                <div className="p-6 text-center bg-gray-800">
                    <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 mt-6">
                    <ul className="space-y-2">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition ${
                                            isActive
                                                ? "bg-gray-700 text-blue-400 shadow-lg"
                                                : "hover:bg-gray-700 hover:text-blue-300"
                                        }`
                                    }
                                >
                                    <span className="ml-3">{item.name}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer Section */}
                <div className="p-4 bg-gray-800 text-sm text-center border-t border-gray-700">
                    <p className="text-gray-400">&copy; 2025 Admin Panel</p>
                </div>
            </div>
        </Fragment>
    );
};

export default AdminSidebarNavigation;
