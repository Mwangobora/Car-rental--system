import React from 'react';
import car1 from '../assets/images/car1.jpg'
import car2 from '../assets/images/car2.jpg'
import car3 from '../assets/images/car3.jpg'
import car4 from '../assets/images/car4.jpg'
import car7 from '../assets/images/car7.jpg'

const Home = () => {
    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeIn">
                        Welcome to CarRental
                    </h1>
                    <p className="text-lg md:text-xl mb-8 animate-fadeIn delay-200">
                        The best way to rent your dream car with ease and comfort.
                    </p>
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full transition duration-300 animate-bounce">
                        Explore Now
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray -100 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-10">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
                            <img src={car1} alt="Wide Range of Cars" className="h-48 w-full object-cover rounded-lg mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Wide Range of Cars</h3>
                            <p>Choose from a variety of cars to fit your style and needs.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
                            <img src={car2} alt="Affordable Prices" className="h-48 w-full object-cover rounded-lg mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Affordable Prices</h3>
                            <p>Get the best deals and save money on every rental.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
                            <img src={car3} alt="24/7 Support" className="h-48 w-full object-cover rounded-lg mb-4" />
                            <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
                            <p>We’re here to help you anytime, anywhere.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-20 bg-gray-200">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-10">Our Fleet</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <img src={car4} alt="Car 4" className="rounded-lg shadow-lg hover:shadow-xl transition duration-300 object-cover h-60 w-full" />
                        <img src={car7} alt="Car 7" className="rounded-lg shadow-lg hover:shadow-xl transition duration-300 object-cover h-60 w-full" />
                        <img src={car1} alt="Car 1" className="rounded-lg shadow-lg hover:shadow-xl transition duration-300 object-cover h-60 w-full" />
                        <img src={car2} alt="Car 2" className="rounded-lg shadow-lg hover:shadow-xl transition duration-300 object-cover h-60 w-full" />
                        <img src={car3} alt="Car 3" className="rounded-lg shadow-lg hover:shadow-xl transition duration-300 object-cover h-60 w-full" />
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="bg-blue-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">Start Your Journey Today</h2>
                    <p className="text-lg mb-8">
                        Experience the best car rental service with us.
                    </p>
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full transition duration-300">
                        Book Now
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;
