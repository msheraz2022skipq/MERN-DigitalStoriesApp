import {
  FormControl,
  FormLabel,
  Button,
  Image,
  Input,
  Box,
  CircularProgress,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./messages/ErrorMessage";
import { createStory } from "./utilities/createStory";
import { Types } from "../redux/actionTypes";

const CreateStory = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedInUser).data;
  const navigate = useNavigate();

  ///////////////////Handle Story////////////////////
  const initialState = {
    title: "",
    description: "",
    error: "",
    isLoading: false,
  };
  const [state, setState] = useState(initialState);
  const handleState = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const [file, setFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);

  const handleMedia = async (e) => {
    e.preventDefault();
    const data = e.target.files[0];
    setFile(data);
    const reader = new FileReader();
    reader.onload = (e) => {
      setMediaUrl(e.target.result);
    };
    reader.readAsDataURL(data);
  };

  ////////////////Handle Submit//////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      isLoading: true,
    });
    const formData = new FormData();
    formData.append("title", state.title);
    formData.append("description", state.description);
    formData.append("author", user._id);
    formData.append("file", file);
    
    try {
      await createStory(formData).then((response) => {
        dispatch({
          type: Types.UPDATE_STORIES,
          payload: [...props.stories, response.data],
        });
      });
      setState(initialState);

      setFile(null);

      navigate("/mystories");
    } catch (error) {
      setState({
        ...state,
        error: error,
      });
    }
  };

  return (
    <VStack minH={610}>
      <VStack
        cursor="pointer"
        borderRadius="xl"
        border="1px"
        borderColor="gray.200"
        align={"left"}
        marginTop={20}
        minWidth={400}
        marginBottom={10}
      >
        <form onSubmit={handleSubmit}>
          {state.error && <ErrorMessage message={state.error} />}
          <FormControl isRequired>
            <Box maxW="xl" mx="auto" my={6} p={6}>
              {/* {!file && (
                <Image
                  objectFit="cover"
                  height={300}
                  width={400}
                  overflow={"hidden"}
                  borderRadius="xl"
                  src={
                    "https://wplook.com/wp-content/uploads/2018/05/increase-the-maximum-file-upload-size.jpg"
                  }
                  label="Upload Media"
                />
              )} */}

              {/* ///////////////////Display Uploaded Media///////////////////// */}
              {file && file.type.split("/")[0] === "image" && (
                <Image
                  objectFit="cover"
                  overflow={"hidden"}
                  borderRadius="xl"
                  src={mediaUrl}
                  label="Story Picture"
                />
              )}
              {file && file.type.split("/")[0] === "video" && (
                <video controls src={mediaUrl} label="Story Video" />
              )}
            </Box>

            {/* ///////////////////Upload Media///////////////////// */}

            <VStack>
              <Button size={"sm"} as={"label"}>
                Upload Media
                <input
                  type="file"
                  name="media"
                  accept="image/*,video/*"
                  onChange={handleMedia}
                  style={{ display: "none" }}
                />
              </Button>
            </VStack>
          </FormControl>

          <VStack spacing={1} p={2} alignItems="flex-start">
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                type={"text"}
                name="title"
                placeholder="Title of your story"
                value={state.title}
                onChange={handleState}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Describe your story"
                color="#64748b"
                name="description"
                value={state.description}
                onChange={handleState}
              ></Textarea>
            </FormControl>

            <Button
              variantColor="teal"
              variant="outline"
              type="submit"
              alignSelf={"center"}
              mt={4}
              size={"sm"}
            >
              {state.isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="teal" />
              ) : (
                "Publish Story"
              )}
            </Button>
          </VStack>
        </form>
      </VStack>
    </VStack>
  );
};

export default CreateStory;
