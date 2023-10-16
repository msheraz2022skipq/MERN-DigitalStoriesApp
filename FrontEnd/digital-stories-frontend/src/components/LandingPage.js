
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image
} from '@chakra-ui/react';

const LandingSection = () => {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      h="100vh"
    >
      <Box className="responsive-box" paddingTop={10}>
        <Image src="https://media.istockphoto.com/id/860887528/photo/whats-your-story-concept.jpg?s=612x612&w=0&k=20&c=HmvUdfPl-pRtspeRgEuqKldWpuEk47PSGvkH4j06EFQ=" alt="Digital story web app" w="500px" mb={4} borderRadius={10} />
      </Box>
      <Box>
        <Heading textAlign={"center"} as="h1" size="xl">Welcome to the world of digital storytelling!</Heading>
        <Text marginLeft={50} marginRight={50} fontSize="lg" textAlign="center">Our web app is designed to help you share your stories with a global audience in an engaging and interactive way. Whether you're a novelist, screenwriter, poet, or simply have a story you want to tell,
          our platform provides the tools and resources to bring your words to life. With a user-friendly interface, easy-to-use formatting options, and a built-in community of readers and writers, you can easily publish and promote your work, connect with other writers and readers,
          and get feedback on your stories. Start sharing your stories today and join our community of passionate storytellers.
          </Text>
      </Box>
      <Box>
        <Link to="/register">
          <Button backgroundColor={"lightcoral"} variantColor="teal" size="lg" m={2}>
            Get Started
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default LandingSection;
