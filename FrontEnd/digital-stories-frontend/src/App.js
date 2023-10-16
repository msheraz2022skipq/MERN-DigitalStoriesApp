import React from 'react';
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset
} from '@chakra-ui/react';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import {useSelector} from 'react-redux'
import jwt_decode from "jwt-decode";



import Login from './components/login/SignIn';
import Register from './components/register/SignUp';
import Homepage from './components/Homepage';
import LandingSection from './components/LandingPage'
import Header from './components/Header'
import Footer from './components/Footer';
import TrendingSection from './components/TrendingSection';
import UserStoriesSection from './components/UserStoriesSection';
import ContactMeSection from './components/ContactMeSection'
import CreateStory from './components/CreateStory';
import LeaderBoard from './components/LeaderBoard';
import UpdateStory from './components/UpdateStory';


export default function App() {
  const user = JSON.parse(localStorage.getItem("user")) 
  if(localStorage.getItem("token")){
    const decodedToken = jwt_decode(localStorage.getItem("token"))
    if (decodedToken.exp<Date.now() / 1000){
      localStorage.removeItem("user")
      localStorage.removeItem("token")
    }
  }
  const users = useSelector(state=>state.users)
  
  const stories = useSelector(state=>state.stories)
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <Routes>
            <Route path="/" element={<LandingSection/>}/>
            <Route path="/login" element={<Login /> } />
            <Route path='/homepage' element={user?<Homepage stories={stories}/>:<Login/>}/>
            <Route path="/register" element={<Register />}/>
            <Route path='/trending' element={user?<TrendingSection stories={stories}/>:<Login/>}/>

            <Route path='/mystories' element={user?<UserStoriesSection user={user} stories={stories}/>:<Login/>}/>
            <Route path='/viewprofile' element={user?<UserStoriesSection stories={stories}/>:<Login/>}/>
            
            <Route path='/contactus' element={<ContactMeSection/>}/>
            <Route path='/createstory' element={user?<CreateStory user={user} stories={stories}/>:<Login/>}/>
            <Route path='/leaderboard' element={user?<LeaderBoard users={users} stories={stories}/>:<Login/>}/>
            <Route path='/mystories/update-story' element={user?<UpdateStory user={user} stories = {stories}/>:<Login/>}/>
          </Routes>
          <Header user={user}/>
          <Footer/>
        </ColorModeProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}