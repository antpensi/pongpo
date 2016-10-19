import Game from './game';
import View from './view';

$( () => {
  const rootEl = $('.pongpo');
	const game = new Game();
	new View(game, rootEl);
});

 // 29
