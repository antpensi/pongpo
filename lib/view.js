import Board from './board.js';
import Square from './square.js';
import Game from './game.js';

export default class View {
	constructor(game, $el) {
		this.game = game;
		this.$el = $el;
		this.board = new Board();

		this.setupBoard();
		this.bindEvents();
	}

	bindEvents() {
    // install a handler on the `li` elements inside the board.
    this.$el.on("click", "li", ( event => {
      const $square = $(event.currentTarget);
      this.makeMove($square);
    }));
  }

	makeMove($square) {
    const pos = $square.data("pos");

    try {
      this.game.playMove(pos);
    } catch (e) {
      // NB: What should I do when player makes invalid move?
			// (i.e. clicks ON a square)
      return;
    }
  }

	setupBoard() {
		const grid = this.board.setupGrid();

    const $ul = $("<ul>");
    $ul.addClass("group");
		for (let i = 0; i < grid.length; i++) {
			$ul.append(grid[i].render());
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
