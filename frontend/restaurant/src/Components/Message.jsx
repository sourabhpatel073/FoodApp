// Message.js

import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function Message(props) {
    return (
        <Box 
            bg={props.sender === "user" ? "blue.500" : "gray.300"} 
            color={props.sender === "user" ? "white" : "black"} 
            alignSelf={props.sender === "user" ? "flex-end" : "flex-start"} 
            borderRadius="md" 
            p={2} 
            mb={2}
            maxWidth="70%"
        >
            <Text fontSize="sm">{props.content}</Text>
        </Box>
    );
}

export default Message;
