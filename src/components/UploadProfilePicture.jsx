import React from 'react'
import { useState } from 'react'

const UploadProfilePicture = () => {
  const [image, setImage] = useState(``)
  const [loading, setLoading] = useState(false)
  const [imageUploaded, setImageUploaded] = useState('')

  const uploadImage = async (e) => {
    const data = new FormData()
    data.append('picture', image)
    setLoading(true)
    try {
      const res = await fetch(
        'https://linkedin-backend-sarah-leon.herokuapp.com/profile/629f094cd81f2b9bc7cde6e2/picture',
        {
          method: 'POST',
          body: data
        }
      )
      const file = await res.json()
      setImageUploaded(file.image)
      setLoading(false)
      console.log('Files details: ', file)
    } catch (error) {
      console.log(`❌error❌`, error)
    }
  }
  const selected = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <div>
      <div class="form-group">
        <label for="exampleFormControlFile1">Upload an image</label>
        <input type="file" class="form-control-file" id="exampleFormControlFile1" onChange={selected} />
      </div>
      <button type="button" onClick={uploadImage} class="btn btn-primary">
        Upload
      </button>
      <div>
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <img src={imageUploaded} width={'200px'} />
        )}
      </div>
    </div>
  )
}

export default UploadProfilePicture
