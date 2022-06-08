import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProfilePage from './components/ProfilePage'
// import NavBar from "./components/NavBar";

// import EducationCard from "./components/EducationCard"
import './App.css'
import './stylesheets/profile-jumbotron.css'
import NavBar from './components/Navbar'
import Newsfeed from './components/Newsfeed'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function App() {
  const [profileData, setProfileData] = useState([])

  const fetchProfileData = async () => {
    const linkToFetch = `https://linkedin-backend-sarah-leon.herokuapp.com/profile/629f094cd81f2b9bc7cde6e2`
    const response = await fetch(linkToFetch, {})

    const data = await response.json()

    setProfileData(data)
    console.log('Fetched data from pprofile page: ', data)
  }

  useEffect(() => {
    fetchProfileData()
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path={'/profile-page'} element={<ProfilePage profiledata={profileData} setprofiledata={setProfileData} />} />
          <Route path={'/profile-page/:userId'} element={<ProfilePage profiledata={profileData} setprofiledata={setProfileData} />} />
          <Route path={'/feed'} element={<Newsfeed profiledata={profileData} />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
