import React from 'react'
import { Link } from 'react-router';

import { assets } from '../../../public/assets/assets';
import Footer from '../../component/student/Footer';

const AboutUsPage = () => {
    return (
        <>
            <div className='md:px-40 px-6 pt-20'>
                {/* Top Section with Background Image */}
                <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[50vh] mt-8">
                    <img src={assets.aboutus} alt="About us Image" className="absolute object-cover w-full h-full inset-0 bg-cover bg-center" />
                </div>

                {/* Section with Image and Text */}
                <div className="flex flex-col md:flex-row items-start max-w-6xl mx-auto px-6 py-12 gap-8">
                    {/* Left Side - Image */}
                    <div className="w-full flex items-center justify-center md:w-1/2">
                        <img
                            src={assets.aboutus_2}
                            alt="Learning Environment"
                            className="w-[400px] rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Right Side - Text */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Empowering Learning with StudyBee</h2>
                        <p className="mt-4 text-gray-400 text-[18px]">
                            StudyBee is dedicated to providing high-quality e-learning solutions, making education accessible and engaging for students worldwide. Our mission is to empower learners through interactive courses, expert guidance, and a seamless learning experience.
                        </p>
                        <ul className='list-disc list-inside grid grid-cols-2 mt-5 text-gray-500'>
                            <li>Flexible Timing</li>
                            <li>Easy Learning</li>
                            <li>Affordable</li>
                            <li>World Class</li>
                        </ul>
                    </div>
                </div>

                <section className="flex w-full flex-wrap mx-auto items-center justify-evenly px-6 bg-blue-600 text-white lg:px-16 py-12 mt-10">
                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-4xl font-bold'>1,548+</p>
                        <p className='text-lg font-semibold'>Courses</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-4xl font-bold'>12+</p>
                        <p className='text-lg font-semibold'>Countries</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-4xl font-bold'>500K</p>
                        <p className='text-lg font-semibold'>Students</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-4xl font-bold'>80+</p>
                        <p className='text-lg font-semibold'>Instructors</p>
                    </div>
                </section>

                <section className="flex w-full mx-auto flex-col items-center px-6 lg:px-16 mt-16 py-12">
                    <h2 className='text-4xl text-center font-bold'>Have Question ? Get in touch!</h2>
                    <p className='mt-4 w-[70%] text-justify text-gray-400'>Discover a world of knowledge and opportunities with our online education platform pursue a new career.</p>
                    <div className='flex items-center justify-center mt-5'>
                        <Link to='/contact-us' className="mt-4 px-6 py-2 text-lg text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">Contact Us</Link>

                    </div>
                </section >
            </div>
            <Footer />
        </>
    );
}

export default AboutUsPage
