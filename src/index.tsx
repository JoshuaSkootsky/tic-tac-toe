import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { calculateWinner } from './utils';

/*
Features todo:
- Sort moves desc or ascending order
- When someone wins, highlight the three squares that caused the win.
- When no one wins, display a message about the result being a draw.
*/
//component number one - an individual square

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
const Game = () => {
  // instead of constructor, initialize state hooks for history, state, and XisNext
  // TODO: fix this bug
  // make one move. Go back one move. Then make a 2nd move.
  // Game proceeds from game state of first move. 0 -> 1 -> 2. You have now made two moves as X.
  const [stepNumber, setStepNumber] = useState(0);
  const squares: string[] = new Array(9).fill('');
  const [history, setHistory] = useState([{ squares }]);
  const [XisNext, setXisNext] = useState(true);

  const handleClick = (i: number) => {
    setHistory(history.slice(0, stepNumber + 1));

    const current = history[history.length - 1]; // get current squares
    const squares = [...current.squares]; // make a safe copy
    if (calculateWinner(squares) || squares[i]) {
      return; // do nothing on this click
    }
    // update squares copy with current move
    squares[i] = XisNext ? 'X' : 'O';
    // update history
    setHistory(history.concat([{ squares }]));
    setStepNumber(history.length);
    setXisNext(!XisNext);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };
  // this move list will be displayed later
  const moves = history.map((e, i) => {
    const desc = i ? 'Go to move #' + i : 'Go to game start';
    if (i === stepNumber) {
      return (
        <li key={i}>
          <button onClick={() => jumpTo(i)}>
            <strong>{desc}</strong>
          </button>
        </li>
      );
    }
    return (
      <li key={i}>
        <button onClick={() => jumpTo(i)}>{desc}</button>
      </li>
    );
  });

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status = 'Next player: ' + (XisNext ? 'X' : 'O');
  if (winner) {
    status = 'Winner: ' + winner;
  }

  if (stepNumber === 9 && !winner) {
    status = 'Tie game!';
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
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
