import React, { useContext } from 'react'
import { assets } from '../../../public/assets/assets'
import { FaArrowRight } from "react-icons/fa6";
import { AppContext } from '../../context/AppContext';

const Hero = () => {

  const { navigate } = useContext(AppContext)
  return (
    <div>
      <section className="flex flex-col-reverse lg:flex-row items-center justify-evenly px-6 md:px-40 pb-12 pt-12 min-h-screen">
        {/* Left Side - Text Content */}
        <div className="w-full lg:w-1/2 lg:block flex flex-col items-center justify-center md:text-left py-6 ">
          <h1 className="text-4xl text-center lg:text-left font-bold text-gray-900 md:text-5xl">Best Online Courses From StudyBee</h1>
          <p className="mt-4 text-center lg:text-left text-lg text-gray-400 px-2 sm:px-0">Discover a world of knowledge and opportunities with our online education platform pursue a new career.</p>
          <button onClick={() => navigate('/course-list')} className="mt-6 px-6 py-3 text-lg flex items-center justify-center gap-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">View Courses <FaArrowRight /> </button>
        </div>

        {/* Right Side - Image */}
        <div className="lg:relative w-full lg:w-1/2 flex justify-center px-4 pb-4 pt-7 sm:p-6">
          <img src={assets.girl_2} alt="Hero Image" className="w-full max-w-md z-10" />
        </div>
      </section>
    </div>
  )
}

export default Hero;
