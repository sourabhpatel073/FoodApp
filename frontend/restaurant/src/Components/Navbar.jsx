import { useState } from 'react';
import {Menu, MenuButton, MenuList, MenuItem,Image, Flex, Box, Button, Spacer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const toast = useToast();
  let nav=useNavigate()

  const handleAdminClick = () => {
    setIsOpen(true);
  };

  const handlePasscodeSubmit = () => {
    if (passcode === '1111') {
     nav("/admin")
    } else {
      toast({
        title: "Failed to access",
        description: "Incorrect passcode.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsOpen(false);
  };

  return (
    <Flex bg="black" p="4" boxShadow="md" color="white">
    <Box>
      <Link to="/home">
        <Image src='https://w7.pngwing.com/pngs/4/102/png-transparent-fork-and-spoon-gps-logo-take-out-online-food-ordering-delivery-restaurant-the-restaurant-door.png' w={"80px"} height={"60px"} />
      </Link>
    </Box>
    <Spacer />

    {/* Display the buttons for larger screens and hide for smaller screens */}
    <Box display={["none", "none", "block"]} pt={"15px"} pr={"10%"}>
      <Link to="/chat">
        <Button as="a" variant="link" mr="4" color={'white'}>
          Chat with us
        </Button>
      </Link>

      <Link to="/notifications">
        <Button as="a" variant="link" mr="4" color={'white'}>
          Notifications
        </Button>
      </Link>

      <Link to="/auth">
        <Button as="a" variant="link" mr="4" color={'white'}>
          login/signup
        </Button>
      </Link>

      <Button onClick={handleAdminClick} as="a" variant="link" mr="4" color={'white'}>
        Admin
      </Button>
    </Box>

    {/* Hamburger menu for smaller screens */}
    <Box display={["block", "block", "none"]} pr={4}>
      <Menu>
        <MenuButton as={Button} colorScheme="black" variant="outline">
          <HamburgerIcon />
        </MenuButton>
        <MenuList >
          <MenuItem as={Link} to="/chat" color={"black"}>Chat with us</MenuItem>
          <MenuItem as={Link} to="/notifications" color={"black"}>Notifications</MenuItem>
          <MenuItem as={Link} to="/auth" color={"black"}>login/signup</MenuItem>
          <MenuItem onClick={handleAdminClick} color={"black"}>Admin</MenuItem>
        </MenuList>
      </Menu>
    </Box>
    
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Passcode</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input 
            placeholder="Enter passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            type="password"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handlePasscodeSubmit}>
            Submit
          </Button>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </Flex>
  );
}

export default Navbar;
