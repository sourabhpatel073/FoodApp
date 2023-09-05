import React, { useState, useEffect } from 'react';
import NotificationItem from "../Components/Notification";
import { VStack, Box, Heading, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';

function NotificationsPage() {
    let id=JSON.parse(localStorage.getItem("userId"))
    const [notifications, setNotifications] = useState([]);
    const [socket, setSocket] = useState(null);
    const toast = useToast();
    let url = "https://zomatoapp-18pi.onrender.com";
   
    // WebSocket Setup
    useEffect(() => {
        
        const ws = new WebSocket("wss://zomatoapp-18pi.onrender.com/ws/notifications/");
        
        ws.onopen = () => {
            console.log("WebSocket connection established.");
           
        };
        
        ws.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            console.log( console.log(data,"id",id))
            if(data && data.type === 'order_status') {
                // Update local state
                setNotifications(prev => [...prev, data.message]);
                console.log(data)
                // Save to backend
                try {
                    const response = await axios.post(`${url}/save_notification/`, data.message);
                    if(response.status !== 201) {
                        throw new Error("Failed to save notification");
                    }
                } catch (error) {
                    console.error("Error saving notification to the backend:", error);
                }
            }
        };
        
        ws.onerror = (error) => {
            console.error("WebSocket Error:", error);
        };
        
        ws.onclose = () => {
            console.log("WebSocket closed. Attempting to reconnect...");
            console.log(notifications)
            setTimeout(() => {
                setSocket(new WebSocket("wss://zomatoapp-18pi.onrender.com/ws/notifications/"));
            }, 5000);  // Try to reconnect every 5 seconds
        };
        
        setSocket(ws);

        return () => {
            ws.close();
        };

    }, []);

    // Fetch stored notifications from the backend
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${url}/get_notifications/`);
              
                console.log(response.data ,"id",id)
                setNotifications(response.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
                toast({
                    title: "Error fetching notifications.",
                    description: "Please check your connection and try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        };
        
        fetchNotifications();
    }, [toast]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${url}/delete_notification/${id}/`);
            setNotifications(prevNotifs => prevNotifs.filter(notif => notif.id !== id));
            toast({
                title: "Notification Deleted.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Error deleting notification:", error);
            toast({
                title: "Error deleting notification.",
                description: "Please check your connection and try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box backgroundColor={"black"} maxH="85vh" overflowY="auto" minH={"600px"}>
 <VStack spacing={4} w="400px" p={4} margin={"auto"} width={"60%"} minH={"500px"} backgroundImage={"url(https://img.freepik.com/free-psd/reminder-notification-interface-mockup-isolated-objects_103373-1968.jpg?size=626&ext=jpg&ga=GA1.2.1006803127.1692534947&semt=ais)"}>
            <Heading size="lg" mb={4} color={"white"}>Notifications</Heading>

            {notifications.length === 0 ? (
                <Box bg="gray.50" p={6} rounded="md" textAlign="center" width="100%">
                    <Text fontSize="xl" mb={2}>No notifications yet!</Text>
                    <Text color="gray.500">You'll see notifications here as events occur.</Text>
                </Box>
            ) : (
                notifications.map(notif => (
                    <NotificationItem 
                        key={notif.id}
                        message={notif.message}
                        timestamp={notif.timestamp}
                        onDelete={() => handleDelete(notif.id)}
                    />
                ))
            )}
        </VStack>
        </Box>
       
    );
}

export default NotificationsPage;
