export default class Game {
	constructor(board) {
		this.board = board;
	}

	playMove(pos) {
		console.log(`move at ${pos}`);
	}
}
