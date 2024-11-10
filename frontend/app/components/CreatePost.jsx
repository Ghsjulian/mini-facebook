import React from 'react'

const CreatePost = () => {
  return (
     <div className="post">
                <h3>Create New Post</h3>
                <textarea placeholder="Write A Post..."></textarea>
                <button className="post-btn">Post Now</button>
            </div>
  )
}

export default CreatePost