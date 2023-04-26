import React, { Component } from "react";
// import CartIcon from "../src/media/kubiya.jpg";

class Game extends Component {
  handleGameCompletion = () => {
    //Son Function
    const { players, activePlayerIndex } = this.props;
    this.props.winnig(players[activePlayerIndex].name, this.props.steps);
  };

  handleAction = (action) => {
    const { setActivePlayerIndex, score } = this.props;

    let newScore;
    switch (action) {
      case "+1":
        newScore = score + 1;
        break;
      case "-1":
        newScore = score - 1;
        break;
      case "*2":
        newScore = score * 2;
        break;
      case "/2":
        newScore = Math.floor(score / 2);
        break;
      default:
        return;
    }

    if (newScore === 100) {
      this.handleGameCompletion();
    } else {
      setActivePlayerIndex(newScore);
    }
  };

  render() {
    const { players, activePlayerIndex } = this.props;
    const activePlayer = players[activePlayerIndex];

    return (
      <div className="game">
        {/* <img className="kubiyaR" src={CartIcon} />
        <img className="kubiyaL" src={CartIcon} /> */}
         <div className="info">
          <div className="active-player">{activePlayer.name}'s turn to play</div>
        </div>
        <div className="score">{this.props.score}</div>
        <div className="actions">
          <button onClick={() => this.handleAction("+1")}>+1</button>
          <button onClick={() => this.handleAction("-1")}>-1</button>
          <button onClick={() => this.handleAction("*2")}>*2</button>
          <button onClick={() => this.handleAction("/2")}>/2</button>
        </div>
                 <p className="steps">trials : {this.props.steps} </p>

      </div>
    );
  }
}

export default Game;
