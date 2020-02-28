import React from 'react';

type MovesProps = {
  history: { squares: string[] }[];
  stepNumber: number;
  jumpTo(i: number): void;
};

const Moves = ({ history, stepNumber, jumpTo }: MovesProps) => {
  const moves = history.map((e, move) => {
    // move variable is the move #, i.e. move #2, #3, ...
    // it is the index of the map
    const desc = move ? 'Go to move #' + move : 'Go to game start';

    if (move === stepNumber) {
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>
            <strong> {desc} </strong>
          </button>
        </li>
      );
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return <ol>{moves}</ol>;
};

export default Moves;
