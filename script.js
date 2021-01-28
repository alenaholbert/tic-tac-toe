const DOMboard = document.querySelector('#gameboard');

// single spot on board -- factory function
const spot = () => {
    const mark = '';
    return {
        mark
    };
};

// module for tic-tac-toe grid
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
        index = 0;
        board.forEach(spot => {
            const square = document.createElement('div');
            square.classList.add("spot");
            square.setAttribute('data-index', `${index}`);
            DOMboard.appendChild(square);
            square.addEventListener('click', (e) =>
            {
                controller.playTurn(e);
                // console.log(e);
                // console.log(e.target);
                // console.log(e.target.dataset.index);
                // console.log(board[e.target.dataset.index].mark);
                // console.log(this);
            });
            index++;
            // square.addEventListener('click', (e) => {
            //     controller.playTurn();
            // });
        });
    };

    // gameboard's functions that will be accessible outside of module
    return {
        getBoard,
        renderBoard
    };
})();

// module for controller that oversees the entire game
const controller = (() => {

    const player1Turn = true;

    const startNewGame = () => {
        gameboard.renderBoard();
    }

    // play a turn
    const playTurn = (e) => {
        spotIndex = e.target.dataset.index;
        DOMspot = e.target;
        spotElem = gameboard.getBoard()[spotIndex];
        mark = spotElem.mark;
        console.log("trtying to get the thing: " + mark);
        if (player1Turn && mark == '') { // player 1's turn - 'X'
            DOMspot.setAttribute('style', 'background: url(images/x-mark.png) no-repeat; background-size: 100%;');
            spotElem.mark = "x";
            console.log("did this update?" + spotElem.mark);
            console.log("what about this: " + gameboard.getBoard()[spotIndex].mark);
        }
        else if (mark == ''){ // player 2's turn - 'O'
            DOMspot.setAttribute('style', 'background: url(images/o-mark.png) no-repeat; background-size: 100%;');
            mark = "o";
        }
    };

    const test = () => {
        console.log('uhhhh');
    };

    // controller's functions accessible outside of module
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