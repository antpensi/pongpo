import Board from './board';

export default class Game {
	constructor(board, $el) {
		this.$el = $el;
		this.board = board;
		this.stage = this.board.stage;
		this.score = this.board.score;
		this.scoreBoard = $('.scoreboard');
		this.isPaused = true;
		this.time = 0;
		this.output = $('.time');
		this.gameSpeedIndex = 0;
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
			31: 10,
			32: 5,
			33: 1,
		};

		this.start = this.start.bind(this);
		this.makeInterval = this.makeInterval.bind(this);
		this.nextGameState = this.nextGameState.bind(this);
		this.nextStage = this.nextStage.bind(this);
		this.drawNextStage = this.drawNextStage.bind(this);
		this.resetGame = this.resetGame.bind(this);
		this.unbindEvents = this.unbindEvents.bind(this);
		this.bindEvents = this.bindEvents.bind(this);

		this.drawNextStage();
		this.start();
	}

	start() {
		// on interval tell the board to fill a random blank square
		$('.pause').on('click', (e) => {
		  e.preventDefault();
		  this.isPaused = true;
			this.unbindEvents();
		}).bind(this);

		$('.start').on('click', (e) => {
		  e.preventDefault();
		  this.isPaused = false;
			this.bindEvents();
		}).bind(this);

		$('.restart').on('click', (e) => {
		  e.preventDefault();
		  this.resetGame();
		}).bind(this);

		this.makeInterval();

	}

	unbindEvents() {
		this.$el.off("click", "li");
	}

	bindEvents() {
		this.$el.on("click", "li", ( event => {
      const $square = $(event.currentTarget);
      this.makeMove($square);
    }));
	}

	makeInterval() {
		const that = this;
		window.intervalId = setInterval( () => {
			if (!this.isPaused) {
				that.time += 20; // that.time should be time in milliseconds

				that.scoreBoard.text(`Score: ${that.board.score}`);
				$('.paused').text('Play!');

				if (that.time % (that.gameSpeeds[that.gameSpeedIndex]) === 0 ) {
					that.nextGameState();
				}

				if (that.time % 25000 === 0) { //increment speed if it's been 25 seconds
					if (that.gameSpeedIndex < 30) that.gameSpeedIndex += 1;
				}
				that.output.text('Speed: ' + that.gameSpeedIndex); // Write speed to screen after it might have been incremented

			} else {
				$('.paused').text('Paused');
			}
		}, 20); // 50 refreshes a second
	}

	nextGameState() {
		if (this.board.isFullBoard()) {
			$('.paused').text('Game Over!');
			clearInterval(window.intervalId);
		} else {
			this.board.fillRandomSquare();
		}
	}

	makeMove($square) {
		const pos = $square.data("pos");
		this.playMove(pos);
	}

	nextStage() {
		clearInterval(window.intervalId);
		this.board.updateStage();
		const newGrid = this.board.setupGrid();
		this.board.setGrid(newGrid);
		this.drawNextStage();
		this.makeInterval();
	}

	drawNextStage() {
		if ( $('.game-board') ) $('.game-board').remove();
		const grid = this.board.grid;
		const $ul = $("<ul>");
		$ul.addClass("group");
		$ul.addClass("game-board");

		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[i].length; j++) {
				$ul.append(grid[i][j].render());
			}
		}

		this.$el.append($ul);
	}

	resetGame() {
		if (window.intervalId) clearInterval(window.intervalId);
		$('.game-over').text(' ');
		this.gameSpeedIndex = 0;
		this.board = new Board();
		this.score = this.board.score;
		this.stage = this.board.stage;
		this.board.setupGrid();
		this.drawNextStage();
		this.makeInterval();
	}


	playMove(pos) {
		let move;
		let anyValids;
		if (this.board.isValidMove(pos)) {
			move = this.board.handleMove(pos);
			if (move === -1) {
				if (this.gameSpeedIndex < 30) this.gameSpeedIndex += 1;
			}
			anyValids = this.board.anyValidMoves();
			if (anyValids === -1) {
				if (this.board.stage < 7) {
					this.nextStage();
				}
			}
	 	} else {
			if (this.gameSpeedIndex < 30) this.gameSpeedIndex += 1;
		}
	}


}
