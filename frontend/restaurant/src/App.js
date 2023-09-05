import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import ChatWindow from './Pages/ChatWindow';
import NotificationsPage from './Pages/NotificationPage';
import AuthForm from './Pages/Auth';
import AllRoute from './Components/AllRoutes';
import Navbar from './Components/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
     let id=JSON.parse(localStorage.getItem("userId"))
  let url = "https://zomatoapp-18pi.onrender.com";
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
    // WebSocket Setup
    useEffect(() => {
        const ws = new WebSocket("wss://zomatoapp-18pi.onrender.com/ws/notifications/");
        
        ws.onopen = () => {
            console.log("WebSocket connection established.");
        };
        
        ws.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            
            if(data && data.type === 'order_status') {
                // Update local state
                setNotifications(prev => [...prev, data.message]);
                
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
            setTimeout(() => {
                setSocket(new WebSocket("wss://zomatoapp-18pi.onrender.com/ws/notifications/"));
            }, 5000);  // Try to reconnect every 5 seconds
        };
        
        setSocket(ws);

        return () => {
            ws.close();
        };

    }, []);
  return (
    <div className="App" >
    <Navbar/>
    <AllRoute/>
    </div>
  );
}

export default App;
