const DOMboard = document.querySelector('#gameboard');

// single spot on board -- factory function
const spot = () => {
    const mark = '';
    return {
        mark
    };
};

// tic-tac-toe grid
const gameboard = (() => {
    const board = [];
    
    const getBoard = () => board;

    // initialize the board
    const renderBoard = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = spot();
        };
        // board = getBoard();
        // console.log(board);
        board.forEach(spot => {
            const square = document.createElement('div');
            square.classList.add("spot");
            DOMboard.appendChild(square);
            square.addEventListener('click', controller.playTurn);
            // square.addEventListener('click', (e) => {
            //     controller.playTurn();
            // });
        });
    };

    // gameboard's functions that will be accessible outside of gameboard
    return {
        getBoard,
        renderBoard
    };
})();

// controller that oversees the entire game
const controller = (() => {

    const player1Turn = true;

    const startNewGame = () => {
        gameboard.renderBoard();
    }

    // play a turn
    const playTurn = () => {
        console.log("click");
        console.log("this: " + this);
        mark = this.children;
        console.log("trtying to get the thing: " + mark);
        if (player1Turn && this.mark == '') { // player 1's turn - 'X'
        this.setAttribute('style', 'background: url(images/x-mark.png) no-repeat; background-size: 100%;');
    }
        else if (this.mark == ''){ // player 2's turn - 'O'
            this.setAttribute('style', 'background: url(images/o-mark.png) no-repeat; background-size: 100%;');
        }
    };

    const test = () => {
        console.log('uhhhh');
    };

    return {
        //renderBoard,
        playTurn,
        test,
        startNewGame
    };
})();

controller.startNewGame();
//gameboard.renderBoard();
//console.log(gameboard.getBoard());
//controller.test();