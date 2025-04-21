import React, { useContext, useState } from 'react';
import { assets } from '../../../public/assets/assets';
import { Link, NavLink } from 'react-router';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { navigate, isEducator, backendUrl, setIsEducator, getToken } = useContext(AppContext)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const { openSignIn } = useClerk()
  const { user } = useUser()

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate('/educator')
        return;
      }
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/update-role', { headers: { Authorization: `Bearer ${token}` } })

      if (data.success) {
        setIsEducator(true)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <nav className="fixed top-0 bg-white dark:bg-gray-900 border-b border-gray-700 min-w-full mx-auto z-1000">
      <div className="px-8 md:px-40 flex items-center justify-between mx-auto py-4 flex-nowrap">
        <Link to='/' className="w-28 flex items-center space-x-1">
          <img onClick={() => navigate('/')} src={assets.bee_logo} className="h-6 sm:h-8" alt="Flowbite Logo" />
          <span className="text-lg sm:text-2xl font-semibold dark:text-white">StudyBee</span>
        </Link>

        {/* Menu  */}
        <div className="hidden xl:flex md:space-x-1.5 lg:space-x-4">
          {[
            { to: "/", label: "Home" },
            { to: "/course-list", label: "Courses" },
            { to: "/about-us", label: "About Us" },
            { to: "/contact-us", label: "Contact Us" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative px-3 ${isActive ? "text-blue-700" : "text-gray-900 hover:text-blue-700"
                } dark:text-white dark:hover:text-blue-500`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </div>


        <div className="flex items-center text-white space-x-3">
          <div className='hidden md:flex item-center gap-3 text-gray-500'>
            <div className='flex items-center text-wrap gap-5'>
              {user && <>
                <button onClick={becomeEducator}>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
                | <Link to='/my-enrollments'>My Enrollments</Link>
              </>}
            </div>
            {user ? <UserButton /> :
              <button onClick={() => openSignIn()} className='bg-blue-500 text-white px-5 py-2 rounded-full'>Create Account</button>
            }
          </div>

          {/* for Phone Screen */}
          <div className='md:hidden flex items-center gap-2 text-gray-500'>
            <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs text-wrap'>
              {user && <>
                <button onClick={becomeEducator}>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
                | <Link to='/my-enrollments'>My Enrollments</Link>
              </>}
            </div>
            {
              user ? <UserButton /> :
                <button onClick={() => openSignIn()}><img src={assets.user_icon} alt="User Icon Image" /></button>
            }
          </div>

          {/* <Link to='/login' className="flex items-center text-sm border rounded-lg px-4 py-1.5 bg-gray-800 hover:bg-gray-700 duration-300">
            Log In
          </Link>
          <Link to='/signup' className="flex items-center text-sm border rounded-lg px-4 py-1.5 bg-gray-800 hover:bg-gray-700 duration-300">
            Sign Up
          </Link> */}
          <button
            onClick={toggleDropdown}
            className="xl:hidden flex items-center justify-center p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isOpen && (
        <div className="xl:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col space-y-1 p-4">
            <Link to='/' onClick={() => setIsOpen(!isOpen)} className="py-2 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500 focus:ring-1 focus:pl-2 focus:rounded-xl">Home</Link>
            <Link to='/course-list' onClick={() => setIsOpen(!isOpen)} className="py-2 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500 focus:ring-1 focus:pl-2 focus:rounded-xl">Courses</Link>
            <Link to='/about-us' onClick={() => setIsOpen(!isOpen)} className="py-2 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500 focus:ring-1 focus:pl-2 focus:rounded-xl">About Us</Link>
            <Link to='/contact-us' onClick={() => setIsOpen(!isOpen)} className="py-2 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500 focus:ring-1 focus:pl-2 focus:rounded-xl">Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar