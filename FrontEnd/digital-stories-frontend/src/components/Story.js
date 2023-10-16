import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import "../components/styles/styles.css"
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";
import React, { useState } from "react";
// import { Player } from "video-react";
// import "../../node_modules/video-react/dist/video-react.css"; // import css
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa";
import SendIcon from "@mui/icons-material/Send";
import { ConfirmButton } from "./ConfirmButton";
import { Link } from "react-router-dom";
import {
  deleteStory,
  downvoteStory,
  upvoteStory,
  commentStory,
} from "./utilities/storyActions";
import { Types } from "../redux/actionTypes";

const Story = (props) => {
  const users = useSelector((state) => state.users);
  const loggedInUser = useSelector((state) => state.loggedInUser).data;
  //this owner option will be use to enable and disable button to control user functionalities
  const storyOwner = loggedInUser._id === props.story.author;

  //////////////////////////// useState ////////////////////////////////////////

  const [lines, setLines] = useState(1);
  const [addComment, setAddComment] = useState(false);
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [upVoteLoading, setUpVoteLoading] = useState(false);
  const [downVoteLoading, setDownVoteLoading] = useState(false);
  const [commentPostLoading, setCommentPostLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const len = props.story.description.length;

  //////////////////////////// Handle Comments ////////////////////////////////////////
  const handleComment = () => {
    try {
      setCommentPostLoading(true);
      commentStory(loggedInUser._id, comment, props.story._id)
        .then((response) => {
          const updatedStories = props.stories.map((story) => {
            if (story._id === response.data._id) {
              return response.data;
            }
            return story;
          });
          dispatch({
            type: Types.UPDATE_STORIES,
            payload: updatedStories,
          });
          setComment("");
          setCommentPostLoading(false);
        })
        .catch((error) => {
          setCommentPostLoading(false);
          alert(error);
        });
    } catch (error) {
      setCommentPostLoading(false);
      alert(error);
    }
  };
  //////////////////////////// Handle Delete ////////////////////////////////////////

  const handleDelete = async () => {
    setDeleting(!deleting);
    await deleteStory(props.story._id)
      .then((deletedStory) => {
        if (props.stories) {
          const updatedStories = [...props.stories].filter(
            (story) => story._id !== deletedStory.data._id
          );
          console.log("Updated Stories: ", updatedStories);
          dispatch({
            type: Types.UPDATE_STORIES,
            payload: updatedStories,
          });
          setDeleting(!deleting);
        }
      })
      .catch((error) => {
        setDeleting(false);
        alert(error);
      });
  };

  //////////////////////////// Handle Upvotes ////////////////////////////////////////
  const handleUpvote = async () => {
    setUpVoteLoading(true);
    await upvoteStory(loggedInUser._id, props.story._id)
      .then((updatedStory) => {
        const updatedStories = props.stories.map((story) => {
          if (story._id === updatedStory.data._id) {
            return updatedStory.data;
          }
          return story;
        });
        dispatch({
          type: Types.UPDATE_STORIES,
          payload: updatedStories,
        });
        setUpVoteLoading(false);
      })
      .catch((error) => {
        setUpVoteLoading(false);
        alert(error);
      });
  };
  //////////////////////////// Handle Downvote ////////////////////////////////////////

  const handleDownvote = async () => {
    setDownVoteLoading(true);
    await downvoteStory(loggedInUser._id, props.story._id)
      .then((updatedStory) => {
        const updatedStories = props.stories.map((story) => {
          if (story._id === updatedStory.data._id) {
            return updatedStory.data;
          }
          return story;
        });
        dispatch({
          type: Types.UPDATE_STORIES,
          payload: updatedStories,
        });
        setDownVoteLoading(false);
      })
      .catch((error) => {
        setDownVoteLoading(false);
        alert(error);
      });
  };





  return (
    <Box className="responsive-box"
      maxW="xl" mx="auto" my={4} p={3}
   >
     {props.story.file.split(".").pop() === "jpg" ||
     props.story.file.split(".").pop() === "jpeg" ||
     props.story.file.split(".").pop() === "png" ||
     props.story.file.split(".").pop() === "PNG" ? (
       <Image
         borderRadius="xl"
         src={props.story.file}
         alt={props.story.title}
         objectFit="cover"
         overflow={"hidden"}
         width="100%"
       />
     ) : props.story.file.split(".").pop() === "mp4" ? (
       <video
         controls
         alt={props.story.title}
         src={props.story.file}
       />
     ) : (
       ""
     )}

     <VStack spacing={1} p={2} alignItems="flex-start">
       <HStack justifyContent="space-between">
         <Heading as="h3" size="md">
           {props.story.title}
         </Heading>
       </HStack>

       <Link to="/viewprofile" state={{ user: users.find((user) =>user._id === props.story.author)}}>
         {users.map((user) => {
           if (user._id === props.story.author) {
             return user.name;
           }
         })}
       </Link>

       <Text as="i" fontSize="sm" color="gray.500">
         {new Date(props.story.createdAt).toLocaleString()}
       </Text>

       <Text color="#64748b" fontSize="lg" noOfLines={lines}>
         {props.story.description}
       </Text>
       <HStack spacing={2}>
         {len > 50 ? (
           <Button
             color={"light"}
             size="xs"
             onClick={() => {
               lines === 1 ? setLines("") : setLines(1);
             }}
           >
             {lines === 1 ? "Show more" : "Show less"}
           </Button>
         ) : (
           ""
         )}
       </HStack>
     </VStack>
     <HStack placeSelf={"flex-end"} justifyContent="flex-end">
       <Button
         isLoading={upVoteLoading}
         disabled={
           storyOwner ||
           props.story.upvotes.filter(
             (upvote) => upvote.author === loggedInUser._id
           ).length > 0
         }
         backgroundColor={"light"}
         name="upvotes"
         onClick={handleUpvote}
       >
         <BiUpvote />
         {props.story.upvotes.length}
       </Button>
       <Button
         isLoading={downVoteLoading}
         disabled={
           storyOwner ||
           props.story.downvotes.filter(
             (downvote) => downvote.author === loggedInUser._id
           ).length > 0
         }
         backgroundColor={"light"}
         name="downvotes"
         onClick={handleDownvote}
       >
         <BiDownvote />
         {props.story.downvotes.length}
       </Button>
       <Button
         backgroundColor={"light"}
         onClick={() => {
           addComment ? setAddComment(false) : setAddComment(true);
         }}
       >
         <BiComment />
         {props.story.comments.length}
       </Button>
       {storyOwner ? (
         <>
           <Link to="/mystories/update-story" state={{ story: props.story }}>
             <Button>{<FaEdit />}</Button>
           </Link>
           <ConfirmButton action={handleDelete}>
             <FaTrash />
           </ConfirmButton>
         </>
       ) : (
         ""
       )}
     </HStack>

     {addComment ? (
       <>
         <HStack>
           <Textarea
             name="comment"
             value={comment}
             placeholder="Write comment"
             onChange={(e) => {
               setComment(e.target.value);
             }}
           />
         </HStack>
         <HStack>
           <Button
             backgroundColor={"light"}
             onClick={() => {
               setAddComment(false);
             }}
           >
             Cancel
           </Button>
           <Button
             isLoading={commentPostLoading}
             disabled={!comment}
             backgroundColor={"light"}
             name="post"
             onClick={handleComment}
           >
             <SendIcon />
           </Button>
         </HStack>
         <VStack spacing={1} p={2} alignItems="flex-start">
           {/* display comments */}
           <Heading size={"sm"}>Comments</Heading>
           {props.story.comments.map((comment, index) => {
             const author = users.find(
               (user) => user._id === comment.author
             );
             return (
               <>
                 <Text key={index}>{comment.body}</Text>
                 <Text as="i" fontSize="sm" color="gray.500">
                   by {author.name}
                 </Text>
               </>
             );
           })}
         </VStack>
       </>
     ) : (
       ""
     )}
   </Box>
  );
};

export default Story;
