import React, { useState } from "react";
import {
  Flex,
  Stack,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  CircularProgress,
  VStack,
  Grid,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import ErrorMessage from "./messages/ErrorMessage";

 const ContactMeSection=()=>{

  const submitData=(data)=>{
    return new Promise ((resolve,reject)=>{ 
      setTimeout(()=>{
        try {
          axios.post("http://localhost:6969/contactus",data).then((res,err)=>{
            if(err){
              reject("Error:: "+err)
            }
            resolve(res)
          })
          
        } catch (error) {
          reject("Error:: "+error)
          
        }
      },2000)
    })
  }

  const initialState = {
    name:'',
    message:'',
    email: '',
    error: '',
    isLoading: false,
  }
  const [state, setState] = useState(initialState)

  const handleState = (e) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value
    })
  }

  const handleSubmit = async event => {
    event.preventDefault();
    setState({
      ...state,
      isLoading: true
    })
    try {
      await submitData(state);
      setState({
        ...state,
        isLoading: false
      })
      
    } catch (error) {
      setState({
        ...initialState,
        error: error,
        isLoading:false
      })
      
    }

  }






  return (
    <Flex width="full" align="center" justifyContent="center" py={16}
      backgroundImage="https://d1eipm3vz40hy0.cloudfront.net/images/AMER/contactuspage.jpg"
    >
      <Grid templateColumns="1fr 1fr" spacing={4} p={4}>
        <Box alignSelf={"center"}>
          <Heading textAlign="center">Digital Stories</Heading>
        <Text marginLeft={50} marginRight={50} fontSize="lg" >Our web app is designed to help you share your stories with a global audience in an engaging and interactive way. Whether you're a novelist, screenwriter, poet, or simply have a story you want to tell,
          our platform provides the tools and resources to bring your words to life. With a user-friendly interface, easy-to-use formatting options, and a built-in community of readers and writers, you can easily publish and promote your work, connect with other writers and readers,
          and get feedback on your stories. Start sharing your stories today and join our community of passionate storytellers.
          </Text>
        </Box>
      <Box
      p={8}
      borderColor={"yellow.100"}
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      >
        <Stack
              borderRadius={8}
              minWidth={500}
              minHeight={300}
              flexDir="column"
              mb="2"
              justifyContent="center"
              alignItems="center"
              backgroundImage="https://media.istockphoto.com/id/155277133/photo/an-electronic-book-with-lights-beaming-out-of-it.jpg?s=612x612&w=0&k=20&c=dJ0JCWs2SS0yVpybqzAtDtm36WieBZD7TKEId-waB3g="
            >
              <Heading>Digital Stories</Heading>
              <Box minW={{ base: "90%", md: "468px" }}></Box>
          </Stack>
          <Box textAlign="left">
            <Heading>Contact Us</Heading>
          </Box>
          <Box my={4} textAlign="left" >
          <form onSubmit={handleSubmit}>
          {state.error && <ErrorMessage message={state.error} />}
          <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="name"
                    name='name'
                    value={state.name}
                    placeholder="Full Name"
                    size="lg"
                    onChange={handleState}
                  />
          </FormControl>
          <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name='email'
                    value={state.email}
                    placeholder="test@test.com"
                    size="lg"
                    onChange={handleState}
                  />
          </FormControl>
          <FormControl isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea
              type="text"
              name="message"
              value={state.message}
              placeholder="Please write something to us..."
              size={"md"}
              onChange={handleState}
              />
          </FormControl>
          <VStack>
          <Button
                  variantColor="teal"
                  variant="outline"
                  type="submit"
                  width="-webkit-max-content"
                  mt={4}
                  backgroundColor="blue"
                >
                  {state.isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="teal"
                    />
                  ) : (
                    'Submit'
                  )}
                </Button>
          </VStack>
          </form>
          </Box>

      </Box>
      </Grid>
    </Flex>
  )
}

export default ContactMeSection