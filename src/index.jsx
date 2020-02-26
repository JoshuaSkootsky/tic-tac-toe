import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { calculateWinner } from './utils';

//component number one.
const Square = ({ onClick, value }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

// component #2
// TODO refactor this as a functional component
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// component #3
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      XisNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return; // do nothing on this click
    }
    squares[i] = this.state.XisNext ? 'X' : 'O';
    // add to history
    // TODO refactor this .concat([ { squares }])
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      XisNext: !this.state.XisNext, // change X state
    });
  }

  render() {
    // calculate
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    // this move list will be displayed later
    const moves = history.map((step, move) => {
      // move variable is the move #, i.e. move #2, #3, ...
      // it is the index of the map
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.XisNext ? 'X' : 'O');
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
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));