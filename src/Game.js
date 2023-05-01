import React, { Component } from "react";
// import CartIcon from "../src/media/kubiya.jpg";
// Ce code définit une classe React appelée "Game" qui étend la classe Component
// plusieurs fonctions qui sont déclenchées en réponse à des événements de clic 

class Game extends Component {
  handleGameCompletion = () => {
    //Son Function  Si le score est égal à 100, 
    const { players, activePlayerIndex } = this.props;
    this.props.winnig(players[activePlayerIndex].name, this.props.steps);
    // affiche une notification de victoire et enregistre les scores du joueur. 
  };
 
  // met à jour le score du joueur actif
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
      setActivePlayerIndex(newScore);  // FIN DU GAME Si le score est égal à 100, 
    }
  };

  render() {
    const { players, activePlayerIndex } = this.props;
    const activePlayer = players[activePlayerIndex];

    return (   // INTERFACE USER
      <div className="game">
      
         <div className="info">

          <div className="active-player">{activePlayer.name}'s turn to play</div>
         <h3>
          Scores History:   {activePlayer.games.join()} 
        </h3>

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
// Enfin, le composant "GAME" est exporté pour être utilisé dans d'autres parties de l'application.

