import Game from './game';
import Board from './board';

$( () => {
  const rootEl = $('.pongpo');
  const board = new Board();
  new Game(board, rootEl);

  const toggleButton = $('.toggle-howto');
  toggleButton.on("click", event => {
    $('.how-to-play-div').toggleClass('shown');
  });
});
