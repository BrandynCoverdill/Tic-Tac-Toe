// Form inputs
const playerOneInput = document.querySelector(
	'.menu form input:nth-of-type(1)'
);
const playerTwoInput = document.querySelector(
	'.menu form input:nth-of-type(2)'
);
const startBtn = document.querySelector('.menu form button');
const resetBtn = document.querySelector('.reset');

// Make reset button disabled on page load
resetBtn.setAttribute('disabled', true);

// Reset the game when the reset button is clicked
resetBtn.addEventListener('click', (e) => {
	e.preventDefault();
	resetBtn.setAttribute('disabled', true);
	startBtn.removeAttribute('disabled');
	playerOneInput.removeAttribute('disabled');
	playerTwoInput.removeAttribute('disabled');
	document.querySelector('.outcome h2').textContent = '';
	document.querySelector('.turn h2').textContent = '';
	displayBoard.removeBoard();
	gameboard.resetGame();
});

// Start the game when the start button is clicked
startBtn.addEventListener('click', (e) => {
	e.preventDefault();
	// Validate inputs

	// Grab the inputs for the player's name
	let playerOneName = playerOneInput.value;
	let playerTwoName = playerTwoInput.value;

	// if player one's input name is bad
	if (playerOneName.trim() == '') {
		playerOneInput.focus();
		playerOneInput.style.border = '1px solid red';
		document.querySelector('.menu form p:nth-of-type(1)').style.display =
			'block';
	} else {
		playerOneInput.style.border = '1px solid black';
		document.querySelector('.menu form p:nth-of-type(1)').style.display =
			'none';
	}

	// if player two's input name is bad
	if (playerTwoName.trim() == '') {
		playerTwoInput.focus();
		playerTwoInput.style.border = '1px solid red';
		document.querySelector('.menu form p:nth-of-type(2)').style.display =
			'block';
	} else {
		playerTwoInput.style.border = '1px solid black';
		document.querySelector('.menu form p:nth-of-type(2)').style.display =
			'none';
	}

	// Create player objects and run game
	if (!playerOneName.trim() == '' && !playerTwoName.trim() == '') {
		playerOneInput.setAttribute('disabled', true);
		playerTwoInput.setAttribute('disabled', true);
		startBtn.setAttribute('disabled', true);
		const playerOne = player(playerOneName, 'X');
		const playerTwo = player(playerTwoName, 'O');
		gameLogic.play(playerOne, playerTwo);
	}
});

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
	const play = (playerOne, playerTwo) => {
		// Let player one by the first player to go
		let currentPlayer = playerOne;

		// Display who's turn it is
		document.querySelector('.turn h2').textContent =
			currentPlayer.getName() + "'s turn!";

		// Set the first round to 0 0f 8.
		let round = 0;

		// Append game to the document
		displayBoard.createBoard();

		// set variables that reference the game object and it's children
		const board = document.querySelector('.gameboard');
		const gameBoardSquares = document.querySelectorAll('.gameboard > div');

		// Add an event listener for when a player clicks on the game
		gameBoardSquares.forEach((square) => {
			square.addEventListener('click', (e) => {
				// if the user clicks on a valid spot on the game
				if (
					gameboard.placeMarker(e.target.dataset.id, currentPlayer.getMarker())
				) {
					// add to round count of 8
					round++;

					// Check if there is a winner
					if (gameboard.checkWin()) {
						document.querySelector(
							'.outcome h2'
						).textContent = `${currentPlayer.getName()} wins!`;
						document.querySelector('.turn h2').textContent = '';
						board.style.cssText += `
							pointer-events: none;
						`;
						// Show reset button for the game
						resetBtn.removeAttribute('disabled');
					} else {
						// Switch to the next player
						switch (currentPlayer) {
							case playerOne:
								currentPlayer = playerTwo;
								document.querySelector('.turn h2').textContent =
									currentPlayer.getName() + "'s turn!";
								break;
							case playerTwo:
								currentPlayer = playerOne;
								document.querySelector('.turn h2').textContent =
									currentPlayer.getName() + "'s turn!";
								break;
							default:
								break;
						}
					}
					// if the round is past 8, meaning all 8 rounds have been done and
					// there was no winner on the 8th round
					if (round === 9) {
						// If there has been no winner
						if (!gameboard.checkWin()) {
							board.style.cssText += `
								pointer-events: none;
							`;
							document.querySelector('.turn h2').textContent = '';
							document.querySelector('.outcome h2').textContent = 'Game tied!';
							// activate the reset button for the game
							resetBtn.removeAttribute('disabled');
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

/**
 * IIFE that creates the visual gameboard object you see in the document
 */
const displayBoard = (function () {
	const main = document.querySelector('main');

	/**
	 * removes the board from the document
	 */
	const removeBoard = () => {
		main.removeChild(document.querySelector('.gameboard'));
	};

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
		removeBoard,
	};
})();

// Testing the game/player logic
// displayBoard.addMarkerToBoard(0, 'X');
// gameLogic.play();
