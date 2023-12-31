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

const RequireAuth = ({ children }) => {
    let location = useLocation();
    if (!Userfront.tokens.accessToken) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }

export default RequireAuth;