import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box, VStack, Text, Heading, Container, HStack
} from "@chakra-ui/react";

function Feedbacks() {
    const [feedbacks, setFeedbacks] = useState([]);
   let url="https://zomatoapp-18pi.onrender.com"
    useEffect(() => {
        axios.get(`${url}/allfeedbacks/`)
            .then(response => {
                setFeedbacks(response.data);
               
            })
            .catch(error => {
                console.error("Error fetching feedbacks", error);
            });
    }, []);

    return (
        <Box backgroundImage={"url(https://img.freepik.com/free-photo/collage-customer-experience-concept_23-2149367121.jpg?w=1060&t=st=1692605469~exp=1692606069~hmac=2b216341197fcca8791d69b0ede8ad1aff7d212f1008379c4276206ad2f52df9)"} maxH="85vh" overflowY="auto" minH={"600px"}>
             <Container maxW="container.md"  color={"white"}>
            <Heading mb={5}  color={"white"}>All Feedbacks</Heading>
            {feedbacks.map(feedback => (
                <Box
                    boxShadow={'25px 5px 10px red'}
                    backdropFilter={'blur(10px)'}
                    bg = "linear-gradient(79deg, rgba(22, 32, 41, 0.544) 0%, rgba(22, 32, 41, 0.544) 35%, rgba(92, 127, 163, 0.51) 100%)"
                    key={feedback.id} 
                    p={4} 
                    shadow="md" 
                    borderWidth="1px" 
                    borderRadius="md" 
                    mb={4}
                >
                <HStack justifyContent={"space-between"}> <Text align={"start"} fontWeight={"bold"}>Dish Ids: {feedback.dishes.join(",")}</Text>
                        <Text align={"end"} fontWeight={"bold"}>Feedback Id: {feedback.id}</Text></HStack>
                       
        
                    <VStack spacing={3} align="center" fontWeight={"bold"}>
                        <Text fontSize="xl">Rating: {feedback.rating}</Text>
                        <Text>Comment: {feedback.comment}</Text>
                        <Text>Reason: {feedback.reason}</Text>
                    </VStack>
                </Box>
            ))}
        </Container>
        </Box>
       
    );
}

export default Feedbacks;
