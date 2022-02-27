import React, { useRef, useState, useEffect } from 'react'

import { submitComment } from '../services'

const CommentsForm = ({slug}) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentEl = useRef()
  const emailEl = useRef()
  const nameEl = useRef()
  const storeDataEl = useRef()

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email')
  }, [])
  

  const handleCommentSubmission = () => {
      setError(false);

      const {value: comment} = commentEl.current
      const {value: name} = nameEl.current
      const {value: email} = emailEl.current
      const {checked: storeData} = storeDataEl.current

      if (!comment || !name || !email ) {
          setError(true)

          return;
      }

      const commentObj = {comment, name, email, slug}

      if (storeData) {
          window.localStorage.setItem('email', email)
          window.localStorage.setItem('name', name)
      }else {
        window.localStorage.removeItem('name', name)
        window.localStorage.removeItem('email', email)
      }


      submitComment(commentObj).then((res) => {
          setShowSuccessMessage(true);

          setTimeout(() => {
              setShowSuccessMessage(false)
          }, 3000);
      })

  }

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">Leave a Comment</h3>

      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          ref={commentEl}
          className="w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          type="text"
          ref={nameEl}
          className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Name"
          name="name"
        />

        <input
          type="email"
          ref={emailEl}
          className="w-full rounded-lg bg-gray-100 py-2 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className='grid grid-cols-1 gaps-4 mb-4'>
        <div>
            <input type="checkbox" ref={storeDataEl} id='storeData' name='storeData' value='true' />
            <label className='text-gray-500 cursor-pointer ml-2' htmlFor="storeData">Save my e-mail and name for my next comment</label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are required!</p>
      )}
      <div>
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="ease pointer-cursor inline-block rounded-full bg-pink-600 px-8 py-3 text-lg text-white transition duration-500 hover:bg-indigo-900"
        >
          Post Comment
        </button>
      </div>
      {showSuccessMessage && (
        <span className="font-xl float-right font-semibold text-green-500">
          Comment submitted for review
        </span>
      )}
    </div>
  )
}

export default CommentsForm
