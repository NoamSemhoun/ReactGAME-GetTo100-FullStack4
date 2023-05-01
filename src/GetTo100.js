import React, { Component } from "react";
import Game from "./Game";
import PlayerList from "./PlayerList";
import "./GetTo100.css";

import Monlogo from './Images/Get_to_100-removebg-preview.png';


class GetTo100 extends Component {
  constructor(props) {
    // DEFINIT LE STATE INITIAL DU COMPOSANT
      // L'état comprend un tableau de joueurs, un index du joueur actif
      // et le nombre de pas effectués jusqu'à présent.

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
//  Le constructeur lit également à partir du localStorage pour récupérer les données des utilisateurs 
//et initialise les scores des joueurs de manière aléatoire.



// MET A J LE SCORE DU JOUEUR ET FAIT AVANCER LE TOUR AU TOUR SUIVNT
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

 

// GERE LA FIN DU JEU     SI UN JOUEUR GAGNE
  handleWinnig = (winner, steps) => {
    let users = [];
    let usersJson = localStorage.getItem("users100");
    if (usersJson) {
      users = JSON.parse(usersJson);
    } else {
      localStorage.setItem("users100", JSON.stringify([]));
    }
    // LI LE LOCAL STORAGE ET RECUP LES DONNE DU USER 
    const userIndex = users.findIndex((user) => user.username === winner);

    if (userIndex > -1) {
      users[userIndex].games.push(this.state.steps);
      // M A J Lhistorique du gagnant
    }
    localStorage.setItem("users100", JSON.stringify(users));
    if ( window.confirm( winner + " win :)" + " with " +  steps + " trials." +
          "\nDo you want to play again?"
      ) === true ) {
        // PROPOSE UNE NOUVEL PARTIE 
      this.props.playAgain();
    } else {
      this.props.endGame();
    }
  };

  render() {
    const { players, activePlayerIndex } = this.state;
// La méthode de rendu du composant renvoie un div qui contient deux composants enfants, Game et PlayerList.
// ILS RECOIVENT POAS LES MM DONNE ET TABLEAUX
    return (
      <div className="get_to100">


        <div className="barHaut">

                  <img className="monimage" src = {Monlogo} alt="okkk"   />      
                  <button className="exitButton" onClick={ this.props.endGame }>Exit</button>
                {/* // PARAMATRER LE BOUTON  */}
        </div>
      
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


      </div>
      
    );
  }
}

export default GetTo100;
