import React from 'react'
import { useState } from 'react'

const UploadExperiencePicture = ({ expId }) => {
  const [image, setImage] = useState(``)
  const [loading, setLoading] = useState(false)
  const [imageUploaded, setImageUploaded] = useState('')
  console.log('inside uploader: ', expId)
  const uploadImage = async (expId) => {
    const data = new FormData()
    data.append('picture', image)
    setLoading(true)
    try {
      const res = await fetch(`https://linkedin-backend-sarah-leon.herokuapp.com/experiences/${expId}/picture`, {
        method: 'POST',
        body: data
      })
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
      <button type="button" onClick={() => uploadImage(expId)} class="btn btn-primary">
        Upload
      </button>
      <div>
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <img src={imageUploaded} width={'200px'} alt={'hello'} />
        )}
      </div>
    </div>
  )
}

export default UploadExperiencePicture
