// FeedbackModal.jsx
import React, { useState } from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, 
    ModalBody, ModalFooter, Text, Box, FormControl, FormLabel, Textarea, Button,Select
} from "@chakra-ui/react";

import { FaRegStar, FaStar } from 'react-icons/fa';

function FeedbackModal({ isOpen, onClose, onSubmit }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [feedbackReason, setFeedbackReason] = useState('taste')
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Feedback</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text mb={2}>Rate our service:</Text>
                    <Box display="flex" mb={4}>
                        {[1, 2, 3, 4, 5].map(value => (
                            <Box
                                as={rating >= value ? FaStar : FaRegStar}
                                cursor="pointer"
                                onClick={() => setRating(value)}
                                size="24px"
                                color={rating >= value ? "yellow.400" : "gray.400"}
                                mx={1}
                            />
                        ))}
                    </Box>
                    <FormControl>
                        <FormLabel>Comments:</FormLabel>
                        <Textarea 
                            placeholder="Let us know your thoughts" 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                <FormLabel>Reason:</FormLabel>
                <Select value={feedbackReason} onChange={e => setFeedbackReason(e.target.value)}>
                    <option value="taste">Taste</option>
                    <option value="service">Service</option>
                </Select>
            </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={() => {onSubmit(rating, comment); onClose();}}>
                        Submit
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default FeedbackModal;
