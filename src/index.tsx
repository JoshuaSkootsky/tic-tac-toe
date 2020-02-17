import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { calculateWinner } from './utils';

//component number one.

// Replace this.state.value with this.props.value in Square’s render method
// Replace this.setState() with this.props.onClick() in Square’s render method
// Delete the constructor from Square because Square no longer keeps track of the game’s state
const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

// component #2
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(' '),
      XisNext: true,
    };
  }

  handleClick(i) {
    const squares = [...this.state.squares];
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    squares[i] = this.state.XisNext ? 'X' : 'O'; // immutable, change a copy
    this.setState({
      squares,
      XisNext: !this.state.XisNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
