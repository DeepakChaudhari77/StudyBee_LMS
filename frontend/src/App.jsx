import React from 'react'
import { Route, Routes, useMatch } from 'react-router'
import Home from './pages/student/Home'
import CoursesList from './pages/student/CoursesList'
import CourseDetails from './pages/student/CourseDetails'
import MyEnrollment from './pages/student/MyEnrollment'
import Player from './pages/student/Player'
import Loading from './component/student/Loading'
import Educator from './pages/educator/Educator'
import DashBoard from './pages/educator/DashBoard'
import AddCourse from './pages/educator/AddCourse'
import MyCourses from './pages/educator/MyCourses'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
import Navbar from './component/student/Navbar'
import AboutUsPage from './pages/aboutUs/AboutUs'
import ContactUsPage from './pages/contactUs/ContactUs'
import "quill/dist/quill.snow.css";

const App = () => {

  const isEducatorRoute = useMatch('/educator/*')

  return (
    <div className='text-default min-h-screen max-w-screen bg-white'>
      {!isEducatorRoute && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CoursesList />} />
        <Route path='/course-list/:input' element={<CoursesList />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/my-enrollment' element={<MyEnrollment />} />
        <Route path='/player/:courseId' element={<Player />} />
        <Route path='/loadind/:path' element={<Loading />} />
        <Route path='/educator' element={<Educator />}>
          <Route path='/educator' element={<DashBoard />} />
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-courses' element={<MyCourses />} />
          <Route path='student-enrolled' element={<StudentsEnrolled />} />
        </Route>
        <Route path='/about-us' element={<AboutUsPage />} />
        <Route path='/contact-us' element={<ContactUsPage />} />
      </Routes>
    </div>
  )
}

export default App
