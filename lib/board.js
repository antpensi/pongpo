import Square from './square';

export default class Board {

	constructor() {
		this.grid = this.setupGrid();
		this.score = 0;
		this.deltas = [
			[-1, 0],
			[0, -1],
			[1, 0],
			[0, 1]
		];

		this.fillRandomSquare = this.fillRandomSquare.bind(this);
		this.isFullBoard = this.isFullBoard.bind(this);
	}

	setupGrid() {
		const grid = [];
		let $square;

		for (let rowIdx = 0; rowIdx < 11; rowIdx++) {
			grid.push([]);
			for (let colIdx = 0; colIdx < 8; colIdx++) {
				if (getRandomIntInclusive(1,3) === 1) {
					$square = new Square([rowIdx, colIdx], true); //make a third of squares blank
				} else {
					$square = new Square([rowIdx, colIdx]);
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
				const randomSquare = new Square([randomX, randomY]);
				this.grid[randomX][randomY] = randomSquare;
				this.grid[randomX][randomY].fillSquare();
				filled = true;
			}
			randomX = getRandomIntInclusive(0, 10);
			randomY = getRandomIntInclusive(0, 7);
		}
	}

	isValidMove(pos) {
		if (this.grid[pos[0]][pos[1]].blank) {
			return true;
		} else {
			return false;
		}
	}

	handleMove(pos) {
		let hitSquares =[];

		for (let i = 0; i < this.deltas.length; i++) {
			hitSquares.push(this.nextSolidSquare(pos, this.deltas[i]));
		}
		const colorCount = this.sameColorSquares(hitSquares);
		this.removeSameColorSquares(colorCount);

	}

	removeSameColorSquares(colorCount) {
		const colors = Object.keys(colorCount);
		 // if a given color had 2 or more hits, make each of those squares blank
		for (let i = 0; i < colors.length; i++) {
			if (colorCount[colors[i]].length > 1) {
				for (let j = 0; j < colorCount[colors[i]].length; j++) {
					colorCount[colors[i]][j].makeBlank();
					this.score += 1;
				}
			}
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


}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
