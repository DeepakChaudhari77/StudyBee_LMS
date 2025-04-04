import React from 'react'
import { assets } from '../../../public/assets/assets';
import Footer from '../../component/student/Footer';

const ContactUsPage = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className='md:px-40 px-6 pt-20'>
                <div className="min-h-screen">
                    {/* Hero Section */}
                    <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[50vh] mt-8">
                        <img src={assets.contact} alt="About us Image" className="absolute object-cover w-full h-full inset-0 bg-cover bg-center" />
                    </div>

                    {/* Contact Section */}
                    <div className="container mx-auto px-4 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            {/* Left Side - Image */}
                            <div className="flex justify-center">
                                <img
                                    src={assets.contact_form}
                                    alt="Support Team"
                                    className="w-full max-w-lg"
                                />
                            </div>

                            {/* Right Side - Contact Form */}
                            <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 font-medium">Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded"
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium">Email</label>
                                        <input
                                            type="email"
                                            className="w-full p-2 border rounded"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium">Message</label>
                                        <textarea
                                            className="w-full p-2 border rounded"
                                            rows="4"
                                            placeholder="Enter your message"
                                            required
                                        ></textarea>
                                    </div>
                                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>

    )
}

export default ContactUsPage
