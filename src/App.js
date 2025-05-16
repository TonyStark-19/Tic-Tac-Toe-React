// import style sheet
import './App.css';

// import react usestate hook
import { useState } from 'react';

// main page of app
export default function MainPage() {
  return (
    <>
      <div className='heading'>
        <h1>Tic Tac Toe</h1>
      </div>

      <div className="container">
        <div className="board">
          <Game />
        </div>
      </div>
    </>
  )
}

// square box function
function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>
    {value}
  </button>;
}

// board function
function Board({ xIsNext, squares, onPlay, resetGame }) {

  function handleClick(i) {

    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  // winner
  const winner = calculateWinner(squares);
  // board is full or not
  const isBoardFull = !squares.includes(null);

  let status;
  if (winner) {
    status = "Congratulaitons!! The winner is " + winner;
  } else if (isBoardFull) {
    status = "Oops!! We have a tie game!";
  } else {
    status = "Next player : " + (xIsNext ? "X" : "O");
  }

  return (
    <>

      {!winner && !isBoardFull && (
        <div className='game'>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />

          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />

          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      )}

      <div className="status">{status}</div>

      {!winner && !isBoardFull && (
        <div className="reset-btn">
          <button onClick={resetGame}>Reset game</button>
        </div>
      )}

      {(winner || isBoardFull) && (
        <div className="new-game-btn">
          <button onClick={resetGame}>New game</button>
        </div>
      )}

    </>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Reset game function
  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="gamee">

      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} resetGame={resetGame} />
      </div>

      <div className="game-info">
        <ul>{moves}</ul>
      </div>
    </div>
  );
}

// calculate function 
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}