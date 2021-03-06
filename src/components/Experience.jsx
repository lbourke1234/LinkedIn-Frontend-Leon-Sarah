import React from 'react'
import ProfileModal from './ProfileModal'
import { useState, useEffect } from 'react'
import EditExperience from './EditExperience'
import AddExperience from './AddExperience'
import { parseISO, format } from 'date-fns'

const Experience = ({ experience, getaction, setexperiences, profiledata, setprofiledata, action }) => {
  const [modalShow, setModalShow] = useState(false)
  const [content, setContent] = useState()
  const [title, setTitle] = useState()
  const [editExp, setEditExp] = useState(experience)
  const [postExp, setPostExp] = useState()

  let putExperience = async () => {
    try {
      let response = await fetch(`https://linkedin-backend-sarah-leon.herokuapp.com/experiences/${experience._id}`, {
        method: 'PUT',
        body: JSON.stringify(editExp),
        headers: {
          'Content-type': 'application/json'
        }
      })

      let data = await response.json()

      setEditExp(data)

      console.log('✅Everything went well, infos were updated!', data)
    } catch (error) {
      console.log('❌ something went wrong ON PUT: ', error)
    }
  }
  let delExperience = async () => {
    try {
      let response = await fetch(`https://linkedin-backend-sarah-leon.herokuapp.com/experiences/${experience._id}`, {
        method: 'DELETE'
      })

      let data = await response.json()

      setEditExp(profiledata)

      console.log('✅Everything went well, infos were DELETED!', data)
    } catch (error) {
      console.log('❌ something went wrong ON DELETE: ', error)
    }
  }
  let postExperience = async () => {
    try {
      let response = await fetch('https://linkedin-backend-sarah-leon.herokuapp.com/experiences', {
        method: 'POST',
        body: JSON.stringify(postExp),
        headers: {
          'Content-type': 'application/json'
        }
      })

      let data = await response.json()

      setEditExp(profiledata)

      console.log('✅Everything went well, infos were ADDED!', data)
    } catch (error) {
      console.log('❌ something went wrong ON POST: ', error)
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setprofiledata(profiledata)
    // putExperience()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editExp])
  return (
    <div className="row d-flex  justify-content-between">
      <div className="col-2 d-flex justify-content-center ">
        <img
          src={
            editExp.image
              ? editExp.image
              : 'https://previews.123rf.com/images/roxanabalint/roxanabalint1701/roxanabalint170100138/69079014-nicht-verf%C3%BCgbar-grunge-stempel-auf-wei%C3%9Fen-hintergrund-vektor-illustration.jpg'
          }
          style={{ height: '65px', width: '65px', objectFit: 'cover' }}
          alt="CBS"
        />
      </div>
      <div className="col-7 p-0">
        <div>
          <h5 className="header-text">{editExp.role}</h5>
        </div>
        <p className="text-under-header">{editExp.company}</p>
        <p className="year-text">
          {/* format(new Date(2014, 1, 11), 'yyyy-MM-dd')
           */}
          {}
          {format(parseISO(editExp.startDate), 'MMMM do yyyy')}
          {/* -{' '} */}
          {/* {format(parseISO(editExp.endDate), 'MMMM do yyyy')} */}
        </p>
        <p className="year-text">{editExp.area}</p>
      </div>

      <div className="col-3 d-flex justify-content-end align-items-center">
        <i
          className="bi bi-plus-lg  plus-icon m-2"
          onClick={() => {
            getaction('add')
            setTitle('Add experience')
            setModalShow(true)
            setContent(() => (
              <AddExperience
                profiledata={profiledata}
                setprofiledata={setprofiledata}
                experience={experience}
                setexperiences={setexperiences}
                postExp={postExp}
                setPostExp={setPostExp}
              />
            ))
          }}
        ></i>
        {console.log('??', postExp)}

        <i
          className="bi bi-pencil  plus-icon m-2"
          onClick={() => {
            setTitle('Edit experience')
            getaction('edit')
            setModalShow(true)
            setContent(() => (
              <EditExperience
                profiledata={profiledata}
                setprofiledata={setprofiledata}
                experience={experience}
                setexperiences={setexperiences}
                setEditExp={setEditExp}
                editExp={editExp}
                putExperience={putExperience}
              />
            ))
          }}
        ></i>
        <i
          className="bi bi-trash3-fill m-2"
          onClick={() => {
            delExperience()
            setEditExp(profiledata)
          }}
        ></i>
      </div>
      <ProfileModal
        putprofiledata={action === 'edit' ? putExperience : postExperience}
        show={modalShow}
        content={content}
        title={title}
        onHide={() => setModalShow(false)}
        editExp={editExp}
        putExperience={putExperience}
        postExperience={postExperience}
      />
    </div>
  )
}

export default Experience
