// ChatWindow.js

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Box, Input, Button, VStack, HStack, Flex ,Text} from '@chakra-ui/react';
import Message from '../Components/Message';

function ChatWindow() {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const [userInput, setUserInput] = useState('');
    const messagesEndRef = useRef(null);
   let url="https://zomatoapp-18pi.onrender.com"
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    // ... rest of your functions (handleInputChange, sendMessage) remain the same ...
    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    }

    const sendMessage = async () => {
        setIsTyping(true);

        setTimeout(async() => {
            setIsTyping(false);
            // Your send message logic here
            const userMessage = userInput;
        setMessages([...messages, { sender: 'user', content: userMessage }]);
        
        try {
            const response = await axios.post(`${url}/chatbot/`, { message: userMessage });
            const botReply = response.data.response;
            setMessages([...messages, { sender: 'user', content: userMessage }, { sender: 'bot', content: botReply }]);
        } catch (error) {
            console.error("Error sending message:", error);
        }

        setUserInput('');
        }, 2000);

        
    }

    return (
        <Box backgroundColor={'black'} maxH="85vh" overflowY="auto" minH={"600px"}>
            <VStack spacing={4} w="60%" minHeight="500px" border="1px" borderColor="gray.200" borderRadius="md" p={4} boxShadow="lg" margin={"auto"} backgroundImage={"url(https://img.freepik.com/premium-photo/digital-chatbot-robot-application-conversation-assistant-ai-artificial-intelligence-concept_43780-5925.jpg?w=900)"}>
        <Text>Ask Me About Help</Text>
            <Flex direction="column" flex="1" overflowY="auto">
                {messages.map((message, index) => (
                    <Message key={index} sender={message.sender} content={message.content} />
                ))}
                <div ref={messagesEndRef}></div>
                {isTyping && <Text color={"green"} fontWeight={"extrabold"} fontSize={"xl"}>Typing...</Text>}

            </Flex>
            <HStack width="100%">
                <Input flex="1" variant="filled" value={userInput} onChange={handleInputChange} placeholder="Type a message..." />
                <Button colorScheme="blue" onClick={sendMessage}>Send</Button>
            </HStack>
        </VStack>
        </Box>
    );
}

export default ChatWindow;
