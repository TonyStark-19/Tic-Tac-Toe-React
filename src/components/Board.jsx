// import components
import Square from "./Square";
import calculateWinner from "./calculateWinner";

// board function
export default function Board({ xIsNext, squares, onPlay, resetGame }) {
  // handle click function
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

  // status message
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