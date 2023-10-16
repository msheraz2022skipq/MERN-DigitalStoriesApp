import React, { useState } from 'react';
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
    Stack,
    Avatar,
    HStack
} from '@chakra-ui/react';

import { userRegister } from '../utilities/userRegister';
import ErrorMessage from '../messages/ErrorMessage';
import { useNavigate } from 'react-router-dom';
export default function Register() {
    const navigate = useNavigate()
    const initialState = {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        error: '',
        isLoading: false,
        showPassword: false
    }
    const [state, setState] = useState(initialState)
    const handleState = (e) => {
        const { name, value } = e.target
        setState({
            ...state,
            [name]: value
        })
    }
    const [profileImage, setProfileImage] = useState(null)

    const handleImage = async (e) => {
        e.preventDefault()
        const img = e.target.files[0]
        const base64 = await convertToBase64(img)
        setProfileImage(base64)
    }

    const convertToBase64 = (image) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(image)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const handleSubmit = async event => {
        event.preventDefault();
        setState({
            ...state,
            isLoading: true
        })
        try {
            await userRegister({ name: state.name, email: state.email, password: state.password, image: profileImage });
            setState({
                ...state,
                isLoading: false,
                showPassword: false
            })
            navigate("/login")
            alert("Successfully Registered.")
        } catch (error) {
            setState({
                ...initialState,
                error: error
            })
            setProfileImage(null)
        }
    };

    return (
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
                        <Box minW={{ base: "90%", md: "468px" }}></Box>
                        <center>
                            <Heading>Digital Stories</Heading>

                            <FormControl isRequired>
                                <Avatar alignSelf={"center"} size={"2xl"} src={profileImage ? profileImage : "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png"} label="Profile Picture" />
                                <Stack>
                                    <Button size={"sm"} as={"label"}>
                                    Upload Image
                                    <input
                                        type={"file"}
                                        name='image'
                                        onChange={handleImage}
                                        style={{ display: 'none' }}
                                    />
                                    </Button>
                                    </Stack>
                            </FormControl>
                        </center>

                    </Stack>
                    <Box textAlign="left">
                        <Heading>Register</Heading>
                    </Box>
                    <Box my={4} textAlign="left">
                        <form onSubmit={handleSubmit}>
                            {state.error && <ErrorMessage message={state.error} />}
                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    name="name"
                                    value={state.name}
                                    type="text"
                                    placeholder="Full Name"
                                    size="lg"
                                    onChange={handleState}
                                />
                            </FormControl>
                            <FormControl isRequired mt={6}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    value={state.email}
                                    placeholder="test@test.com"
                                    size="lg"
                                    onChange={handleState}
                                />
                            </FormControl>

                            <FormControl isRequired mt={6}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={state.showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={state.password}
                                        placeholder="*******"
                                        size="lg"
                                        onChange={handleState}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired mt={2}>
                                <InputGroup>
                                    <Input
                                        type={state.showPassword ? 'text' : 'password'}
                                        placeholder="Re-enter password"
                                        name="rePassword"
                                        value={state.rePassword}
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
                                disabled={(state.name && state.email && state.password && state.password === state.rePassword) ? false : true}
                            >
                                {state.isLoading ? (
                                    <CircularProgress
                                        isIndeterminate
                                        size="24px"
                                        color="teal"
                                    />
                                ) : (
                                    'Sign Up'
                                )}
                            </Button>
                            <Box>
                                Already have an account?{" "}
                                <Link color="teal.500" onClick={() => navigate("/login")}>
                                    Login
                                </Link>
                            </Box>
                        </form>
                    </Box>
                </>
            </Box>
        </Flex>
    );
}