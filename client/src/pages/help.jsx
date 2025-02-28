import React from 'react';

const Help = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-8">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-blue-600">Need Help? We're Here For You!</h1>
                    <p className="text-xl text-gray-700 mt-4">Explore our FAQ, contact us, or learn more about our services. We're dedicated to making your car rental experience seamless and enjoyable!</p>
                </header>

                {/* Help Section */}
                <section className="bg-white p-6 rounded-lg shadow-md mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium text-xl text-gray-700">How do I rent a car?</h3>
                            <p className="text-gray-600">Simply browse our car listings, choose the car you like, and complete the booking process. You can pick up your car at our designated locations or have it delivered to your address.</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-xl text-gray-700">What documents do I need to rent a car?</h3>
                            <p className="text-gray-600">You will need a valid driver’s license, proof of insurance, and a credit card for payment. If you're renting internationally, additional documentation may be required.</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-xl text-gray-700">Can I extend my rental period?</h3>
                            <p className="text-gray-600">Yes, you can extend your rental period by contacting us through our customer service page or by calling us directly. We’ll assist you with extending your rental easily.</p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="bg-white p-6 rounded-lg shadow-md mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Contact Us</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium text-xl text-gray-700">Email</h3>
                            <p className="text-gray-600">You can reach us at <a href="mailto:MauyaChidawali@gmail.com" className="text-blue-500 hover:underline">MauyaChidawali@gmail.com</a> for any inquiries or support.</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-xl text-gray-700">Phone</h3>
                            <p className="text-gray-600">Give us a call at <a href="tel:+2550675740144" className="text-blue-500 hover:underline">0675740144</a> for immediate assistance.</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-xl text-gray-700">Location</h3>
                            <p className="text-gray-600">We are located at Kigamboni street, Dar es Salaam, Tanzania. Visit us during business hours for in-person support.</p>
                        </div>
                    </div>
                </section>

                {/* Additional Help Section */}
                <section className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">About Our Car Rental Service</h2>
                    <p className="text-lg text-gray-700">
                        At our car rental service, we offer a wide range of cars to suit your needs, whether for a business trip, vacation, or local commuting. We pride ourselves on providing excellent customer service, competitive pricing, and convenient locations. 
                        <br />
                        Whether you’re looking for a luxury car, an SUV for a family road trip, or an affordable sedan for daily use, we have options that cater to every budget. Rent a car with us and experience the ease of traveling with a reliable vehicle at your fingertips!
                    </p>
                    <p className="text-lg text-gray-700 mt-4">
                        We provide 24/7 customer support to assist you with any issues or questions regarding your car rental. If you're in need of assistance, don't hesitate to reach out to our team. We're here to ensure your rental experience is smooth and stress-free.
                    </p>
                </section>

                {/* Additional Links */}
                <div className="text-center mt-12">
                    <p className="text-gray-600">Follow us on our social media platforms for updates, special offers, and more!</p>
                    <div className="flex justify-center space-x-6 mt-4">
                        <a href="https://facebook.com" className="text-blue-600 hover:text-blue-700 transition duration-300">Facebook</a>
                        <a href="https://instagram.com" className="text-pink-600 hover:text-pink-700 transition duration-300">Instagram</a>
                        <a href="https://twitter.com" className="text-blue-400 hover:text-blue-500 transition duration-300">Twitter</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;
