import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// The individual cells
function Square(props) {
    return (
        <button className="square"
                onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    /* Renders each square, takes note of it in an array,
     * and sets its on-click function.
     */
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
            <div onClick={this.boardOnClick}>
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
            moves: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            isVictory: false,
            display: 'X'
        }
    }
    
    /* Handles click when a square is pressed. Note that this
     * is defined within the Board class, not the Square class.
     */
    handleSquareClick(i) {
        const moves = this.state.moves;
        const current = moves[moves.length - 1];
        const squares = current.squares.slice();
        const curPlayer = this.state.display;

        if (squares[i] === null && !this.state.isVictory) {
            squares[i] = curPlayer;
            
            const didWin = this.checkVictory(squares, curPlayer);
            const display = (didWin ^ curPlayer === 'X') ?
                             'O' : 'X';
            this.setState(
                {
                    moves: moves.concat([
                        {
                            squares: squares,
                        }
                    ]),
                    isVictory: didWin, 
                    display: display 
                });
        }
    }

    /* Checks if the given player ended the game with their
     * previous move.
     */
    checkVictory(squares, ch) {
        for (var i = 0; i < 3; i++) {
            // check column i
            if (squares[i] === ch &&
                squares[i + 3] === ch &&
                squares[i + 6] === ch) {
                return true;
            } 
           
            // check row i
            if (squares[i*3] === ch &&
                squares[i*3 + 1] === ch &&
                squares[i*3 + 2] === ch) {
                return true;
            }
        }

        // check diagonals
        return (squares[0] === ch &&
                squares[4] === ch &&
                squares[8] === ch) ||
               (squares[2] === ch &&
                squares[4] === ch &&
                squares[6] === ch);
    }

    jumpTo(i) {
        const cutMoves = this.state.moves.slice(0, i + 1);
        this.setState({
            moves: cutMoves,
            isVictory: false,
            display: (i % 2 === 0) ? 'X' : 'O'
        });
    }

    render() {
        const moves = this.state.moves;
        const current = moves[moves.length - 1];
       
        const historyButtons = moves.map((step, move) => {
            const text = move === 0 ?
                "Go to game start" :
                "Go to move #" + move;
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {text}
                    </button>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares}
                           onClick={(i) => this.handleSquareClick(i)}/>
                </div>
            <div className="game-info">
                <div>{(this.state.isVictory ? 
                        "Winner: " : "Next player: ") + 
                      this.state.display}</div>
                    <ol>{historyButtons
                            .slice(0, historyButtons.length - 1)}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Game />,
                document.getElementById('root')
);
