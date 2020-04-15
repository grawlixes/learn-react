import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var turn = 'o';

class Square extends React.Component {
    constructor(props) {
        // superconstructor
        super(props)

        // attributes
        this.state = {block: ''};

        // need to bind "this" to the function
        // in order to use "this" in callback
        this.changeOnClick = this.changeOnClick
                                 .bind(this);
    }

    changeOnClick(e) {
        this.setState(state => ({
            block: turn
        }));

        turn = (turn === 'x') ? 'o' : 'x';
    }
    
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
      renderSquare(i) {
              return <Square />;
            }

      render() {
              const status = 'Next player: X';

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

 ReactDOM.render(
   <Game />,
     document.getElementById('root')
     );

