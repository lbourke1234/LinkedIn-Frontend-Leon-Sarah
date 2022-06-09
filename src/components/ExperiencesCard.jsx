import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../stylesheets/experiencesCard-stylesheet.css'
import Experience from './Experience'

const ExperiencesCard = (props) => {
  const [experiences, setExperiences] = useState([])
  const [action, setAction] = useState()
  // console.log('what action? ', action)
  const getAction = (action) => {
    setAction(action)
  }

  // console.log('main state:', experiences)

  const fetchNewId = async (id) => {
    try {
      const response = await fetch(`https://linkedin-backend-sarah-leon.herokuapp.com/experiences/`)
      if (response.ok) {
        const data = await response.json()
        const userExperiences = data.filter((exp) => exp.profile === id)

        setExperiences(userExperiences)
        // console.log('Fetched data: ', )
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  let params = useParams()

  useEffect(() => {
    fetchNewId(params.userId)
    console.log('EXPERIENCES: ', experiences)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.userId])

  return (
    <div className="sidebar-container  ">
      <div className="d-flex justify-content-between m-3">
        <div>
          <h3>Experiences</h3>
        </div>
      </div>
      {experiences &&
        experiences.map((exp) => (
          <Experience
            profiledata={props.profiledata}
            setprofiledata={props.setprofiledata}
            key={exp._id}
            getaction={getAction}
            experience={exp}
            setexperiences={setExperiences}
            allExperiences={experiences}
            action={action}
          />
        ))}
      {/* <ExperiencesUser users={user} /> */}
    </div>
  )
}
export default ExperiencesCard
