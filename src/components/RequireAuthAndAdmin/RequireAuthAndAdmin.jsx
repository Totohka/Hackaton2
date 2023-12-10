import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import Userfront from "@userfront/toolkit/react";

const RequireAuthAndAdmin = ({ children }) => {
    let location = useLocation();
    if (!Userfront.tokens.accessToken) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    else if(Userfront.tokens.accessToken && !Userfront.user.hasRole("admin")){
      return <Navigate to="/menu" state={{from: location}} replace />
    } 
    return children;
  }

export default RequireAuthAndAdmin;