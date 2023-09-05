import React, { useState, useEffect } from "react";
import FeedbackModal from "../Components/FeedbackModal";
import axios from "axios";
import {
  VStack,
  Box,
  HStack,
  Text,
  Badge,
  Button,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Image,
  useToast,
} from "@chakra-ui/react";

function Home() {
  
  let id = JSON.parse(localStorage.getItem("userId"));
  const [dishes, setDishes] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  let url = "https://zomatoapp-18pi.onrender.com";

  const showToast = (messages) => {
    toast({
        title: "success",
        description: messages,
        status: "success",
        duration: 3000, // Show for 1 second
        isClosable: true,
    });
}


  const {
    isOpen: feedbackIsOpen,
    onOpen: onFeedbackOpen,
    onClose: onFeedbackClose,
  } = useDisclosure();

  useEffect(() => {
    axios
      .get(`${url}/menu/`)
      .then((response) => {
        setDishes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu items", error);
      });
  }, []);

  const addToWishlist = (dish) => {
    if (!wishlist.some((item) => item.id === dish.id)) {
      setWishlist([...wishlist, dish]);
    } else {
      alert("Dish already in the wishlist!");
    }
  };

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((dish) => dish.id !== id);
    setWishlist(updatedWishlist);
  };

  const initiateOrder = () => {
    onOpen();
  };
  let list = wishlist.map((el) => el.id);
  const confirmOrder = () => {
    axios
      .post(`${url}/place_order/`, {
        customer_name: customerName,
        dishes: list,
        status: "received",
        userNo: id,
      })
      .then((response) => {
        showToast("Order placed successfully!");
        onClose();
        onFeedbackOpen();
      })
      .catch((error) => {
        console.log(error);
        alert("Error placing the order. Please try again.");
      });
  };

  const handleFeedbackSubmit = (rating, comment, feedbackReason) => {
    let data = {
      dishes: wishlist.map((dish) => dish.id),
      rating: rating,
      comment: comment,
      reason: feedbackReason,
    };
    console.log(data);
    axios.post(`${url}/feedback/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
       
        // FeedbackModal.onClose();
        setWishlist([]);
        setCustomerName("");
        showToast("Your feedback has been successfully sent.")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={6}
      backgroundImage={
        "url(https://img.freepik.com/premium-photo/oktoberfest-tasty-bavarian-festival-beer-snacks_731930-13909.jpg?w=900)"
      }
      color={"white"}
    >
      <VStack spacing={5} align="start" width="120%">
        <Button fontSize="xl" mb={1} ml={"30%"} fontWeight={"extrabold"}>
          MENU
        </Button>
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
          ]}
          gap="1rem"
          w={["95%", "110%", "110%"]}
          maxH="85vh"
          overflowY="auto"
        >
          {dishes.map((dish) => (
            <Box
              bg="#2729326f"
              backdropFilter={"blur(10px)"}
              key={dish.id}
              p={["0.5rem", "1rem", "1rem"]}
              shadow="lg"
              borderWidth="1px"
              borderRadius="md"
              color="black"
              minW="12.5rem"
              minH="12.5rem"
            >
              <VStack spacing={4} align="center" color={"white"}>
                <Image
                  // src={dish.image_url}
                  src="data:image/jpeg;base64,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"
                  w={["6rem", "8rem", "8rem"]}
                  borderRightRadius={"30%"}
                />
                <Text fontSize={["md", "lg", "lg"]}>{dish.dish_name}</Text>
                <Text fontSize={["sm", "md", "md"]}>₹{dish.price}</Text>
                <Badge colorScheme={dish.availability ? "green" : "red"}>
                  {dish.availability ? "Available" : "Not Available"}
                </Badge>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => addToWishlist(dish)}
                  isDisabled={wishlist.some((item) => item.id === dish.id)}
                  fontSize={["sm", "md", "md"]}
                >
                  Add to Wishlist
                </Button>
              </VStack>
            </Box>
          ))}
        </Grid>
      </VStack>
      <VStack
        spacing={[3, 4, 5]}
        align="start"
        width={["95%", "100%", "100%"]}
        pl={["5%", "20%", "30%"]}
        maxH="85vh"
        overflowY="auto"
      >
        <Button
          fontSize={["md", "lg", "xl"]}
          mb={[2, 3, 4]}
          ml={[0, "10%", "40%"]}
          fontWeight={"extrabold"}
        >
          Wishlist Items
        </Button>
        {wishlist.map((dish) => (
          <Box
            bg="#2729326f"
            backdropFilter={"blur(10px)"}
            key={dish.id}
            p={["1rem", "2rem", "2rem"]}
            shadow="md"
            borderWidth="1px"
            width="100%"
            borderRadius="md"
          >
            <HStack justifyContent="space-between">
              <Text fontSize={["md", "lg", "xl"]}>{dish.dish_name}</Text>
              <Text fontSize={["sm", "md", "lg"]}>₹{dish.price}</Text>
              <Button
                size={["xs", "sm", "md"]}
                colorScheme="red"
                onClick={() => removeFromWishlist(dish.id)}
                whiteSpace="normal"
              >
                <Text fontSize={["2xs", "sm", "md"]}>Remove</Text>
              </Button>
            </HStack>
          </Box>
        ))}
        <Button
          colorScheme="green"
          mt={5}
          onClick={initiateOrder}
          isDisabled={wishlist.length === 0}
          ml={["5%", "15%", "30%"]}
        >
          Place Order
        </Button>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Place Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={confirmOrder}>
              Confirm Order
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <FeedbackModal
        isOpen={feedbackIsOpen}
        onClose={onFeedbackClose}
        onSubmit={handleFeedbackSubmit}
      />
    </Grid>
  );
}

export default Home;
