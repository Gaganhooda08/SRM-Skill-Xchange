
import React from "react";
import { auth } from "./firebase/firebase";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  return auth.currentUser ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
