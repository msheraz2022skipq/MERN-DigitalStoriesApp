import React from 'react'
import { VStack } from '@chakra-ui/react'
import StorySection from './StorySection'



const TrendingSection = (props) => {
  console.log(props.stories);
  const trendingStories = [...props.stories].sort((a, b) => (b.upvotes.length+b.downvotes.length + b.comments.length) - (a.upvotes.length+a.downvotes.length + a.comments.length)).slice(0, Math.round(props.stories.length * 0.3));
  return (
      <VStack py={16}>
        {props.stories && <StorySection heading={"Trending Stories"} stories={trendingStories}/>} 
      </VStack>
  )
}
export default TrendingSection