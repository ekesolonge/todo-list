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

class Home extends Form {
  state = {
    data: {},
    error: "",
  };

  doSubmit = async () => {
    const user = this.state.data;
    try {
      const { headers } = await http.post("/users", user);
      localStorage.setItem("token", headers["x-auth-token"]);
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
            <Title>Create a New Account</Title>
            <form onSubmit={this.handleSubmit}>
              <div className="d-flex align-content-center justify-content-end">
                <small className="m-0">
                  Already have an account?
                  <Link to="/login"> Sign In</Link>
                </small>
              </div>
              {error && (
                <FormError>
                  <FormErrorMessage className="m-0">{error}</FormErrorMessage>
                </FormError>
              )}
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("rememberMe", "Remember Me", "checkbox")}
              {this.renderButton("submit", "Sign Up")}
            </form>
          </Wrapper>
        </Container>
      </Body>
    );
  }
}

export default Home;
