import React, { Fragment } from 'react';

const AboutUs = () => {
    return (
        <Fragment>
            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-16">
                <div className="container mx-auto px-6">
                    <h1 className="text-5xl font-bold text-center mb-6 animate__animated animate__fadeIn animate__delay-0.5s">
                        About Us
                    </h1>
                    <p className="text-lg text-center mb-10 animate__animated animate__fadeIn animate__delay-1s">
                        Welcome to our company, where we strive to provide exceptional services with a personal touch. Our team is dedicated to ensuring that every experience with us exceeds your expectations.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Story</h2>
                            <p className="text-gray-700 text-lg mb-4">
                                Founded with a passion for delivering top-quality products and services, we have grown to become one of the leading companies in the industry. Our journey started with a vision to create a customer-focused business that builds trust and loyalty. Over the years, we have established ourselves as a reliable name in the industry, constantly evolving to meet the needs of our customers.
                            </p>
                            <p className="text-gray-700 text-lg">
                                Our team consists of highly skilled and dedicated professionals who are committed to excellence. Whether you're here for a quick visit or a long-term partnership, we are excited to work with you and deliver the best results possible.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                            <p className="text-gray-700 text-lg mb-4">
                                If you would like to learn more about us or have any inquiries, feel free to reach out to us using the contact details below. We are always happy to assist you.
                            </p>
                            <div className="text-gray-700 text-lg">
                                <p>Email: <a href="mailto:MauyaChidawali@gmail.com" className="text-blue-500 hover:text-blue-700 transition duration-300">MauyaChidawali@gmail.com</a></p>
                                <p>Phone: <a href="tel:+255675740144" className="text-blue-500 hover:text-blue-700 transition duration-300">0675740144</a></p>
                                <p>Location: Kigamboni Street, Dar es Salaam, Tanzania</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animations & Transitions */}
            <div className="bg-teal-800 py-12 mt-12 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6 animate__animated animate__zoomIn">
                        Why Choose Us?
                    </h2>
                    <p className="text-lg mb-6 animate__animated animate__fadeIn animate__delay-1s">
                        We offer not just a service, but an experience. Our attention to detail, commitment to quality, and dedication to customer satisfaction sets us apart from the rest. Whether you need help with a single task or are looking for a long-term partner, we have you covered.
                    </p>
                    <button
                        className="py-3 px-6 bg-yellow-500 text-black text-xl font-semibold rounded-full hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
                        onClick={() => alert('Get in touch with us for amazing offers!')}
                    >
                        Get in Touch
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default AboutUs;
