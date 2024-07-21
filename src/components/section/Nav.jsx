import React from "react";
import { Box, Flex, Text, Button, Stack } from "@chakra-ui/react";
import { FaBars } from 'react-icons/fa';
import { TfiClose } from "react-icons/tfi";
import { Link, useLocation } from 'react-router-dom';
import DarkMode from "../partials/DarkMode";
import Logout from "../common/Logout";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <Flex
    as="nav"
    align="center"
    justify="space-between"
    wrap="wrap"
    w="100%"
    mb={8}
    p={4}
    bg={{ base: "green.500", lg: "transparent" }}
    color={{ base: "white", lg: "green.700" }}
    boxShadow="md"
    >
    <Flex gap={4} align="center">
      <DarkMode />
      <Logout />
    </Flex>
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} />
      </Flex>
  );
};

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: 'block', lg: 'none' }} onClick={toggle}>
      {isOpen ? <TfiClose color="white" size={40}/> : <FaBars color="white" size={40} />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link to={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen }) => {
    
    const location = useLocation();
    const { userProfile } = useContext(AuthContext);

  // Define the routes
  const routes = ["report", "contact-forms", "users", "categories", "orders", "products"];

  // Conditionally include "admins" route
  if (userProfile.permission === 1) {
    routes.unshift("admins");
  }

    // Function to check if a MenuItem is active based on its route
    const isMenuItemActive = (menuItemRoute) => {
    return location.pathname === menuItemRoute;
  };

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", lg: "block" }}
      flexBasis={{ base: "100%", lg: "auto" }}
    >
      <Stack
        spacing={4}
        align="center"
        justify={["center", "center", "flex-end"]}
        direction={{ base: "column", lg: "row" }}
        pt={{ base: 4, lg: 0 }}
      >

        {routes.map((route) => (
          <MenuItem key={route} to={`/${route}`} color={{ base: "white", lg: "green.500" }}>
            <Button
              isActive={isMenuItemActive(`/${route}`)}
              size="sm"
              rounded="md"
              color={{ base: "green.500", lg: "white" }}
              bg={{ base: "white", lg: "green.500" }}
              width="120px"
              _hover={{
                bg: { base: "green.100", lg: "green.600" }
              }}
              _active={{
                bg: { base: "green.200", lg: "green.700" }
              }}
            >
              {route.charAt(0).toUpperCase() + route.slice(1)}
            </Button>
          </MenuItem>
        ))}
        
      </Stack>
    </Box>
  );
};

export default Nav;
