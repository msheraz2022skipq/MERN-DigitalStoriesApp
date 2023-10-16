import React from "react";
import {Box, Text} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      bg="gray.800"
      bottom="0"
      left="0"
      right="0"
      height="30px"
      width="100%"
      position="fixed"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
    >
      <Text>SkipQ • © 2023</Text>
    </Box>
  );
};
export default Footer;
