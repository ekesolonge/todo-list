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
import jwtDecode from "jwt-decode";

class ResetPassword extends Form {
  state = {
    data: {},
    error: "",
    loading: false,
  };

  doSubmit = async () => {
    this.setState({ loading: true });

    const { token } = this.props.match.params;
    const { password, confirmPassword } = this.state.data;

    const { userId } = jwtDecode(token);

    const data = { otp: token, userId, password };
    if (password === confirmPassword) {
      try {
        const { data: response } = await http.post(
          "/users/setNewPassword",
          data
        );

        if (response) this.setState({ loading: false });

        toast.success(response);

        setTimeout(() => {
          window.location = "/login";
        }, 3000);
      } catch (error) {
        if (error.response) this.setState({ error: error.response.data });
      }
    } else {
      this.setState({ error: "Passwords must match" });
    }
  };

  render() {
    const { error } = this.state;

    return (
      <Body>
        <Container>
          <Wrapper>
            <Title>Reset Password</Title>
            <h5 className="text-center">Enter new password</h5>
            <form onSubmit={this.handleSubmit}>
              {error && (
                <FormError>
                  <FormErrorMessage className="m-0">{error}</FormErrorMessage>
                </FormError>
              )}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput(
                "confirmPassword",
                "Confirm Password",
                "password"
              )}
              {this.renderButton("submit", "Submit")}
            </form>
          </Wrapper>
        </Container>
      </Body>
    );
  }
}

export default ResetPassword;
