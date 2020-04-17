import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// The individual cells
class Square extends React.Component {
    // Returns the Square object.
    render() {
        return (
            <button className="square"
                    onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            squares: Array(9).fill(null),
            isVictory: false,
            turn: 'x'
        }
    }

    /* Not necessary because each square is identical,
     * but could be useful if we want specific values
     * per square in the future. Maybe useful for victory.
     */
    renderSquare(i) {
        return <Square 
                    value={this.state.squares[i]}
                    onClick={() => this.handleSquareClick(i)}
                />;
    }

    /* Handles click when a square is pressed. Note that this
     * is defined within the Board class, not the Square class.
     */
    handleSquareClick(i) {
        const squares = this.state.squares.slice();
        const curPlayer = this.state.turn;

        if (squares[i] === null &&
            !this.state.isVictory) {
            squares[i] = curPlayer;

            const didWin = this.checkVictory(curPlayer);
            const nextTurn = (didWin ^ curPlayer === 'x') ?
                             'o' : 'x';
            this.setState(
                {
                    squares: squares,
                    isVictory: didWin, 
                    turn: nextTurn
                });
        }
    }

    /* Checks if the given player ended the game with their
     * previous move.
     */
    checkVictory(ch) {
        const squares = this.state.squares;

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
                squares[i+3 + 2] === ch) {
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

    render() {
        return (
            <div onClick={this.boardOnClick}>
                <div className="status">
                    {(this.state.isVictory) ?
                        ("The winner is " + this.state.turn) :
                        ("Next player: " + this.state.turn)}
                </div>
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

ReactDOM.render(<Game />,
                document.getElementById('root')
);
