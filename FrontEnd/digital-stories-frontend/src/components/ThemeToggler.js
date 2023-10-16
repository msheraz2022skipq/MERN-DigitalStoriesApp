import React from 'react';
import { useColorMode, Box, IconButton } from '@chakra-ui/react';
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";

export default function ThemeToggler() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box textAlign="right">
      <IconButton
        size="lg"
        icon={colorMode === 'light' ? <BsFillMoonFill/>:<BsSunFill />}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Box>
  );
}