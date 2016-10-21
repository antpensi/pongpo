export default class Game {
	constructor(board, output) {
		this.board = board;
		this.score = this.board.score;
		this.scoreBoard = $('.scoreboard');
		this.isPaused = true;
		this.time = 0;
		this.output = $('.time');
		this.gameSpeedIndex = 1;
		this.gameSpeeds = {
			1: 3000,
			2: 2500,
			3: 2000,
			4: 1500,
			5: 1000,
			6: 750,
			7: 500,
			8: 350,
			9: 250,
			10: 200,
			11: 150,
			12: 100,
			13: 50,
			14: 25,
			15: 10,
		};

		this.start = this.start.bind(this);
		this.makeInterval = this.makeInterval.bind(this);
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

		this.makeInterval();

	}

	makeInterval() {
		const that = this;
		window.intervalId = setInterval( () => {
			if (!this.isPaused) {
				that.time++;
				that.output.text('Game Speed: ' + that.gameSpeedIndex);
				that.scoreBoard.text(`Score: ${that.board.score}`);
				$('.paused').text('Running');
				that.nextGameState();
			} else {
				$('.paused').text('Paused');
			}
		}, that.gameSpeeds[that.gameSpeedIndex]);
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
			// console.log(`move at ${pos}`);
			this.board.handleMove(pos);
	 	} else {
			clearInterval(window.intervalId);
			if (this.gameSpeedIndex < 15) this.gameSpeedIndex += 1;
			this.makeInterval();
		}
	}


}
