import React from 'react'
import service from '../appwrite/service'
import { Link } from 'react-router-dom'

function PostCard({$id,title,image}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-200 rounded-xl p-4">
            <div className = "w-full justify-center mb-4">
                <img src={service.getFilePreview(image)} alt={title} className="rounded-xl"/>
            </div>
            <h2 className='text-xl font-bold text-black'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard