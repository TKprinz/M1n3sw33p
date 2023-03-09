import React from "react";
import Cell from "./Cell"; // Importerar Cell från Cell.jsx så Cellen kan användas i renderingen.
import createBoard from "./utils"; // Importerar createBoard från utils som blir mitt spelbräde.

class Board extends React.Component {
  // Startar direkt när applikationen laddas.
  constructor(props) {
    super(props);
    // Skapar ett objekt som har 25celler och 7minor och lagt in boolean för förlust och vid vinst.
    this.state = {
      board: createBoard(25, 7),
      gameBomb: false,
      gameChamp: false,
    };
    // Bindar mina buttons för att det ska fungera i renderingen och i staten.
    this.cellClick = this.cellClick.bind(this);
    this.startOver = this.startOver.bind(this);
  }

  // Funktionen körs när en spelare klickar på en spelruta.
  cellClick(i) {
    // Om spelet redan har förlorats på grund av att en bomb har klickats på, avbryt funktionen.
    if (this.state.gameBomb) {
      return;
    }
    // Skapa en kopia av den synliga spelplanen.
    const visibleBoard = [...this.state.board];
    // Markera den klickade rutan som synlig.
    visibleBoard[i].visible = true;
    // Om den klickade rutan innehåller en bomb, markera att spelet har förlorats.
    if (visibleBoard[i].hasMine) {
      this.setState({ gameBomb: true });
    } else {
      // Annars, uppdatera spelplanen och kolla om spelaren har vunnit.
      this.setState({ board: visibleBoard });
      this.allCellClicked();
    }
    // Om spelet har förlorats, ladda om sidan så att användaren kan spela igen.
    if (this.state.gameBomb) {
      window.location.reload();
    }
    //  console.log(this.state.board);
  }

  // En funktion som säger när alla celler utan miner = vinst.
  allCellClicked() {
    const noBombLeft = this.state.board.filter((cell) => !cell.hasMine);
    if (noBombLeft.every((cell) => cell.visible)) {
      this.setState({ gameChamp: true });
    }
  }
  // Skapat en funktion som används till när spelet är avslutat och att det ska startas om.
  startOver() {
    this.setState({
      board: createBoard(25, 7),
      gameBomb: false,
      gameChamp: false,
    });
  }

  render() {
    return (
      <div>
        <h1 className="titel">M1n3sw33p_1337</h1>
        <div className="board">
          {/* Skapar en cell-komponent för varje objekt. */}
          {this.state.board.map((cell, index) => {
            return <Cell cell={cell} key={index} onClick={this.cellClick} />;
          })}
        </div>

        {/* När man hamnar på en bomb så visas detta. */}
        {this.state.gameBomb && (
          <div className="gameLost">
            <h3>Game Over!</h3>
            <button onClick={this.startOver}>Play again</button>
          </div>
        )}
        {/* Ifall man vinner så visas detta. */}
        {this.state.gameChamp && (
          <div className="gameWon">
            <h3>Congratz, you won!</h3>
            <button onClick={this.startOver}>Play again Champ</button>
          </div>
        )}
      </div>
    );
  }
}

export default Board;
