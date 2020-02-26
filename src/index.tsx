import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { calculateWinner } from './utils'

/*
Features todo:

- Type everything with typescript

- Bold the currently selected item in the move list.
- Sort moves desc or ascending order
- When someone wins, highlight the three squares that caused the win.
- When no one wins, display a message about the result being a draw.
*/
//component number one - an individual square

type SquareProps = { onClick: any; value: string }
const Square = ({ onClick, value }: SquareProps) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
)

// component #2
type BoardProps = { onClick: any; squares: string[] }
const Board = ({ onClick, squares }: BoardProps) => {
  // render square utility function
  const renderSquare = (i: number) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

// component #3 - Game
const Game = () => {
  // instead of constructor, initialize state hooks for history, state, and XisNext
  const [stepNumber, setStepNumber] = useState(0)
  const [history, setHistory] = useState([{ squares: Array(9) }])
  const [XisNext, setXisNext] = useState(true)

  const handleClick = (i: number) => {
    setHistory(history.slice(0, stepNumber + 1))

    const current = history[history.length - 1] // get current squares
    const squares = [...current.squares] // make a safe copy
    if (calculateWinner(squares) || squares[i]) {
      return // do nothing on this click
    }
    // update squares copy with current move
    squares[i] = XisNext ? 'X' : 'O'
    // update history
    setHistory(history.concat([{ squares }]))
    setStepNumber(history.length)
    setXisNext(!XisNext)
  }

  const jumpTo = (step: number) => {
    setStepNumber(step)
    setXisNext(step % 2 === 0)
  }
  // this move list will be displayed later
  const moves = history.map((e, i) => {
    const desc = i ? 'Go to move #' + i : 'Go to game start'
    return (
      <li key={i}>
        <button onClick={() => jumpTo(i)}>{desc}</button>
      </li>
    )
  })

  const current = history[stepNumber]
  const winner = calculateWinner(current.squares)

  let status
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (XisNext ? 'X' : 'O')
  }
  // display
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i: number) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'))
