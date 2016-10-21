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
			2: 2750,
			3: 2500,
			4: 2250,
			5: 2150,
			6: 2000,
			7: 1800,
			8: 1600,
			9: 1400,
			10: 1200,
			11: 1000,
			12: 950,
			13: 900,
			14: 850,
			15: 800,
			16: 750,
			17: 700,
			18: 650,
			19: 600,
			20: 550,
			21: 500,
			22: 450,
			23: 400,
			24: 350,
			25: 300,
			26: 250,
			27: 150,
			28: 100,
			29: 50,
			30: 20,
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
		let move;
		if (this.board.isValidMove(pos)) {
			// console.log(`move at ${pos}`);
			move = this.board.handleMove(pos);
			if (move === -1) {
				clearInterval(window.intervalId);
				if (this.gameSpeedIndex < 30) this.gameSpeedIndex += 1;
				this.makeInterval();
			}
	 	} else {
			clearInterval(window.intervalId);
			if (this.gameSpeedIndex < 30) this.gameSpeedIndex += 1;
			this.makeInterval();
		}
	}


}
