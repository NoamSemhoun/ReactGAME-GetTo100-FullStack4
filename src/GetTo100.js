import React, { Component } from "react";
import Game from "./Game";
import PlayerList from "./PlayerList";
import "./GetTo100.css";

class GetTo100 extends Component {
  constructor(props) {
    super(props);

    let users = [];
    let usersJson = localStorage.getItem("users100");
    if (usersJson) {
      users = JSON.parse(usersJson);
    } else {
      localStorage.setItem("users100", JSON.stringify([]));
    }
    console.log(users);
    this.state = {
      players: this.props.users.map((user) => ({
        name: user,
        score: Math.floor(Math.random() * 99) + 1,
        games: users.find((u) => u.username === user).games,
      })),
      activePlayerIndex: 0,
      steps: 1,
    };
  }

  setActivePlayerIndex = (newScore) => {
    this.setState((oldState) => {
      const { activePlayerIndex } = oldState;
      const players = JSON.parse(JSON.stringify(oldState.players));
      players[activePlayerIndex].score = newScore;
      const nextActivePlayerIndex = (activePlayerIndex + 1) % players.length;
      let s = oldState.steps;
      if (nextActivePlayerIndex === 0) {
        s = oldState.steps + 1;
      }
      return { activePlayerIndex: nextActivePlayerIndex, players, steps: s };
    });
  };

  handleWinnig = (winner, steps) => {
    let users = [];
    let usersJson = localStorage.getItem("users100");
    if (usersJson) {
      users = JSON.parse(usersJson);
    } else {
      localStorage.setItem("users100", JSON.stringify([]));
    }
    const userIndex = users.findIndex((user) => user.username === winner);

    if (userIndex > -1) {
      users[userIndex].games.push(this.state.steps);
    }
    localStorage.setItem("users100", JSON.stringify(users));
    if (
      window.confirm(
        winner +
          " won!!!!:)" +
          " with " +
          steps +
          " steps." +
          "\nDo you want to play again?"
      ) == true
    ) {
      this.props.playAgain();
    } else {
      this.props.endGame();
    }
  };

  render() {
    const { players, activePlayerIndex } = this.state;

    return (
      <div className="get_to100">
        <h1 className="Header">Get to 100</h1>
        <div className="flex_continer">
          {/* lien vers le fichier JS  */}
         
          <Game
            players={players}
            activePlayerIndex={activePlayerIndex}
            setActivePlayerIndex={this.setActivePlayerIndex}
            score={this.state.players[this.state.activePlayerIndex].score}
            steps={this.state.steps}
            winnig={this.handleWinnig}
          />
           <PlayerList
            players={players}
            activePlayerIndex={this.state.activePlayerIndex}
          />
        </div>

        <button onClick={this.props.login}>Exit</button>

      </div>
      
    );
  }
}

export default GetTo100;
