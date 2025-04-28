import React, { useContext, useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';
import { assets } from '../../../public/assets/assets';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';


const AddCourse = () => {

  const { backendUrl, getToken } = useContext(AppContext)
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  })

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter Name:');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter)
      )
    }

  }

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      )
    }
  }

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
            lectureId: uniqid()
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!image) {
        toast.error('Thumbnai Not Selected')
      }

      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        isPublished: true,
        discount: Number(discount),
        courseContent: chapters,
      }

      const formData = new FormData()
      formData.append('courseData', JSON.stringify(courseData))
      formData.append('image', image)

      const token = await getToken()
      const { data } = await axios.post(backendUrl + '/api/educator/add-course', formData, { headers: { Authorization: `Bearer ${token}` } })

      if (data.success) {
        toast.success(data.message)
        setCourseTitle('')
        setCoursePrice(0)
        setDiscount(0)
        setImage(null)
        setChapters([])
        quillRef.current.root.innerHTML = ''
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    //Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      })
    }
  }, [])

  console.log(chapters.chapterContent)
  return (
    <div className="pt-24 px-6 md:px-12 lg:px-24 pb-10 bg-gray-50 min-h-screen">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white pb-6 md:pb-10 space-y-6 text-gray-700">

        <h1 className="text-2xl font-bold text-center mb-2">Add New Course</h1>

        {/* Course Title */}
        <div>
          <label className="block mb-1 font-medium">Course Title</label>
          <input type="text" value={courseTitle} onChange={e => setCourseTitle(e.target.value)} required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300 transition" placeholder="e.g. React for Beginners" />
        </div>

        {/* Course Description */}
        <div>
          <label className="block mb-1 font-medium">Course Description</label>
          <div ref={editorRef} className="border border-gray-300 rounded-lg min-h-[150px]"></div>
        </div>

        {/* Price & Discount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Course Price (₹)</label>
            <input type="number" value={coursePrice} onChange={e => setCoursePrice(e.target.value)} required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300 transition" placeholder="0" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Discount (%)</label>
            <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} min={0} max={100} required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300 transition" placeholder="0" />
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div className="mt-4">
          <label className="block mb-1 font-medium">Course Thumbnail</label>
          <div className="flex items-center space-x-4">
            <label htmlFor="thumbnailImage" className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow inline-flex items-center gap-2">
              <img src={assets.file_upload_icon} className="h-5 w-5" />
              Upload Image
            </label>
            <input type="file" id="thumbnailImage" onChange={e => setImage(e.target.files[0])} hidden accept="image/*" />
            {image && <img src={URL.createObjectURL(image)} className="h-10 rounded-md shadow" />}
          </div>
        </div>

        {/* Chapters and Lectures */}
        <div>
          <h2 className="text-lg font-semibold mb-3 mt-6">Course Structure</h2>
          {chapters.map((chapter, index) => (
            <div key={index} className="bg-gray-100 rounded-lg mb-4 p-4 border shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img src={assets.dropdown_icon} onClick={() => handleChapter('toggle', chapter.chapterId)} className={`h-4 transform transition cursor-pointer ${chapter.collapsed && '-rotate-90'}`} />
                  <span className="font-semibold">{index + 1}. {chapter.chapterTitle}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{chapter.chapterContent.length} Lectures</span>
                  <img src={assets.cross_icon} className="h-4 cursor-pointer" onClick={() => handleChapter('remove', chapter.chapterId)} />
                </div>
              </div>

              {!chapter.collapsed && (
                <div className="mt-3 space-y-2">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className="flex justify-between items-center text-sm bg-white p-2 rounded border">
                      <span>{lectureIndex + 1}. {lecture.lectureTitle} - {lecture.lectureDuration} mins -
                        <a href={lecture.lectureUrl} target='_blank' className='text-blue-600 ml-1 underline'>Link</a> -
                        {lecture.isPreviewFree ? ' Free' : ' Paid'}
                      </span>
                      <img src={assets.cross_icon} className="h-4 cursor-pointer" onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)} />
                    </div>
                  ))}
                  <button type="button" onClick={() => handleLecture('add', chapter.chapterId)} className="text-sm text-blue-600 hover:underline mt-2">+ Add Lecture</button>
                </div>
              )}
            </div>
          ))}
          <button type="button" onClick={() => handleChapter('add')} className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 rounded mt-3 transition">+ Add Chapter</button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded shadow hover:opacity-90 transition">Publish Course</button>
        </div>
      </form>

      {/* Lecture Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-xl">
            <h3 className="text-lg font-bold mb-4">Add New Lecture</h3>

            <div className="mb-3">
              <label className="block text-sm font-medium">Lecture Title</label>
              <input type="text" value={lectureDetails.lectureTitle}
                onChange={e => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-300 outline-none" />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium">Duration (mins)</label>
              <input type="number" value={lectureDetails.lectureDuration}
                onChange={e => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-300 outline-none" />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium">Lecture URL</label>
              <input type="text" value={lectureDetails.lectureUrl}
                onChange={e => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-300 outline-none" />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <label className="text-sm">Free Preview</label>
              <input type="checkbox" className="scale-125" checked={lectureDetails.isPreviewFree}
                onChange={e => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })} />
            </div>

            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowPopup(false)} className="text-sm px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
              <button onClick={addLecture} className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
            </div>

            <img src={assets.cross_icon} alt="Close" className="absolute top-4 right-4 h-4 cursor-pointer" onClick={() => setShowPopup(false)} />
          </div>
        </div>
      )}
    </div>

  )
}

export default AddCourse
