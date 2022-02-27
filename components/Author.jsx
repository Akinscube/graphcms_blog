import Image from 'next/image'
import React from 'react'

const Author = ({ author }) => {
  return (
    <div className='text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-30'>
        <div className='absolute left-0 right-0 -top-14'>

      <Image
        src={author.photo.url}
        unoptimized
        alt={author.name}
        height="100px"
        width="93px"
        className="align.middle rounded-full"
      />

        </div>
        <h3 className='text-xl text-white font-bold my-4'>{author.name}</h3>
        <p className='text-white text-lg'>{author.bio}</p>
    </div>
  )
}

export default Author
