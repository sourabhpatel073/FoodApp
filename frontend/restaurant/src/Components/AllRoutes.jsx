import {  Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import NotificationsPage from "../Pages/NotificationPage";
import ChatWindow from "../Pages/ChatWindow";
import AuthForm from "../Pages/Auth";
import PrivateRoute from "./PrivateRoute"
import Admin from "../Pages/Admin";
import Feedbacks from "../Pages/AllFeedbacks";
export default function AllRoute() {
    return (
        <Routes>
            <Route path="/" element={<AuthForm/>} />
            <Route path="/auth" element={<AuthForm/>} />
            <Route path="/chat" element={<ChatWindow/>} />
            <Route path="/home" element={<PrivateRoute> <Home/></PrivateRoute>}></Route>
            <Route path="/notifications" element={<PrivateRoute> <NotificationsPage/></PrivateRoute>}></Route>
            <Route path="/admin" element={<Admin/>} />
            <Route path="/feedback" element={<Feedbacks/>} />
        </Routes>
    );
}
