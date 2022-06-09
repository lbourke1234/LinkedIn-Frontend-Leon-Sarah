import React, { useEffect } from "react"
import { useState } from "react"

const UploadPostPicture = (props) => {
  const [image, setImage] = useState(``)
  const [loading, setLoading] = useState(false)
  const [postID, setPostID] = useState("")

  const uploadImage = async (e) => {
    const data = new FormData()
    data.append("picture", image)
    setLoading(true)
    try {
      const res = await fetch(
        `https://linkedin-backend-sarah-leon.herokuapp.com/posts/${postID}/picture`,
        {
          method: "POST",
          body: data,
        }
      )
      if (res.ok) {
        const file = await res.json()
        setLoading(false)
        console.log("Files details: ", file)
        window.location.href = "http://localhost:3000/feed"
      }
    } catch (error) {
      console.log(`❌error❌`, error)
    }
  }
  const selected = (e) => {
    setImage(e.target.files[0])
  }

  useEffect(() => {
    setPostID(props.postID)
    console.log("Post ID " + props.postID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div class="form-group">
        <label for="exampleFormControlFile1">Upload a post image</label>
        <input
          type="file"
          class="form-control-file"
          id="exampleFormControlFile1"
          onChange={selected}
        />
      </div>
      <button
        type="button"
        onClick={() => {
          console.log("click")
          uploadImage()
        }}
        class="btn btn-primary"
      >
        Upload your new post picture
      </button>
    </div>
  )
}

export default UploadPostPicture
