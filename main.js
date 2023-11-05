/**
 * Creates gameboard object and it's logic
 * @returns {Object} Gameboard object
 */
const gameboard = function () {
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
};

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
	 * Returns the player's name
	 * @returns {String} player's name
	 */
	const getName = () => name;

	return {
		getName,
		getMarker,
		getWins,
		win,
	};
};

// Testing the game/player logic
const board = gameboard();
const playerOne = player('Brandyn', 'x');

board.placeMarker(6, playerOne.getMarker());
board.placeMarker(7, playerOne.getMarker());
board.placeMarker(8, playerOne.getMarker());
console.log(board.getBoard());

console.log(board.checkWin());
