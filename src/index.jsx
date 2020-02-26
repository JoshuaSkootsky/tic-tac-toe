import React from 'react'
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
// TODO refactor this as a functional component
const Board = props => {
  // render square utility function
  function renderSquare(i) {
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

// component #3
class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      XisNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice() // refactor this to use [...]
    if (calculateWinner(squares) || squares[i]) {
      return // do nothing on this click
    }
    squares[i] = this.state.XisNext ? 'X' : 'O'
    // add to history
    // TODO refactor this .concat([ { squares }])
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      XisNext: !this.state.XisNext, // change X state
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
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

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'))
