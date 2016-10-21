export default class Game {
	constructor(board, output) {
		this.board = board;
		this.isPaused = false;
		this.time = 0;
		this.output = $('.time');
		this.gameSpeed = 3000;

		this.start = this.start.bind(this);
		this.nextGameState = this.nextGameState.bind(this);
	}

	start() {
		// on interval tell the board to fill a random blank square
		// window.intervalId = setInterval(this.nextGameState, 1000);
		$('.pause').on('click', (e) => {
		  e.preventDefault();
		  this.isPaused = true;
		}).bind(this);

		$('.start').on('click', (e) => {
		  e.preventDefault();
		  this.isPaused = false;
		}).bind(this);

		window.intervalId = setInterval( () => {
			if (!this.isPaused) {
				this.time++;
				this.output.text('Seconds: ' + this.time);
				this.nextGameState();
			}
		}, this.gameSpeed);
	}

	nextGameState() {
		if (this.board.isFullBoard()) {
			console.log('game over');
			clearInterval(window.intervalId);
		} else {
			this.board.fillRandomSquare();
		}
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
