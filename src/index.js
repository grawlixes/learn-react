import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var turn = 'o';
var isVictory = false;
// The individual cells
class Square extends React.Component {
    constructor(props) {
        // superconstructor
        super(props)

        // attributes
        this.state = {block: ''};

        /* need to bind "this" to the function
           in order to use "this" in callback
        */
        this.changeOnClick = this.changeOnClick
                                 .bind(this);
    }

    /* Changes a cell when clicked on. Changes to
     * "X" if it's player 1's turn, "O" otherwise.
     * Only changes the cell if it's unoccupied.
     */
    changeOnClick(e) {
        if (this.state.block === '' && 
            !isVictory) {

            this.setState(state => ({
                block: turn
            }));
           
            turn = (turn === 'x') ? 'o' : 'x';
        }
    }
   
    // Returns the Square object.
    render() {
        return (
            <button className="square"
                    onClick={this.changeOnClick}>
                {this.state.block}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {status: 'Next player: ' + turn};
       
        // Bind "this" to changeStatus function
        this.boardOnClick = this.boardOnClick
                                .bind(this);
    }

    /* Not necessary because each square is identical,
     * but could be useful if we want specific values
     * per square in the future. Maybe useful for victory.
     */
    renderSquare(i) {
        return <Square />;
    }

    /* Every click on the board or info div will
     * run this function.
     */
    boardOnClick(e) {
        if (!isVictory) {
            this.changeStatus(e);
            this.checkVictory(e);
        }
    }

    /* Changes the status to the next player's turn
     * if it changes. If not, this is still called,
     * but it won't change anything.
     */
    changeStatus(e) {
        this.setState(state => ({
            status: 'Next player: ' + turn
        }));
    }

    // Checks entire board for a victory for either player.
    checkVictory(e) {
        // todo
    }

    // todo probably make an array of squares to check victory
    render() {
        return (
            <div onClick={this.boardOnClick}>
                <div className="status">
                    {this.state.status}
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
