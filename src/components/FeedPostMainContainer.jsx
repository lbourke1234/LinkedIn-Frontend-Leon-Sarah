import { useEffect, useState } from 'react'

import './stylesheets/feedPostMainContainer.css'

import SinglePost from './SinglePost'
const FeedPostMainContainer = (props) => {
  let [allPosts, setAllPosts] = useState([])

  let fetchDynamicData = async () => {
    let response = await fetch('https://linkedin-backend-sarah-leon.herokuapp.com/posts')
    console.log('RESPONSE', response)

    if (response.ok) {
      let body = await response.json()
      console.log('BODY', body)
      // let slicedArray = body.reverse().slice(0, 20)
      // console.log(body)
      setAllPosts(body)
    }
  }

  useEffect(() => {
    fetchDynamicData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return allPosts.map((p) => {
    return <SinglePost post={p} />
  })
}
export default FeedPostMainContainer
