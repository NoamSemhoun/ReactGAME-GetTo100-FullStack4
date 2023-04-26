import React, { Component } from "react";
class Player extends Component {
  //   handleLeaveSystem = () => {
  //     this.props.onLeaveSystem();
  //   };

  render() {
    const { name, score, active } = this.props;
    let class_active = "";
    if (active) {
      class_active = "class_active";
    }
    return (
      <li className={class_active}>
        <span className="player_score">
          {name}:  {score}
        </span>
        <h3>
          Player's games: {this.props.games.join()}
        </h3>
      </li>
    );
  }
}
export default Player;
