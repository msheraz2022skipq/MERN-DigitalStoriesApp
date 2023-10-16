import React, { useState } from "react";
// import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons"
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  InputGroup,
  Link,
  Image,
  Stack,
} from "@chakra-ui/react";

import { userLogin } from "../utilities/userLogin";
import { fetchAllStories, fetchAllUsers } from "../utilities/fetchData";
import ErrorMessage from "../messages/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Types } from "../../redux/actionTypes";
import { useSelector } from "react-redux";
import Homepage from "../../components/Homepage";

export default function Login() {
  const stories = useSelector((state) => state.stories);
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
    error: "",
    isLoading: false,
    showPassword: false,
    isLoggedIn: false,
  };
  const [state, setState] = useState(initialState);

  const handleState = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setState({
      ...state,
      isLoading: true,
    });
    try {
      const { userData, token } = await userLogin({
        email: state.email,
        password: state.password,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      //First navigate to homepage to show something quickly
      navigate("/homepage");
      dispatch({
        type: Types.LOGIN,
        payload: {
          data: userData,
        },
      });
      setState({
        ...state,
        isLoggedIn: true,
        isLoading: false,
        showPassword: false,
      });
      await fetchAllStories().then((stories) => {
        dispatch({
          type: Types.FETCH_STORIES,
          payload: stories.data,
        });
      });
      await fetchAllUsers().then((users) => {
        dispatch({
          type: Types.FETCH_USERS,
          payload: users.data,
        });
      });
    } catch (error) {
      setState({
        ...initialState,
        error: error,
      });
    }
  };
  return (
    <>
      {state.isLoggedIn ? (
        <Homepage stories={stories} />
      ) : (
        <Flex width="full" align="center" justifyContent="center" py={16}>
          <Box
            p={8}
            maxWidth="500px"
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
          >
            <>
              <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src="https://media.istockphoto.com/id/155277133/photo/an-electronic-book-with-lights-beaming-out-of-it.jpg?s=612x612&w=0&k=20&c=dJ0JCWs2SS0yVpybqzAtDtm36WieBZD7TKEId-waB3g="
                  alt="Digital Stories"
                />
                <Heading>Digital Stories</Heading>
                <Box minW={{ base: "90%", md: "468px" }}></Box>
              </Stack>
              <Box textAlign="left">
                <Heading>Login</Heading>
              </Box>
              <Box my={4} textAlign="left">
                <form onSubmit={handleSubmit}>
                  {state.error && <ErrorMessage message={state.error} />}
                  <FormControl isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <InputGroup>
                    <Input
                    id="email"
                      type="email"
                      name="email"
                      value={state.email}
                      placeholder="test@test.com"
                      size="lg"
                      onChange={handleState}
                    />
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired mt={6}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup>
                      <Input
                        id="password"
                        type={state.showPassword ? "text" : "password"}
                        name="password"
                        value={state.password}
                        placeholder="*******"
                        size="lg"
                        onChange={handleState}
                      />
                    </InputGroup>
                  </FormControl>
                  <Button
                    variantColor="teal"
                    variant="outline"
                    type="submit"
                    width="full"
                    mt={4}
                  >
                    {state.isLoading ? (
                      <CircularProgress
                        isIndeterminate
                        size="24px"
                        color="teal"
                      />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                  <Box>
                    New to us?{" "}
                    <Link
                      color="teal.500"
                      onClick={() => navigate("/register")}
                    >
                      Register
                    </Link>
                  </Box>
                </form>
              </Box>
            </>
          </Box>
        </Flex>
      )}
    </>
  );
}
