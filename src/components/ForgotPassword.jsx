import React from "react";
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
import { toast } from "react-toastify";

class ForgotPassword extends Form {
  state = {
    data: {},
    error: "",
  };

  doSubmit = async () => {
    const values = {
      ...this.state.data,
      clientUrl: process.env.REACT_APP_CLIENT_URL,
    };

    try {
      const { data } = await http.post("/users/resetPassword", values);
      this.setState({ error: "" });
      toast.success(data);
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
            <Title>Forgot Password</Title>
            <h5 className="text-center">Enter email associated with account</h5>
            <form onSubmit={this.handleSubmit}>
              {error && (
                <FormError>
                  <FormErrorMessage className="m-0">{error}</FormErrorMessage>
                </FormError>
              )}
              {this.renderInput("email", "Email Address", "email")}
              {this.renderButton("submit", "Submit")}
            </form>
          </Wrapper>
        </Container>
      </Body>
    );
  }
}

export default ForgotPassword;
