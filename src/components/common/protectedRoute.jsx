import React from "react";
import { toast } from "react-toastify";
import { Route, Redirect } from "react-router";
import { getCurrentUser } from "../../services/auth";

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
  if (!getCurrentUser()) {
    toast.error("Please Login!");
    return <Redirect from={path} to="/" />;
  }
  return <Route {...rest} component={Component} />;
};

export default ProtectedRoute;
