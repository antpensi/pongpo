import Game from './game';
import Board from './board';

$( () => {
  const rootEl = $('.pongpo');
  const board = new Board();
  new Game(board, rootEl);
});
