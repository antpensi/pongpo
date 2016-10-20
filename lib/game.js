export default class Game {
	constructor(board) {
		this.board = board;
	}

	start() {
		// on interval tell the board to fill a random blank square
		setInterval(this.board.fillRandomSquare, 5000);
	}

	makeMove($square) {
		const pos = $square.data("pos");

		try {
			this.playMove(pos);
		} catch (e) {
			// NB: What should I do when player makes invalid move?
			// (i.e. clicks ON a square)
			return;
		}
	}

	playMove(pos) {
		if (this.board.isValidMove(pos)) {
			console.log(`move at ${pos}`);
			this.board.handleMove(pos);
	 	} else {
			console.log(`invalid!`);
		}
	}


}
