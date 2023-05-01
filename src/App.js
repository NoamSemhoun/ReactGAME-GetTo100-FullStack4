// import "./App.css"; SERT A RIEN


import React, { Component } from "react";
import GetTo100 from "./GetTo100";
import Login from "./Login";
import Signup from "./Signup";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { page: "signup", loggedInUsers: [] }; // EN FCT DE LETAT ACTUEL
  }
// 3  fonctions qui modifient l'état STATE 
// en réponse aux événements déclenchés par les autres composants de l'application
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
    if (this.state.page === "login") {  // Lorsque l'état est "login", la page de connexion est affichée,
      return (
        <Login
          login={() => this.handleChangePage("game")}
          changeUsers={this.handleChangeUsers}
          loggedInUsers={this.state.loggedInUsers}
          signup={() => this.handleChangePage("signup")}
        />
      );
    } else if (this.state.page === "signup") {
      //Lorsque l'état est "SIGNUP", la page de SIGN est affichée,
      return <Signup login={() => this.handleChangePage("login")} />;
    } else if (this.state.page === "game") {
      //Et lorsqu'il est "game", la page du jeu est affichée.
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
// Enfin, le composant "App" est exporté pour être utilisé dans d'autres parties de l'application.


