import React from 'react'
import { assets } from '../../../public/assets/assets'

const CallToAction = () => {
  return (
    <div className="flex w-full mx-auto flex-col items-center gap-4 px-8 md:px-0 pb-24 pt-10">
      <h1 className='text-xl md:text-4xl text-gray-800 font-semibold'>Learn anything, anytime, anywhere</h1>
      <p className='w-[70%] text-center text-gray-500 sm:text-sm'>Expand your knowledge without limits learn anything, anytime, anywhere, and take control of your growth!</p>
      <div className='flex items-center font-medium mt-4 gap-6'>
        <button className="px-10 py-3 gap-6 text-lg text-white bg-blue-600 rounded-md hover:bg-blue-700">Get started</button>
        <button className='flex items-center gap-2'>Learn more <img src={assets.arrow_icon} alt="arrow" /></button>
      </div>
    </div >
  )
}

export default CallToAction
