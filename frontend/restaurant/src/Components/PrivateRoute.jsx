import { Route, Navigate, useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
    let nav=useNavigate()
    let isAuthenticated =JSON.parse(localStorage.getItem("token") )/* logic to check if user is authenticated */


    if(!isAuthenticated){return  <Navigate to="/"/>}
    return (
       children
    );
}

export default PrivateRoute