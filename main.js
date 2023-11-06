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
	 */
	const placeMarker = (index, mark) => {
		// Check if the place hasn't been taken already
		if (board[index] === undefined) {
			board[index] = mark;
		} else {
			alert('Cannot place marker at this spot!');
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
		const playerOne = player(playerOneName, 'x');
		const playerTwo = player(playerTwoName, 'o');

		// Let player one by the first player to go
		let currentPlayer = playerOne;

		// Loop until there is a winner or a tie
		for (let round = 0; round < gameboard.getBoard().length; round++) {
			// Get the number choosen from the player
			let playingOnArea = prompt(
				`${currentPlayer.getName()}, please enter a number from 0-8 to place your marker.`
			);

			// Check if the player's response is valid
			while (isNaN(+playingOnArea.trim()) || playingOnArea === '') {
				playingOnArea = prompt(
					`${currentPlayer.getName()}, please choose a number from 1-8 only.`
				);
			}
			// Place the player's marker on the board
			gameboard.placeMarker(+playingOnArea, currentPlayer.getMarker());

			// Output gameboard
			console.log(gameboard.getBoard());

			// Check if there is a winner
			if (gameboard.checkWin()) {
				console.log(gameboard.getBoard());
				console.log(`${currentPlayer.getName()} wins!`);
				break;
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
		}
		// If the game is tied
		if (!gameboard.checkWin()) {
			console.log('Game Tied!');
		}
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
		});

		board.querySelector('[data-id="0"]').style.cssText = `
			border-bottom: 2px solid black;
			border-right: 2px solid black;
			cursor: pointer;
		`;
		board.querySelector('[data-id="1"]').style.cssText = `
			border-left: 2px solid black;
			border-bottom: 2px solid black;
			border-right: 2px solid black;
			cursor: pointer;
		`;
		board.querySelector('[data-id="2"]').style.cssText = `
			border-left: 2px solid black;
			border-bottom: 2px solid black;
			cursor: pointer;
		`;
		board.querySelector('[data-id="3"]').style.cssText = `
			border-top: 2px solid black;
			border-right: 2px solid black;
			border-bottom: 2px solid black;
			cursor: pointer;
		`;
		board.querySelector('[data-id="4"]').style.cssText = `
			border: 2px solid black;
			cursor: pointer;
		`;
		board.querySelector('[data-id="5"]').style.cssText = `
			border-top: 2px solid black;
			border-left: 2px solid black;
			border-bottom: 2px solid black;
			cursor: pointer;
		`;
		board.querySelector('[data-id="6"]').style.cssText = `
			border-top: 2px solid black;
			border-right: 2px solid black;
			cursor: pointer;
		`;
		board.querySelector('[data-id="7"]').style.cssText = `
			border-left: 2px solid black;
			border-top: 2px solid black;
			border-right: 2px solid black;
			cursor: pointer;
		`;
		board.querySelector('[data-id="8"]').style.cssText = `
			border-top: 2px solid black;
			border-left: 2px solid black;
			cursor: pointer;
		`;

		// Populate main with the board
		main.appendChild(board);
	};

	return {
		createBoard,
	};
})();

// Testing the game/player logic
displayBoard.createBoard();
// gameLogic.play();
