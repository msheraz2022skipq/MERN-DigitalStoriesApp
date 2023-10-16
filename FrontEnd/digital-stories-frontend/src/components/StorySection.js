import React from "react";
import { HStack, Button, Box, Heading, Stack } from "@chakra-ui/react";
import Story from "./Story";
import { useState } from "react";
import "../components/styles/styles.css";
const StorySection = (props) => {
  const [gridView, setGridView] = useState(false);
  const toggleView = () => {
    setGridView(!gridView);
  };

  if (props.stories) {
    return (
      <Stack spacing={4} p={4} alignItems="center">
        <HStack>
          <Heading as="h1" id="projects-section-heading">
            {props.heading}
          </Heading>
          {window.innerWidth > 768 && (
            <Button size={"sm"} onClick={toggleView}>
              {!gridView ? "Grid View" : "Flat View"}
            </Button>
          )}
        </HStack>
        {props.stories.length > 0 ? (
          <Box
            className="responsive-box"
            display="grid"
            gridTemplateColumns={
              window.innerWidth > 768 && gridView ? "1fr 1fr" : "1fr"
            }
            gridAutoFlow="row"
          >
            {props.stories.map((story) => (
              <Story story={story} stories={props.stories} />
            ))}
          </Box>
        ) : (
          <Heading as="h4" textAlign="center">
            No Stories ...
          </Heading>
        )}
      </Stack>
    );
  }
};

export default StorySection;
