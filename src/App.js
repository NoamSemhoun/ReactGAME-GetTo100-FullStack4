// import "./App.css"; SERT A RIEN


import React, { Component } from "react";
import GetTo100 from "./GetTo100";
import Login from "./Login";
import Signup from "./Signup";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { page: "signup", loggedInUsers: [] };
  }

  handleChangePage = (page) => {
    this.setState({
      page,
    });
  };
  handleChangeUsers = (loggedInUsers) => {
    this.setState({ loggedInUsers });
  };
  handleEndGame = () => {
    this.handleChangeUsers([]);
    this.handleChangePage("login");
  };
  render() {
    if (this.state.page === "login") {
      return (
        <Login
          login={() => this.handleChangePage("game")}
          changeUsers={this.handleChangeUsers}
          loggedInUsers={this.state.loggedInUsers}
          signup={() => this.handleChangePage("signup")}
        />
      );
    } else if (this.state.page === "signup") {
      return <Signup login={() => this.handleChangePage("login")} />;
    } else if (this.state.page === "game") {
      return (
        <GetTo100
          key={Date.now()}
          users={this.state.loggedInUsers}
          playAgain={() => this.handleChangePage("game")}
          endGame={this.handleEndGame}
        />
      );
    }
    return null;
  }
}

export default App;
