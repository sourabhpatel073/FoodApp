import { useState } from 'react';
import { Box, Input, Button, VStack, Text, Heading, useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

function AuthForm() {
    const navigate = useNavigate();
const [isSignup, setIsSignup] = useState(false);
let url = "https://zomatoapp-18pi.onrender.com";
const toast = useToast();

// Individual states for each field
const [name, setName] = useState("");
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSignup = () => {
    fetch(`${url}/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password }),
    })
    .then(response => 
        response.json(),
        toast({
            title: "Success",
            description: "Signup successful",
            status: "success",
            duration: 4000,
            isClosable: true,
        })
        
        )
       
       
    
    .then(data => {
        console.log(data)
        toast({
            title: "Success",
            description: "Signup successful",
            status: "success",
            duration: 4000,
            isClosable: true,
        });
    })
    .catch(error => {
        console.error('Error:', error);
        toast({
            title: "Error",
            description: "Signup failed",
            status: "error",
            duration: 4000,
            isClosable: true,
        });
    });
};

const handleLogin = () => {
    fetch(`${url}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user_id);
            toast({
                title: "Success",
                description: "Login successful",
                status: "success",
                duration: 4000,
                isClosable: true,
            });
            navigate("/home");
        } else {
            throw new Error("Login failed");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        toast({
            title: "Error",
            description: "Please signup, email not found",
            status: "error",
            duration: 4000,
            isClosable: true,
        });
    });
};

const handleFormSubmit = () => {
    if (isSignup) {
        handleSignup();
    } else {
        handleLogin();
    }
};

const toggleMode = () => {
    setIsSignup(!isSignup);
};


    return (
        <Box  backgroundImage={"url(https://img.freepik.com/free-vector/vector-abstract-background-design-wavy_2065-269.jpg?size=626&ext=jpg&ga=GA1.2.1006803127.1692534947&semt=ais)"} maxH="85vh" overflowY="auto" minH={"600px"}>
        <Box width={["300px","350px","400px"]} margin="0 auto" pt={["2rem", "4rem", "5rem"]} color={"white"}>
            <VStack spacing={4}>
                <Heading size="lg">{isSignup ? "Signup" : "Login"}</Heading>
                
                {isSignup && (
                    <>
                        <Input 
                            placeholder="Name" 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input 
                            placeholder="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </>
                )}
    
                <Input 
                    placeholder="Email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
    
                <Input 
                    placeholder="Password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
    
                <Button colorScheme="blue" width="100%" onClick={handleFormSubmit}>
                    {isSignup ? "Signup" : "Login"}
                </Button>
    
                <Text fontSize="1rem">
                    {isSignup ? "Already have an account?" : "Don't have an account?"}
                    <span style={{ color: 'yellow', cursor: 'pointer', fontSize: "1rem" }} onClick={toggleMode}>
                        {isSignup ? " Login" : " Signup"}
                    </span>
                </Text>
            </VStack>
        </Box>
    </Box>
    
    );
}

export default AuthForm;
