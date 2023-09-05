import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    VStack, Box, HStack, Text, Badge, Button, Grid, Modal,
    ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, ModalFooter, useDisclosure, Select,
    Input, Switch, FormControl, FormLabel
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

function Admin() {
    const [dishes, setDishes] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedOrderStatus, setSelectedOrderStatus] = useState('received');
    const orderModal = useDisclosure();
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const addDishModal = useDisclosure();
    const [newDishName, setNewDishName] = useState("");
    const [newDishPrice, setNewDishPrice] = useState("");
    const [newstr,setNewstr]=useState("")
    const [newDishAvailability, setNewDishAvailability] = useState(true);
   const nav=useNavigate()
    const url = "https://zomatoapp-18pi.onrender.com";

    useEffect(() => {
        // Fetch dishes
        axios.get(`${url}/menu/`)
            .then(response => {
                setDishes(response.data);
            })
            .catch(error => {
                console.error("Error fetching menu items", error);
            });

        // Fetch orders
        axios.get(`${url}/orders/`)
            .then(response => {
                setOrders(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error("Error fetching orders", error);
            });
    }, []);

    const handleAddDish = () => {
        const newDish = {
            dish_name: newDishName,
            price: parseInt(newDishPrice),
            availability: newDishAvailability,
            image_url:newstr
        };

        axios.post(`${url}/add_dish/`, newDish)
            .then(response => {
                setDishes([...dishes, response.data]);
                addDishModal.onClose();
                setNewstr("")
                setNewDishPrice("")
                setNewDishName("")
            })
            .catch(error => {
                console.error("Error adding new dish", error);
            });
    };

    const toggleDishAvailability = (dish) => {
        const updatedDish = { ...dish, availability: !dish.availability };
        axios.patch(`${url}/update_dish/${dish.id}/`, updatedDish)
            .then(response => {
                setDishes(dishes.map(d => d.id === dish.id ? response.data : d));
            })
            .catch(error => {
                console.error("Error updating dish", error);
            });
    };

    const deleteDish = (dishId) => {
        axios.delete(`${url}/delete_dish/${dishId}/`)
            .then(() => {
                setDishes(dishes.filter(d => d.id !== dishId));
            })
            .catch(error => {
                console.error("Error deleting dish", error);
            });
    };

    const openOrderModal = (orderId) => {
        setSelectedOrderId(orderId);
        orderModal.onOpen();
    };

    const updateOrderStatus = () => {
        if (selectedOrderId) {
            axios.patch(`${url}/update_order/${selectedOrderId}/`, { status: selectedOrderStatus })
                .then(response => {
                    setOrders(orders.map(order => order.id === selectedOrderId ? response.data : order));
                    orderModal.onClose();
                })
                .catch(error => {
                    console.error("Error updating order status", error);
                });
        }
    };

    return (
        <Grid templateColumns="repeat(2, 1fr)" color={"white"} gap={6} backgroundImage={"url(https://img.freepik.com/free-vector/futuristic-background-design_23-2148503793.jpg?size=626&ext=jpg&ga=GA1.2.1006803127.1692534947&semt=ais)"}>
            {/* Dishes Management */}
           
            <VStack spacing={5} align="start" width="100%" maxH="85vh" overflowY="auto">
            <Button colorScheme="teal" onClick={addDishModal.onOpen} ml={"30%"} w={"20%"} mt={"20px"} position="sticky"  top="0"  zIndex={1}>Add Dish</Button>
                {dishes.map(dish => (
                    <Box key={dish.id} p={5} shadow="md" borderWidth="1px" width="100%" borderRadius="md">
                        <HStack justifyContent="space-between">
                            <VStack align="start">
                                <Text fontSize="xl">{dish.dish_name}</Text>
                                <Text>₹{dish.price}</Text>
                            </VStack>
                            <Badge colorScheme={dish.availability ? "green" : "red"}>
                                {dish.availability ? "Available" : "Not Available"}
                            </Badge>
                            <Button onClick={() => toggleDishAvailability(dish)}>Toggle Availability</Button>
                            <Button colorScheme="red" onClick={() => deleteDish(dish.id)}>Delete</Button>
                        </HStack>
                    </Box>
                ))}
                
                {/* Button to open the "Add Dish" modal */}
               
            </VStack>

            {/* Orders Management */}
            <VStack spacing={5} align="start" width="100%" maxH="85vh" overflowY="auto">
    
    <Button colorScheme="teal" ml="30%" w={"40%"} mt={"20px"} zIndex={1} onClick={()=>{
         nav("/feedback")
    }}>click to get All Feedbacks </Button>
    <Button colorScheme="teal" ml="40%" w={"20%"} mt={"20px"}  position="sticky" top="0" zIndex={1}>Orders </Button>
    {orders.map(order => (
        <Box key={order.id} p={5} shadow="md" borderWidth="1px" width="100%" borderRadius="md">
            <HStack justifyContent="space-between">
                <VStack align="start">
                    <Text fontSize="xl">Customer: {order.customer_name}</Text>
                    <Text>Status: {order.status}</Text>
                </VStack>
                <Button onClick={() => openOrderModal(order.id)}>Update Status</Button>
            </HStack>
        </Box>
    ))}
</VStack>


            {/* Modal for Adding a Dish */}
            <Modal isOpen={addDishModal.isOpen} onClose={addDishModal.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Dish</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb={4}>
                            <FormLabel>Dish Name</FormLabel>
                            <Input 
                                value={newDishName} 
                                onChange={(e) => setNewDishName(e.target.value)} 
                                placeholder="Enter dish name"
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Price</FormLabel>
                            <Input 
                                type="number"
                                value={newDishPrice} 
                                onChange={(e) => setNewDishPrice(e.target.value)} 
                                placeholder="Enter price"
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Image</FormLabel>
                            <Input 
                                type="str"
                                value={newstr} 
                                onChange={(e) => setNewstr(e.target.value)} 
                                placeholder="url"
                            />
                        </FormControl>
                        <FormControl display="flex" alignItems="center" mb={4}>
                            <FormLabel mb="0">Available</FormLabel>
                            <Switch 
                                isChecked={newDishAvailability} 
                                onChange={(e) => setNewDishAvailability(e.target.checked)} 
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleAddDish}>Add Dish</Button>
                        <Button variant="ghost" onClick={addDishModal.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal for Order Status Update */}
            <Modal isOpen={orderModal.isOpen} onClose={orderModal.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Order Status</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Select value={selectedOrderStatus} onChange={(e) => setSelectedOrderStatus(e.target.value)}>
                            <option value="received">Received</option>
                            <option value="processing">Processing</option>
                            <option value="served">Served</option>
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={updateOrderStatus}>Update</Button>
                        <Button variant="ghost" onClick={orderModal.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Grid>
    );
}

export default Admin;
