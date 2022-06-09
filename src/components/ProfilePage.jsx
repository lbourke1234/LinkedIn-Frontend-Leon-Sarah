import SideBar from './SideBar'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProfileJumbotron from './ProfileJumbotron'
import { useEffect, useState } from 'react'
import SidebarTop from './SidebarTop'
import SidebarExtraSection from './SidebarExtraSection'
import { useParams } from 'react-router-dom'
import ExperiencesCard from './ExperiencesCard'
import EducationCard from './EducationCard'

const ProfilePage = ({ profiledata, setprofiledata }) => {
  const [allProfiles, setAllProfiles] = useState([])
  const [profile, setProfile] = useState()

  const editProfileData = (e, field) => {
    console.log(field)
    setprofiledata({
      ...profiledata,
      [field]: e.target.value
    })
  }

  const putProfileData = async () => {
    try {
      const response = await fetch(
        'https://linkedin-backend-sarah-leon.herokuapp.com/profile/629f094cd81f2b9bc7cde6e2',
        {
          method: 'PUT',
          body: JSON.stringify(profiledata)
        }
      )

      const data = await response.json()

      setprofiledata(data)
      console.log('✅Everything went well, infos were updated!', data)
    } catch (error) {
      console.log('❌ something went wrong: ', error)
    }
  }

  const fetchAllProfiles = async () => {
    const response = await fetch('https://linkedin-backend-sarah-leon.herokuapp.com/profile')

    const data = await response.json()

    console.log(data.slice(0, 8))
    setAllProfiles(data)
  }
  const fetchProfileData = async (userId) => {
    const response = await fetch(`https://linkedin-backend-sarah-leon.herokuapp.com/profile/${userId}`)

    const data = await response.json()

    setProfile(data)
  }
  let params = useParams()
  useEffect(() => {
    fetchAllProfiles()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchProfileData(params.userId)
  }, [params.userId])

  return (
    <Container>
      {/* {console.log('this data is important:', profile)} */}
      <Row>
        <Col md={8}>
          {profile ? (
            <ProfileJumbotron profiledata={profile} editprofiledata={editProfileData} putprofiledata={putProfileData} />
          ) : (
            <ProfileJumbotron
              profiledata={profiledata}
              editprofiledata={editProfileData}
              putprofiledata={putProfileData}
            />
          )}

          {profile ? (
            <ExperiencesCard profiledata={profile} setprofiledata={setprofiledata} profileId={profiledata._id} />
          ) : (
            <ExperiencesCard profiledata={profiledata} setprofiledata={setprofiledata} profileId={profiledata._id} />
          )}
          <EducationCard />
        </Col>
        <Col md={4}>
          <SidebarTop />
          <SideBar data={allProfiles.slice(0, 5)} heading="People also viewed" />
          <SideBar data={allProfiles.slice(6, 11)} heading="People you may know" />
          <SidebarExtraSection />
        </Col>
      </Row>
    </Container>
  )
}

export default ProfilePage
