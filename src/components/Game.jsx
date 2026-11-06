// import hooks
import { useState } from "react";

// import components
import Board from "./Board";

// game function
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // handle play function
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // jump to function
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Reset game function
  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  // map through history and create a list of moves
  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="gamee">
      {/* Game board */}
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          resetGame={resetGame}
        />
      </div>

      {/* Game info */}
      <div className="game-info">
        <ul>{moves}</ul>
      </div>
    </div>
  );
}