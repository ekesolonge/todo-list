import React from "react";
import { Link } from "react-router-dom";
import {
  Body,
  Container,
  Wrapper,
  Title,
  FormError,
  FormErrorMessage,
} from "./GlobalStyles";
import http from "../services/http";
import Form from "./common/Form";

class Login extends Form {
  state = {
    data: {},
    error: "",
  };

  doSubmit = async () => {
    const user = this.state.data;
    try {
      const { data: token } = await http.post("/users/login", user);
      localStorage.setItem("token", token);
      window.location = "/todolist";
    } catch (error) {
      if (error.response) this.setState({ error: error.response.data });
    }
  };

  render() {
    const { error } = this.state;

    return (
      <Body>
        <Container>
          <Wrapper>
            <Title>Sign In</Title>
            <div className="d-flex align-content-center justify-content-end">
              <small className="m-0">
                Don't have an account?
                <Link to="/"> Sign up</Link>
              </small>
            </div>
            <form onSubmit={this.handleSubmit}>
              {error && (
                <FormError>
                  <FormErrorMessage className="m-0">{error}</FormErrorMessage>
                </FormError>
              )}
              {this.renderInput("username", "Username/Email Address")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("rememberMe", "Remember Me", "checkbox")}
              {this.renderButton("submit", "Login")}
            </form>
          </Wrapper>
        </Container>
      </Body>
    );
  }
}

export default Login;
