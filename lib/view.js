import Board from './board.js';
import Square from './square.js';
import Game from './game.js';

export default class View {
	constructor($el) {
		this.$el = $el;
		this.board = new Board();
		this.game = new Game(this.board);

		this.drawBoard();
		this.bindEvents();
		this.game.start();
	}

	bindEvents() {
    // install a handler on the `li` elements inside the board.
    this.$el.on("click", "li", ( event => {
      const $square = $(event.currentTarget);
      this.game.makeMove($square);
    }));
  }


	drawBoard() {
		if ($('ul')) $('ul').remove();

		const grid = this.board.grid;
    const $ul = $("<ul>");
    $ul.addClass("group");

		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[i].length; j++) {
				$ul.append(grid[i][j].render());
			}
		}

    this.$el.append($ul);
  }
}
