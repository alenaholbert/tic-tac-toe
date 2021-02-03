const DOMplayer = document.querySelector("#player-board");
const DOMscorekeeper = document.querySelector("#scorekeeper");
const DOMboard = document.querySelector('#gameboard');

// single spot on board -- factory function
const spotObj = () => {
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
            board[i] = spotObj();
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
            });
            index++;
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

    player1Wins = 0;
    player2Wins = 0;

    player1Turn = true;

    const startNewGame = () => {
        const children = document.querySelectorAll(".spot");
        children.forEach((child) => {
            DOMboard.removeChild(child);
        });
        DOMplayer.textContent = "Player 1's Turn";
        DOMscorekeeper.innerHTML = `<u>SCORE</u><br>Player 1: ${player1Wins} <br> Player 2: ${player2Wins}`;
        gameboard.renderBoard();
    }

    // play a turn
    const playTurn = (e) => {

        // mark square appropriately
        spotIndex = e.target.dataset.index; // index of DOM spot
        DOMspot = e.target;
        spot = gameboard.getBoard()[spotIndex]; // index of internal spot object
        turnSuccessful = markSpot(spot);

        // game over
        result = checkResult();
        if (result != ''){
            setTimeout(function() { // allow to render final mark
                // win
                if (result == 'win') {
                    if (player1Turn) {
                        player1Wins++;
                        if (confirm(`Player 1 Wins! Would you like to play again?`)) {
                            startNewGame();
                        }
                    }
                    else {
                        player2Wins++;
                        if (confirm(`Player 2 Wins! Would you like to play again?`)) {
                            startNewGame();
                        }
                    }
                }
                // tie
                else {
                    if (confirm(`It's a Tie! Would you like to play again?`)) {
                        startNewGame();
                    }
                }
            }, 10);
        }
        
        // game not over, next player
        else if (turnSuccessful) {
            player1Turn = !player1Turn;
            if (player1Turn) {
                DOMplayer.textContent = "Player 1's Turn";
            }
            else {
                DOMplayer.textContent = "Player 2's Turn";
            }
        }
    };

    // mark spot for correct player, making sure not to override an already marked spot
    const markSpot = (spot) => {

        if (spot.mark == '') {

            // player 1's turn - 'X'
            if (player1Turn) {
                DOMspot.setAttribute('style', 'background: url(images/x-mark.png) no-repeat; background-size: 100%;');
                spot.mark = "x";
                console.log("marking x");
            }

            // player 2's turn - 'O'
            else {
                DOMspot.setAttribute('style', 'background: url(images/o-mark.png) no-repeat; background-size: 100%;');
                spot.mark = "o";
                console.log("marking o");
            }
            // successful turn
            return true;
        }
        // unsuccessful turn -- clicked an already marked square
        return false;
    };

    // check if the game is over
    const checkResult = () => {
        board = gameboard.getBoard();
        console.log(board);

        console.log("win? " + checkWin(board));

        // win! end game
        if (checkWin(board)) {
            console.log("game over! win");
            if (player1Turn) {
                console.log("player 1 wins!");
            }
            else {
                console.log("player 2 wins!");
            }
            return 'win';
        }

        // tie! end game
        else if (boardFull(board)) {
            console.log("game over! tie");
            return 'tie';
        }

        // game not over
        return '';
    };

    // check if there is a three-in-a-row
    const checkWin = (board) => {
        
        const winConditions = [
            [0,1,2], // accross top
            [3,4,5], // accross middle
            [6,7,8], // accross bottom
            [0,3,6], // down left
            [1,4,7], // down middle
            [2,5,8], // down right
            [0,4,8], // diagonal top left to bottom right
            [2,4,6] // diagonal bottom left to top right
        ];

        isWin = false;
        winConditions.forEach((row) => {
            if (threeInARow(board, row)) {
                isWin = true;
            }
        })
        
        return isWin;
    };

    // return if row is a winning row
    const threeInARow = (board, row) => {
        return (board[row[0]].mark != '' && board[row[0]].mark == board[row[1]].mark
            && board[row[0]].mark == board[row[2]].mark);
    }

    // check if board is full
    const boardFull = (board) => {
        isFull = true;
        board.forEach(spot => {
            if (spot.mark == '') {
                isFull = false;
            }
        });
        return isFull;
    };

    // controller's functions accessible outside of module
    return {
        //renderBoard,
        playTurn,
        startNewGame
    };
})();

controller.startNewGame();
//gameboard.renderBoard();
//console.log(gameboard.getBoard());
//controller.test();