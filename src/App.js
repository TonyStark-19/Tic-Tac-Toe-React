// import style sheet
import './App.css';

// import components
import Game from './components/Game';

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