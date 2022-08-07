import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    // <div
    //   {...rest}
    //   render={props => {
    //     return currentUser ? <Component {...props} /> : <Navigate to="/login" />
    //   }}
    // ></div>

    <>{currentUser ? <Component /> : <Navigate to="/login" />}</>
  );
}
