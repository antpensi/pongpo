import Square from './square';

export default class Board {

	constructor() {
		this.grid = this.setupGrid();
		this.deltas = [
			[-1, 0],
			[0, -1],
			[1, 0],
			[0, 1]
		];
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

	isValidMove(pos) {
		if (this.grid[pos[0]][pos[1]].blank) {
			return true;
		} else {
			return false;
		}
	}

	handleMove(pos) {
		debugger
		const testSquare = this.nextSolidSquare(pos, this.deltas[0]);
	}

	inBounds(pos) {
		if ((pos[0] < 8 || pos[0] >= 0) || (pos[1] < 11 || pos[1] >= 0)) {
			return true;
		} else {
			return false;
		}
	}

	findAdjacentSquare(pos, delta) {
		const nextX = delta[0] + pos[0];
		const nextY = delta[1] + pos[1];

		if (inBounds([nextX, nextY])) {
			const target = this.grid[nextX][nextY];
			return target;
		} else {
			return null;
		}
	}

	nextSolidSquare(pos, delta) {
		let currentSquare = findAdjacentSquare(pos, delta);

		if (!currentSquare) return null; // findAdjacentSquare returns null if pos+delta was out of bounds

		// look one square further in delta's direction until square is not blank
		while (currentSquare.blank) {
			let newDX = delta[0] + delta[0];
			let newDY = delta[1] + delta[1];
			currentSquare = findAdjacentSquare(pos, [newDX, newDY]);
		}

		return currentSquare;
	}


}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
