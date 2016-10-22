import Square from './square';

export default class Board {

	constructor() {
		this.stage = 3;
		this.score = 0;
		this.deltas = [
			[-1, 0],
			[0, -1],
			[1, 0],
			[0, 1]
		];

		this.grid = this.setupGrid();

		this.fillRandomSquare = this.fillRandomSquare.bind(this);
		this.isFullBoard = this.isFullBoard.bind(this);
		this.anyValidMoves = this.anyValidMoves.bind(this);
		this.setupGrid = this.setupGrid.bind(this);
	}

	setGrid(grid) {
		this.grid = grid;
	}

	setupGrid() {
		const grid = [];
		let $square;

		for (let rowIdx = 0; rowIdx < 11; rowIdx++) {
			grid.push([]);
			for (let colIdx = 0; colIdx < 8; colIdx++) {
				if (getRandomIntInclusive(1,3) === 1) {
					$square = new Square([rowIdx, colIdx], true, this.stage); //make a third of squares blank
				} else {
					$square = new Square([rowIdx, colIdx], false, this.stage);
				}
				grid[rowIdx].push($square);
			}
		}
		return grid;
  }

	isFullBoard() {
		let full = true;
		for (let i = 0; i < this.grid.length; i++) {
			for (let j = 0; j < this.grid[i].length; j++) {
				if (this.grid[i][j].blank) {
					full = false;
				}
			}
		}
		return full;
	}

	fillRandomSquare() {
		let filled = false;
		let randomX = getRandomIntInclusive(0, 10);
		let randomY = getRandomIntInclusive(0, 7);

		while (!filled) {
			if (this.grid[randomX][randomY].blank) {
				const randomSquare = new Square([randomX, randomY], false, this.stage);
				this.grid[randomX][randomY] = randomSquare;
				this.grid[randomX][randomY].fillSquare();
				filled = true;
			}
			randomX = getRandomIntInclusive(0, 10);
			randomY = getRandomIntInclusive(0, 7);
		}
	}

	isValidMove(pos) {
		if (!pos) return false;
		if (this.grid[pos[0]][pos[1]].blank) {
			return true;
		} else {
			return false;
		}
	}

	handleMove(pos, real=true) {
		let foundMatch;
		let hitSquares =[];

		for (let i = 0; i < this.deltas.length; i++) {
			hitSquares.push(this.nextSolidSquare(pos, this.deltas[i]));
		}
		const colorCount = this.sameColorSquares(hitSquares);
		foundMatch = this.removeSameColorSquares(colorCount, real);
		return foundMatch;
	}

	removeSameColorSquares(colorCount, real=true) {
		const colors = Object.keys(colorCount);
		let foundMatch = false;
		 // if a given color had 2 or more hits, make each of those squares blank
		for (let i = 0; i < colors.length; i++) {
			if (colorCount[colors[i]].length > 1) {
				for (let j = 0; j < colorCount[colors[i]].length; j++) {
					if (real) {
						colorCount[colors[i]][j].makeBlank();
						this.score += 1;
					}
					console.log(`found match for ${colors[i]}`);
					foundMatch = true;
				}
			}
		}
		if (foundMatch) {
			return 1;
		} else {
			return -1;
		}
	}

	sameColorSquares(squares) {
		let colorCount = {};
		for (let i = 0; i < squares.length; i++) {
			if (!squares[i]) continue;

			if (colorCount[squares[i].color]) {
				colorCount[squares[i].color].push(squares[i]);
			} else {
				colorCount[squares[i].color] = [squares[i]];
			}
		}
		return colorCount;
	}

	inBounds(pos) {
		if ((pos[0] < 11 && pos[0] >= 0) && (pos[1] < 8 && pos[1] >= 0)) {
			return true;
		} else {
			return false;
		}
	}

	findAdjacentSquare(pos, delta) {
		const nextX = delta[0] + pos[0];
		const nextY = delta[1] + pos[1];

		if (this.inBounds([nextX, nextY])) {
			const target = this.grid[nextX][nextY];
			return target;
		} else {
			return null;
		}
	}

	nextSolidSquare(pos, delta) {
		let newDX = delta[0];
		let newDY = delta[1];
		let currentSquare = this.findAdjacentSquare(pos, delta);

		if (!currentSquare) return null; // findAdjacentSquare returns null if pos+delta was out of bounds

		// look one square further in delta's direction until square is not blank
		while (currentSquare.blank) {
			newDX += delta[0];
			newDY += delta[1];
			currentSquare = this.findAdjacentSquare(pos, [newDX, newDY]);
			if (!currentSquare) return null;
		}
		return currentSquare;
	}

	anyValidMoves() {
		let move;
		let matches = [];
		for (let rowIdx = 0; rowIdx < 11; rowIdx++) {
			for (let colIdx = 0; colIdx < 8; colIdx++) {
				if (this.grid[rowIdx][colIdx].blank) {
					move = this.handleMove([rowIdx, colIdx], false);
					if (move === 1) {
						matches.push(true);
					}
				}
			}
		}
		if ($.inArray(true, matches) !== -1) { // if any handleMove calls found matches, push a true into array
			return 1;                            // if there were no match-moves left, there will be no 'trues'
		} else {
			return -1;
		}
	}

	updateStage() {
		if (this.stage < 6) {
			this.stage += 1;
		}
	}


}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
