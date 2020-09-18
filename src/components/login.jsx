import React, { Component } from "react";
import Joi from "joi-browser";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {},
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };

  handleChange = (e) => {
    let state = { ...this.state };
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  };

  validate = () => {
    const errors = {};
    // if (this.state.username.trim() === "") {
    //   errors.username = "User Name Is Required";
    // }
    // if (this.state.password.trim() === "") {
    //   errors.password = "Password Is Required";
    // }
    // this.setState({ errors });
    // return Object.keys(errors).length === 0 ? null : errors;

    // by Joi Npm
    const state = { ...this.state };
    delete state.errors;
    const res = Joi.validate(state, this.schema, { abortEarly: false });
    if (res.error === null) {
      this.setState({ errors: {} });
      return null;
    }
    for (const error of res.error.details) {
      errors[error.path] = error.message;
    }
    this.setState({ errors });
    return errors;
  };
  handelSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    if (errors) return;
    //Backend
    console.log("submit");
  };
  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handelSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
              type="text"
              className="form-control"
              id="username"
            />
          </div>
          {this.state.errors.username && (
            <div className="alert alert-danger">
              {this.state.errors.username}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
              className="form-control"
              id="password"
            />
          </div>
          {this.state.errors.password && (
            <div className="alert alert-danger">
              {this.state.errors.password}
            </div>
          )}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
