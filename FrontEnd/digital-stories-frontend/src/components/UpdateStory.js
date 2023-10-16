import {
    FormControl,
    FormLabel,
    Button,
    Image,
    Input,
    CircularProgress,
    Textarea,
    VStack,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { useDispatch } from "react-redux";
  import { useLocation, useNavigate } from "react-router-dom";
  import ErrorMessage from "./messages/ErrorMessage";
  import { updateStory } from "./utilities/storyActions";
  import { Types } from "../redux/actionTypes";
  
  const UpdateStory = (props) => {
    const dispatch = useDispatch();
  
    const navigate = useNavigate();
    const location = useLocation()
    const initialState = {
        title: location.state.story.title,
        description: location.state.story.description,
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
    const [mediaUrl, setMediaUrl] = useState(`http://localhost:6969/${location.state.story.file}`);
  
    const handleMedia = async (e) => {
      e.preventDefault();
      const data = e.target.files[0];
      setFile(data);
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("New MediaUrl ", e.target.result);
        setMediaUrl(e.target.result);
      };
      
      reader.readAsDataURL(data);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setState({
        ...state,
        isLoading: true,
      });
      const formData = new FormData();
      formData.append("title", state.title);
      formData.append("description", state.description);
      formData.append("author", props.user._id)
      formData.append("_id", location.state.story._id);
      if (file){
        formData.append("file", file);
      }
      try {
        await updateStory(formData).then((response) => {
          const index = props.stories.findIndex(story=>story._id===response.data._id)
          props.stories[index]=response.data

          dispatch({
            type: Types.UPDATE_STORIES,
            payload: [...props.stories],
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
        >
          <form onSubmit={handleSubmit}>
            {state.error && <ErrorMessage message={state.error} />}
            <FormControl isRequired>
              {!mediaUrl && (
                <Image
                  objectFit="cover"
                  height={300}
                  width={400}
                  overflow={"hidden"}
                  borderRadius="xl"
                  src={
                    "https://wplook.com/wp-content/uploads/2018/05/increase-the-maximum-file-upload-size.jpg"
                  }
                  label="Media"
                />
              )}
              {mediaUrl && mediaUrl.match("image") && (
                <Image
                  objectFit="cover"
                  width="100%"
                  height="100%"
                  overflow={"hidden"}
                  minWidth={400}
                  minHeight={400}
                  borderRadius="xl"
                  src={mediaUrl}
                  label="Story Picture"
                />
              )}
              {mediaUrl && (mediaUrl.match("video")) && (
                <video controls src={mediaUrl} label="Story Video" />
              )}
              <VStack>
                <Button size={"sm"} as={"label"}>
                  Update Media
                  <input
                    type={"file"}
                    name="media"
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
                  "Update Story"
                )}
              </Button>
            </VStack>
          </form>
        </VStack>
      </VStack>
    );
  };
  
  export default UpdateStory;
  