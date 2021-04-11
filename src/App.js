import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import TodoList from "./components/TodoList/TodoList";
import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Switch>
        <ProtectedRoute path="/todolist" component={TodoList} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Home} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
