import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { calculateWinner } from './utils'

//component number one.
const Square = ({ onClick, value }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
)

// component #2
const Board = props => {
  // render square utility function
  const renderSquare = i => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />
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

// component #3 - refactor with State Hooks
const Game = props => {
  // need history, state, and XisNext state
  // instead of constructor, initialize hooks
  const [stepNumber, setStepNumber] = useState(0)
  const [history, setHistory] = useState([{ squares: [] }])
  const [XisNext, setXisNext] = useState(true)

  const handleClick = i => {
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

  const jumpTo = step => {
    setStepNumber(step)
    setXisNext(step % 2 === 0)
  }
  // this move list will be displayed later
  const moves = history.map((step, move) => {
    // move variable is the move #, i.e. move #2, #3, ...
    // it is the index of the map
    const desc = move ? 'Go to move #' + move : 'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
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
        <Board squares={current.squares} onClick={i => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
/*
class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: [],
        },
      ],
      stepNumber: 0,
      XisNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = [...current.squares]
    if (calculateWinner(squares) || squares[i]) {
      return // do nothing on this click
    }
    squares[i] = this.state.XisNext ? 'X' : 'O'
    // add a new squares object
    this.setState({
      history: history.concat([{ squares }]),
      stepNumber: history.length,
      XisNext: !this.state.XisNext, // change X state
    })
  }

  jumpTo(stepNumber) {
    this.setState({
      stepNumber,
      xIsNext: stepNumber % 2 === 0,
    })
  }

  render() {
    // calculate
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)
    // this move list will be displayed later
    const moves = history.map((step, move) => {
      // move variable is the move #, i.e. move #2, #3, ...
      // it is the index of the map
      const desc = move ? 'Go to move #' + move : 'Go to game start'
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.XisNext ? 'X' : 'O')
    }
    // display
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}
*/

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'))
