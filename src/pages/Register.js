import React, { Component } from "react";
import { register } from "./UserFunctions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firt_name: "",
      last_name: "",
      email: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.first_name + " " + this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };

    register(newUser).then(res => {
      this.props.history.push(`/`);
    });
  }

  render() {
    return (
      // <div className="container">
      //     <div className="row ">
      <form
        noValidate
        onSubmit={this.onSubmit}
        className="col-md-12 justify-content-center"
      >
        <h1 className="h3 mb-3 font-weight-normal">Register</h1>

        <div className="form-group">
          <label htmlFor="first_name">Fist Name</label>
          <input
            type="text"
            className="form-control"
            name="first_name"
            placeholder="Enter First Name"
            value={this.state.first_name}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="last_name"
            placeholder="Enter Last Name"
            value={this.state.last_name}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Enter Email"
            value={this.state.email}
            onChange={this.onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password"> Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChange}
          />
        </div>

        <button type="submit" className="btn btn-lg btn-primary btn-block">
          Sign In
        </button>
      </form>
      // </div>
      // </div>
    );
  }
}

export default Register;
