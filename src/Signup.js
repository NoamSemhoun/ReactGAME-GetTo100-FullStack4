import React, { Component } from "react";
import "./SignUp.css";
// import CartIcon from "../src/media/kubiya.jpg";

class Signup extends Component {
  constructor(props) {
    super(props);
    let users = [];
    let usersJson = localStorage.getItem("users100");
    if (usersJson) {
      users = JSON.parse(usersJson);
    } else {
      localStorage.setItem("users100", JSON.stringify([]));
    }
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      users,
      error: "",
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      error: "",
    });
  };

  handleSignup = (event) => {
    event.preventDefault();

    const { password, confirmPassword, users } = this.state;
    let username = this.state.username.trim();

    if (password !== confirmPassword) {
      this.setState({
        error: "Passwords do not match",
      });
      return;
    }

    if (username.length < 3) {
      this.setState({
        error: "Enter a username of at least 3 characters",
      });
      return;
    }
    if (password.length < 5) {
      this.setState({
        error: "Enter a password of at least 5 characters",
      });
      return;
    }

    const userExists = users.find((user) => user.username === username);

    if (userExists) {
      this.setState({
        error: "Username already exists",
      });
      return;
    }

    const newUser = {
      username: username,
      password: password,
      games: [],
    };

    this.setState(
      (oldState) => ({
        users: [...oldState.users, newUser],
        username: "",
        password: "",
        confirmPassword: "",
        error: "You have successfully registered!",
      }),
      () => {
        localStorage.setItem("users100", JSON.stringify(this.state.users));
      }
    );
  };

  render() {
    const { username, password, confirmPassword, error } = this.state;

    return (
      <div className="class_SignUp">
        <h3>WELCOME TO GAME Get To 100 ! </h3> 
        <h1 className="Header">Sign Up</h1>
     
     
        <form onSubmit={this.handleSignup}>
          <h5>Create a new Username and Password: </h5>
          <ul className="list">
            <li className="class_username">
              <label htmlFor="username">Username : </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={this.handleInputChange}
              />
            </li>
            <li className="class_password">
              <label htmlFor="password">Password : </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
              />
            </li>
            <li className="class_confirmPassword">
              <label htmlFor="confirmPassword">Confirm Password : </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleInputChange}
              />
            </li>
          </ul>
          <div>{error}</div>

          <div class="boutons-container">


            <button className="submit" type="submit">
              Sign Up    </button>
    
            <button onClick={this.props.login}>Log In</button>
         </div>

        </form>
      </div>
    );
  }
}

export default Signup;
