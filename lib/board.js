import Square from './square';

export default class Board {

	constructor() {
		this.grid = this.setupGrid();
	}

	setupGrid() {
		const grid = [];
		let $square;

		for (let rowIdx = 0; rowIdx < 8; rowIdx++) {
			for (let colIdx = 0; colIdx < 11; colIdx++) {
				if (getRandomIntInclusive(1,3) === 1) {
					$square = new Square([rowIdx, colIdx], true); //make a third of squares blank
				} else {
					$square = new Square([rowIdx, colIdx]);
				}
				grid.push($square);
			}
		}
		return grid;
  }

}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
