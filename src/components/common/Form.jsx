import React, { Component } from "react";
import Button from "./Button";
import Input from "./Input";

class Form extends Component {
  state = {
    data: {},
    error: "",
    loading: false,
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  renderInput = (name, label, type = "text") => {
    return (
      <Input
        type={type}
        label={label}
        name={name}
        value={this.state.data[name]}
        onChange={this.handleChange}
      />
    );
  };

  renderButton = (type, value) => {
    return <Button type={type} value={value} loading={this.state.loading} />;
  };

  handleSubmit = e => {
    e.preventDefault();

    this.doSubmit();
  };
}

export default Form;
