import Board from './board.js';
import Game from './game.js';

export default class View {
	constructor(game, $el) {
		this.game = game;
		this.$el = $el;

		this.setupBoard();
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

		// $square.addClass(currentPlayer);

    if (this.game.isOver()) {
      // cleanup click handlers.
      this.$el.off("click");
      this.$el.addClass("game-over");
    }
  }

	setupBoard() {
    const $ul = $("<ul>");
    $ul.addClass("group");

    for (let rowIdx = 0; rowIdx < 8; rowIdx++) {
      for (let colIdx = 0; colIdx < 11; colIdx++) {
        let $li = $("<li>");
        $li.data("pos", [rowIdx, colIdx]);

        $ul.append($li);
      }
    }

    this.$el.append($ul);
  }
}
