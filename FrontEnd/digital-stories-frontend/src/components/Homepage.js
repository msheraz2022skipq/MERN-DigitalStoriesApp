import React from 'react'
import { Heading, VStack } from '@chakra-ui/react'
import StorySection from './StorySection'

const Homepage = (props) => {
  return (
      <VStack py={16}>
        {props.stories ? <StorySection heading={"Digital Stories"} stories={props.stories}/>: <Heading>There is no story display...</Heading>}
      </VStack>
  )
}
export default Homepage