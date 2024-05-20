import React from "react";
import { Box, Flex, Text, Button, Stack } from "@chakra-ui/react";
import { FaBars } from 'react-icons/fa';
import { TfiClose } from "react-icons/tfi";
import { Link, useLocation } from 'react-router-dom';
import DarkMode from "../partials/DarkMode";
import Logout from "../common/Logout";

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
    p={8}
    bg={["green.500", "green.500", "transparent"]}
    color={["white", "white", "green.700"]}
  >
    <Flex gap={4}>
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
    <Box display={['block','block','none']} onClick={toggle}>
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
    // Function to check if a MenuItem is active based on its route
    const isMenuItemActive = (menuItemRoute) => {
      return location.pathname === menuItemRoute;
    };

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end"]}
        direction={["column", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
       {/* <MenuItem to="/report" color={["white", "white", "green.500"]}>
           Reports
        </MenuItem> */}

        {/* <MenuItem to="/contact-forms" color={["white", "white", "green.500"]}>
           Contacts
        </MenuItem> */}

        {/* <MenuItem to="/users" color={["white", "white", "green.500"]}>
           Users
        </MenuItem> */}

        {/* <MenuItem to="/categories" color={["white", "white", "green.500"]}>
          Categories
        </MenuItem> */}

        {/* <MenuItem to="/" color={['white','white','green.500']}>Login</MenuItem> */}

        <MenuItem to="/report" color={["white", "white", "green.500"]}>
        <Button
            isActive={isMenuItemActive('/report')}
            size="sm"
            rounded="md"
            color={["green.500", "green.500", "white"]}
            bg={["white", "white", "green.500"]}
            _hover={{
              bg: ["green.100", "green.100", "green.600"]
            }}
          >
           Reports
        </Button>
        </MenuItem>

        <MenuItem to="/contact-forms" color={["white", "white", "green.500"]}>
        <Button
            isActive={isMenuItemActive('/contact-forms')}
            size="sm"
            rounded="md"
            color={["green.500", "green.500", "white"]}
            bg={["white", "white", "green.500"]}
            _hover={{
              bg: ["green.100", "green.100", "green.600"]
            }}
          >
           Contacts
        </Button>
        </MenuItem>

        <MenuItem to="/users" color={["white", "white", "green.500"]}>
        <Button
            isActive={isMenuItemActive('/users')}
            size="sm"
            rounded="md"
            color={["green.500", "green.500", "white"]}
            bg={["white", "white", "green.500"]}
            _hover={{
              bg: ["green.100", "green.100", "green.600"]
            }}
          >
           Users
        </Button>
        </MenuItem>

        <MenuItem to="/categories" color={["white", "white", "green.500"]}>
        <Button
            isActive={isMenuItemActive('/categories')}
            size="sm"
            rounded="md"
            color={["green.500", "green.500", "white"]}
            bg={["white", "white", "green.500"]}
            _hover={{
              bg: ["green.100", "green.100", "green.600"]
            }}
          >
           Categories
        </Button>
        </MenuItem>

        <MenuItem to="/orders" color={["white", "white", "green.500"]}>
        <Button
            isActive={isMenuItemActive('/orders')}
            size="sm"
            rounded="md"
            color={["green.500", "green.500", "white"]}
            bg={["white", "white", "green.500"]}
            _hover={{
              bg: ["green.100", "green.100", "green.600"]
            }}
          >
           Orders
        </Button>
        </MenuItem>

        <MenuItem to="/products" isLast>
          <Button
            isActive={isMenuItemActive('/products')}
            size="sm"
            rounded="md"
            color={["green.500", "green.500", "white"]}
            bg={["white", "white", "green.500"]}
            _hover={{
              bg: ["green.100", "green.100", "green.600"]
            }}
          >
           Product
          </Button>
        </MenuItem>
        
      </Stack>
    </Box>
  );
};

export default Nav;



