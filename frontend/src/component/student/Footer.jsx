import React, { useContext } from 'react'
import { assets } from '../../../public/assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router'

const Footer = () => {

  const { navigate } = useContext(AppContext)

  return (
    <footer className='bg-gray-900 md:px-40 text-left min-w-full mt-10'>
      <div className='mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr] px-8 md:px-0 justify-center gap-10 py-10 border-b border-white/30'>
        <div className='flex flex-col items-start w-full'>
          <Link to='/' className="flex items-center space-x-1">
            <img onClick={() => navigate('/')} src={assets.bee_logo} className="h-8" alt="Flowbite Logo" />
            <span className="text-lg sm:text-2xl font-semibold text-white">StudyBee</span>
          </Link>
          <p className='mt-4 text-center md:text-left text-white/80'>Empowering learners to achieve their goals with flexible, high-quality education.</p>
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <div className='flex md:flex-col space-x-3 space-y-2'>
            <Link to='/' className="text-gray-400 hover:text-white">Home</Link>
            <Link to='/courses' className="text-gray-400 hover:text-white">Courses</Link>
            <Link to='/about-us' className="text-gray-400 hover:text-white">About</Link>
            <Link to='/contact-us' className="text-gray-400 hover:text-white">Contact</Link>
          </div>
        </div>

        {/* Right Section - Newsletter Subscription */}
        <div className='text-white'>
          <h3 className="text-xl font-semibold">Subscribe to Our Newsletter</h3>
          <p className="text-gray-400 mt-2">Stay updated with our latest courses and offers.</p>
          <div className="flex mt-3">
            <input type="email" placeholder="Enter your email" className="px-4 py-2 w-full border border-gray-300 rounded-l-lg text-gray-200 focus:outline-none" />
            <button className="bg-blue-600 px-5 py-2 text-white rounded-r-lg hover:bg-blue-700">Subscribe</button>
          </div>
        </div>
      </div>
      <p className='py-4 text-center text-white/60'>Copyright 2025 © StudyBee. All Right Reserved. </p>
    </footer>
  )
}

export default Footer
