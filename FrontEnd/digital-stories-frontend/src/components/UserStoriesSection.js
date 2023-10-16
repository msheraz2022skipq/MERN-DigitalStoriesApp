import { Grid } from '@chakra-ui/react'
import StorySection from './StorySection'
import ProfileSection from './ProfileSection'
import { useLocation } from 'react-router-dom'


const UserStoriesSection = (props) => {
  console.log("Stories are ", props.stories);
  const location = useLocation()
  
  //Check that the user is viewing his own profile or another user want to check someone profile
  //if there is props.user, means user wanted to view his profile, but if there is location.state, means user wants to view someone's profile
  var user=null
  if (props.user){
    user = props.user
  }
  else if (location.state){
    user = location.state.user
  }
  return (
    <Grid templateColumns={window.innerWidth > 768?"1fr 1fr":"1fr"} spacing={4} p={4} py={16}>
      {user && <ProfileSection user={user} stories={props.stories}/>}
      {user && props.stories && <StorySection heading={"Your Stories"} stories={props.stories.filter(str => str.author === user._id)} />}
    </Grid>
  )
}
export default UserStoriesSection