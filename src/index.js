import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// constructor(props) {
//   super(props);
//   this.state = {
//     value: null,
//   };
// }
function Square(props) {

  //WHEN SQUARE WAS DEFINED AS CLASS COMPONENT
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: null,
  //   };
  // } 
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Board extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xNext: true
  //   }
  // }
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { squares: Array(9).fill(null) }
      ],
      xNext: true,
      stepNo: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNo + 1);
    const current = history[history.length - 1];
    const sq = current.squares.slice();
    sq[i] = this.state.xNext ? "X" : "O";

    this.setState({
      history: history.concat([{
        squares: sq,
      }]),
      stepNo: history.length,
      xNext: !this.state.xNext,
    })
  }

  jumpTo(move) {
    this.setState(
      {
        stepNo: move,
        xNext: (move % 2) === 0,
      }
    )
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNo];
    const win = winner(current.squares);
    let status;
    if (win) {
      status = "Winner : " + (this.state.xNext ? "O" : "X")
    }
    else {
      status = 'Next player: ' + (this.state.xNext ? "X" : "O");
    }

    const moves = history.map((step, move) => {
      const text = move ? "Jump to move no. " + move : "Go to the start";
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{text}</button>
        </li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <div className="status">{status}</div>
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function winner(squares) {
  const wincon = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < wincon.length; i++) {
    const [s1, s2, s3] = wincon[i];
    if (squares[s1] && squares[s1] === squares[s2] && squares[s2] === squares[s3]) {
      return wincon[i];
    }
  }
  return null;
}
