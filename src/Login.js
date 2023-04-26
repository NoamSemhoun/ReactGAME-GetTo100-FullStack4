import React, { Component } from "react";
import "./Login.css";
// import CartIcon from "../src/media/kubiya.jpg";

class Login extends Component {
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
      //loggedInUsers: [],
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

  handleLogin = (event) => {
    event.preventDefault();

    const { password, users } = this.state;
    let username = this.state.username.trim();
    const { loggedInUsers } = this.props;
    const user = users.find((user) => user.username === username);

    if (user && user.password === password) {
      if (loggedInUsers.indexOf(username) === -1) {
        this.props.changeUsers([...loggedInUsers, username]);
      }

      this.setState({
        username: "",
        password: "",
      });
    } else {
      this.setState({
        error: "Invalid username or password",
      });
    }
  };

  handleLogout = (username) => {
    const { loggedInUsers } = this.props;
    const index = loggedInUsers.indexOf(username);

    if (index !== -1) {
      loggedInUsers.splice(index, 1);
      this.props.changeUsers([...loggedInUsers]);
    }
  };

  handleLoginAll = () => {
    const num = this.props.loggedInUsers.length;
    if (num < 1 ) {
      alert("Please Register minimum 1 player to Play ");

    } 
    else if(num > 4){
      alert("Maximum 4 players ! Please Delete players to Play. ");
    }
    
    else {
      this.props.login();
    }
  };

  render() {
    const { username, password, error } = this.state;
    const { loggedInUsers } = this.props;

    return (
      <div className="class_login">
            <h3>WELCOME TO GAME Get To 100 ! </h3> 
        {/* <img className="kubiyaR" src={CartIcon} />
        <img className="kubiyaL" src={CartIcon} /> */}
        <div className="flex_continer">
          
          <form className="form_login" onSubmit={this.handleLogin}>
              <h1 className="Header">New Game</h1>

          <h3>Login </h3> 

            <h5> Please Login each player to Register for the Game : </h5>
            <div>
              <label className="lable_username" htmlFor="username">Username : </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <label className="lable_password" htmlFor="password">Password : </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
              />
            </div>   
                     <div>{error}</div>

            <button className="button_login" type="submit">Login</button>
            <button className="button_sign_up" onClick={this.props.signup}>Sign Up</button>

          </form>


          <div className="Logged_in_users">
            <h4>Registered players :</h4>
            <ul className="Registered">
              {loggedInUsers.map((username) => (
                <li key={username}>
                  {username} {" "}
                  <button className="DeleteButton" onClick={() => this.handleLogout(username)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <button className="button_enter" onClick={this.handleLoginAll}>Play Game</button>

          </div>
        </div>
        <div className="buttons_flex_contiener">
        </div>
      </div>
    );
  }
}

export default Login;
