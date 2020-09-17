import React, { Component } from "react";
import { login } from "./UserFunctions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
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
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    login(user).then(res => {
      this.props.history.push(`/`);

      console.log("lahcen", res);
    });
  }

  render() {
    return (
      // <div className="container">
      //     <div className="row col-md-6">
      <form
        noValidate
        onSubmit={this.onSubmit}
        className="col-md-12 justify-content-center"
      >
        <h1 className="h3 mb-3 font-weight-normal">Please Sign In</h1>

        <div className="form-group">
          <label htmlFor="email"> Email Address</label>
          <input
            type="email"
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
            placeholder="Enter Email"
            value={this.state.password}
            onChange={this.onChange}
          />
        </div>

        <button type="submit" className="btn btn-lg btn-primary btn-block">
          Sign In
        </button>
      </form>
      //     </div>
      // </div>
    );
  }
}

export default Login;
