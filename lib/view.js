import Board from './board.js';
import Square from './square.js';
import Game from './game.js';

export default class View {
	constructor($el) {
		this.$el = $el;
		this.board = new Board();
		this.game = new Game(this.board);

		this.setupBoard();
		this.bindEvents();
	}

	bindEvents() {
    // install a handler on the `li` elements inside the board.
    this.$el.on("click", "li", ( event => {
      const $square = $(event.currentTarget);
      this.game.makeMove($square);
    }));
  }


	setupBoard() {
		const grid = this.board.setupGrid();

    const $ul = $("<ul>");
    $ul.addClass("group");
		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[0].length; j++) {
				$ul.append(grid[i][j].render());
			}
		}

    // for (let rowIdx = 0; rowIdx < 8; rowIdx++) {
    //   for (let colIdx = 0; colIdx < 11; colIdx++) {
    //     let $square = new Square([rowIdx, colIdx]);
		//
    //     $ul.append($square.render());
    //   }
    // }

    this.$el.append($ul);
  }
}
