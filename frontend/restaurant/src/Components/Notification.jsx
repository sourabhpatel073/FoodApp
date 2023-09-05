// NotificationItem.js

import React from 'react';
import { Box, Text, CloseButton } from '@chakra-ui/react';

function NotificationItem({ message, timestamp, onDelete }) {
    return (
        <Box 
            bg="gray.200" 
            borderRadius="md" 
            p={3} 
            mb={2} 
            display="flex" 
            justifyContent="space-between"
            alignItems="center"
        >
            <Text fontSize="lr" fontWeight={"extrabold"}>{message} (at {new Date(timestamp).toLocaleTimeString()})</Text>
            <CloseButton onClick={onDelete} />
        </Box>
    );
}

export default NotificationItem;
