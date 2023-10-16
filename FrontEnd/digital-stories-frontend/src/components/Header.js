import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Heading,
  HStack,
  VStack,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from "@chakra-ui/react";
import { BiMenu } from "react-icons/bi";
import ThemeToggler from "./ThemeToggler";
import { useDispatch } from "react-redux";
import { Types } from "../redux/actionTypes";
import { logoutUserFromBrowser } from "./Browser/userInformation";
import { useState } from "react";

const Header = (props) => {
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const user = props.user;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  useEffect(() => {
    let prevScrollPos = window.scrollY;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const headerElement = headerRef.current;
      if (!headerElement) {
        return;
      }
      if (prevScrollPos > currentScrollPos) {
        headerElement.style.transform = "translateY(0)";
      } else {
        headerElement.style.transform = "translateY(-200px)";
      }
      prevScrollPos = currentScrollPos;
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderMobileHeader = () => (
    <Box
      height={14}
      className="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      background={"lightcoral"}
      ref={headerRef}
    >
      <HStack
        px={1}
        py={1}
        justifyContent="space-between"
        alignItems="center"
        height={16}
      >
        <HStack spacing={2}>
          <nav>{user ? <Avatar src={props.user.image} /> : null}</nav>
          <nav>
            {user ? <Heading size="1xl">{props.user.name}</Heading> : null}
          </nav>
        </HStack>
        <nav>
          <HStack spacing={8}>
            <ThemeToggler />
          </HStack>
        </nav>
        <IconButton
          aria-label="Open drawer"
          onClick={onOpen}
          icon={<BiMenu/>}
        />
      </HStack>
      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <VStack spacing={8} marginTop={10}>
          <Link to="/">About Us</Link>
            {user&&<Link to="/homepage">Home</Link>}
            {user&&<Link to="mystories">Your Profile</Link>}
            {user&&<Link to="leaderboard">Leaderboard</Link>}
            {user&&<Link to="/trending">Trending</Link>}
            {user&&<Link to="createStory">Create Story</Link>}
            
            <Link to="contactus">Contact Us</Link>
            {!user && <Link to="register">Register</Link>}
            {user?<Link
              to="/"
              onClick={(e) => {
                logoutUserFromBrowser();
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.reload()
                dispatch({
                  type: Types.LOGOUT,
                });
              }}
            >
              Logout
            </Link>:<Link to="login">Login</Link>}
          </VStack>
        </DrawerContent>
      </Drawer>
      </Box>
  );

  const renderDesktopHeader = () => (
    <Box
      height={14}
      className="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      background={"lightcoral"}
      ref={headerRef}
    >
      <HStack
        height={14}
        px={4}
        py={4}
        justifyContent="space-between"
        alignItems="center"
      >
        {user ? (
          <HStack spacing={2}>
            <Avatar src={props.user.image} />
            <Heading size="1xl">{props.user.name}</Heading>
          </HStack>
        ) : (
          <nav></nav>
        )}
        

        <nav>
          <HStack spacing={8}>
            <Link to="/">About Us</Link>
            {user && <Link to="/homepage">Home</Link>}
            {user && <Link to="mystories">Your Profile</Link>}
            {user && <Link to="leaderboard">Leaderboard</Link>}
            {user && <Link to="/trending">Trending</Link>}
            {user && <Link to="createStory">Create Story</Link>}
            <Link to="contactus">Contact Us</Link>
            {!user && <Link to="register">Register</Link>}
            {user && (
              <Link
                to="/"
                onClick={(e) => {
                  logoutUserFromBrowser();
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.reload()
                  dispatch({
                    type: Types.LOGOUT,
                  });
                }}
              >
                Logout
              </Link>
            )}
            {!user && <Link to="login">Login</Link>}
          </HStack>
        </nav>
        <nav>
          <HStack spacing={8}>
            <ThemeToggler />
          </HStack>
        </nav>
      </HStack>
    </Box>
  );

  return (
    <>
      {isMobile ?  renderMobileHeader() : renderDesktopHeader()}
    </>
  );
};
export default Header;
