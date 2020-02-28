import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { calculateWinner } from './utils';
import Moves from './Moves';

/*
Features todo:
- Sort moves desc or ascending order
- When someone wins, highlight the three squares that caused the win.
*/

type SquareProps = {
  onClick(): void;
  value: string;
};

const Square = ({ onClick, value }: SquareProps) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

// component #2
type BoardProps = {
  onClick(i: number): void;
  squares: string[];
};
const Board = ({ onClick, squares }: BoardProps) => {
  // render square utility function
  const renderSquare = (i: number) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

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
  );
};

// component #3 - Game
interface P {
  props?: Readonly<P>;
}

interface S {
  history: { squares: string[] }[];
  stepNumber: number;
  XisNext: boolean;
}
class Game extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      history: [
        {
          squares: [],
        },
      ],
      stepNumber: 0,
      XisNext: true,
    };

    this.jumpTo = this.jumpTo.bind(this);
  }

  handleClick(i: number) {
    const history =
      this.state?.history?.slice(0, this.state.stepNumber + 1) ?? [];
    const current = history[history.length - 1];
    const squares = [...current.squares];
    if (calculateWinner(squares) || squares[i]) {
      return; // do nothing on this click
    }
    squares[i] = this.state.XisNext ? 'X' : 'O';

    this.setState({
      history: history.concat([
        {
          squares,
        },
      ]),
      stepNumber: history.length,
      XisNext: !this.state.XisNext, // change X state
    });
  }

  jumpTo(stepNumber: number) {
    this.setState({
      stepNumber,
      XisNext: stepNumber % 2 === 0,
    });
  }

  render() {
    // calculate
    const history = this.state?.history ?? [];
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status = 'Next player: ' + (this.state.XisNext ? 'X' : 'O');
    if (winner) {
      status = 'Winner: ' + winner;
    }
    if (!winner && this.state.stepNumber === 9) {
      status = 'Tie game!';
    }
    // display
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <Moves
            history={this.state.history}
            stepNumber={this.state.stepNumber}
            jumpTo={this.jumpTo}
          />
        </div>
      </div>
    );
  }
}
// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
