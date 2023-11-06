/**
 * Creates gameboard object and it's logic
 * @returns {Object} Gameboard object
 */
const gameboard = (function () {
	/**
	 * board for the game
	 */
	const board = [
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
	];

	/**
	 * If there is a winner, return true, else false
	 * @returns {bool} decides if the game is won
	 */
	const checkWin = () => {
		if (
			board[0] === board[1] &&
			board[1] === board[2] &&
			board[1] !== undefined
		) {
			return true;
		} else if (
			board[3] === board[4] &&
			board[4] === board[5] &&
			board[4] !== undefined
		) {
			return true;
		} else if (
			board[6] === board[7] &&
			board[7] === board[8] &&
			board[7] !== undefined
		) {
			return true;
		} else if (
			board[0] === board[3] &&
			board[3] === board[6] &&
			board[3] !== undefined
		) {
			return true;
		} else if (
			board[1] === board[4] &&
			board[4] === board[7] &&
			board[4] !== undefined
		) {
			return true;
		} else if (
			board[2] === board[5] &&
			board[5] === board[8] &&
			board[5] !== undefined
		) {
			return true;
		} else if (
			board[0] === board[4] &&
			board[4] === board[8] &&
			board[4] !== undefined
		) {
			return true;
		} else if (
			board[6] === board[4] &&
			board[4] === board[2] &&
			board[4] !== undefined
		) {
			return true;
		} else {
			return false;
		}
	};

	/**
	 * Places the player's marker on the gameboard
	 * @param {Number} index where to put the marker at
	 * @param {String} mark the mark the player has
	 * @returns {Boolean} if placing the marker is a success
	 */
	const placeMarker = (index, mark) => {
		// Check if the place hasn't been taken already
		if (board[index] === undefined) {
			board[index] = mark;
			displayBoard.addMarkerToBoard(index, mark);
			return true;
		} else {
			alert('Cannot place marker at this spot!');
			return false;
		}
	};

	/**
	 * Shows board array
	 * @returns {Array} the gameboard object
	 */
	const getBoard = () => board;

	/**
	 * Resets the board array's items to undefined
	 */
	const resetGame = () => {
		for (let i = 0; i < board.length; i++) {
			board[i] = undefined;
		}
	};

	return {
		checkWin,
		placeMarker,
		getBoard,
		resetGame,
	};
})();

/**
 * Creates player object and it's logic
 * @param {String} name Name of the player
 * @param {String} mark The mark the player has for the game
 * @returns {Object} player object
 */
const player = function (name, mark) {
	const numWins = 0;

	/**
	 * Add 1 to the player's win count
	 */
	const win = () => numWins++;

	/**
	 * Return the player's marker
	 * @returns {String} mark the player has
	 */
	const getMarker = () => mark;

	/**
	 * Returns the number of wins the player has
	 * @returns {Number} the number of wins
	 */
	const getWins = () => numWins;

	/**
	 * Set's the player's name
	 * @param {String} newName the new name of the player
	 */
	const setName = (newName) => {
		name = newName;
	};

	/**
	 * Returns the player's name
	 * @returns {String} player's name
	 */
	const getName = () => name;

	return {
		getName,
		getMarker,
		getWins,
		setName,
		win,
	};
};

