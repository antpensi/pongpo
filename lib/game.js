export default class Game {
	constructor(board) {
		this.board = board;
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
	 	} else {
			console.log(`invalid!`);
		}
	}

}
