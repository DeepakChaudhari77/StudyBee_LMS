import React from 'react'
import { assets, dummyEducatorData } from '../../../public/assets/assets'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router'

const Navbar = () => {
  const educatorData = dummyEducatorData
  const { user } = useUser()
  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-1000">

      <div className="max-w-screen-2xl flex items-center justify-between mx-auto py-4 px-10 flex-nowrap">
        <Link to='/' className="w-28 flex items-center space-x-1">
          <img src={assets.bee_logo} className="h-6 sm:h-8" alt="Flowbite Logo" />
          <span className="text-lg sm:text-2xl font-semibold dark:text-white">StudyBee</span>
        </Link>

        <div className='flex items-center gap-5 text-gray-500 relative'>
          <p>Hi! {user ? user.fullName : 'Developers'}</p>
          {
            user ? <UserButton /> : <img src={assets.profile_img} className='max-w-8' />
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