const gameLogic = (function () {
	/**
	 * The logic for playing the game
	 */
	const play = () => {
		// Grab the Player names to create player objects
		let playerOneName = prompt('Enter the name of Player 1.');
		while (playerOneName.trim() === '') {
			playerOneName = prompt('Please choose a better name Player 1.');
		}
		let playerTwoName = prompt('Enter the name of player 2.');
		while (playerTwoName.trim() === '') {
			playerTwoName = prompt('Please choose a better name Player 2.');
		}

		// Create player objects with their names
		const playerOne = player(playerOneName, 'X');
		const playerTwo = player(playerTwoName, 'O');

		// Let player one by the first player to go
		let currentPlayer = playerOne;
		let round = 0;

		// Main game logic
		displayBoard.createBoard();
		const board = document.querySelector('.gameboard');
		const gameBoardSquares = document.querySelectorAll('.gameboard > div');
		gameBoardSquares.forEach((square) => {
			square.addEventListener('click', (e) => {
				// Place the marker on the board
				if (
					gameboard.placeMarker(e.target.dataset.id, currentPlayer.getMarker())
				) {
					round++;
					// Output gameboard
					console.log(gameboard.getBoard());

					// Check if there is a winner
					if (gameboard.checkWin()) {
						console.log(gameboard.getBoard());
						console.log(`${currentPlayer.getName()} wins!`);
						// TODO: Disable gameboard if there is a win.
					} else {
						// Switch to the next player
						switch (currentPlayer) {
							case playerOne:
								currentPlayer = playerTwo;
								break;
							case playerTwo:
								currentPlayer = playerOne;
								break;
							default:
								break;
						}
					}
					if (round === 9) {
						if (!gameboard.checkWin()) {
							// TODO: Disable the gameboard if there is a tie

							console.log('game tied!');
						}
					}
				}
			});
		});
	};

	return {
		play,
	};
})();

const displayBoard = (function () {
	const main = document.querySelector('main');

	/**
	 * Creates the DOM objects for the gameboard and display in the main dom tag
	 */
	const createBoard = () => {
		// Create visual gameboard object
		const board = document.createElement('div');
		board.classList.add('gameboard');
		for (let i = 0; i < 9; i++) {
			const div = document.createElement('div');
			board.appendChild(div);
		}

		// Style the visual gameboard object
		board.style.cssText = `
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(3, 1fr);
			height: 300px;
			width: 300px;
			margin: 1em auto;
		`;

		const playAreas = board.querySelectorAll('div');
		// Create data-attribute IDs for the squares
		let i = 0;
		playAreas.forEach((square) => {
			square.dataset.id = i++;
			square.style.cssText = `
				background: rgb(200, 200, 200);
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: bold;
				font-size: 80px;
			`;
		});

		board.querySelector('[data-id="0"]').style.cssText += `
			border-bottom: 2px solid black;
			border-right: 2px solid black;
		`;
		board.querySelector('[data-id="1"]').style.cssText += `
			border-left: 2px solid black;
			border-bottom: 2px solid black;
			border-right: 2px solid black;
		`;
		board.querySelector('[data-id="2"]').style.cssText += `
			border-left: 2px solid black;
			border-bottom: 2px solid black;
		`;
		board.querySelector('[data-id="3"]').style.cssText += `
			border-top: 2px solid black;
			border-right: 2px solid black;
			border-bottom: 2px solid black;
		`;
		board.querySelector('[data-id="4"]').style.cssText += `
			border: 2px solid black;
		`;
		board.querySelector('[data-id="5"]').style.cssText += `
			border-top: 2px solid black;
			border-left: 2px solid black;
			border-bottom: 2px solid black;
		`;
		board.querySelector('[data-id="6"]').style.cssText += `
			border-top: 2px solid black;
			border-right: 2px solid black;
		`;
		board.querySelector('[data-id="7"]').style.cssText += `
			border-left: 2px solid black;
			border-top: 2px solid black;
			border-right: 2px solid black;
		`;
		board.querySelector('[data-id="8"]').style.cssText += `
			border-top: 2px solid black;
			border-left: 2px solid black;
		`;

		// Populate main with the board
		main.appendChild(board);
	};

	const addMarkerToBoard = (index, mark) => {
		const board = document.querySelector('.gameboard');
		board.querySelector(`[data-id="${index}"]`).textContent = mark;
	};

	return {
		createBoard,
		addMarkerToBoard,
	};
})();

// Testing the game/player logic
// displayBoard.createBoard();
// displayBoard.addMarkerToBoard(0, 'X');
gameLogic.play();
