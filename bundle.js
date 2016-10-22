/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _board = __webpack_require__(3);
	
	var _board2 = _interopRequireDefault(_board);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	$(function () {
	  var rootEl = $('.pongpo');
	  var board = new _board2.default();
	  new _game2.default(board, rootEl);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _board = __webpack_require__(3);
	
	var _board2 = _interopRequireDefault(_board);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
		function Game(board, $el) {
			_classCallCheck(this, Game);
	
			this.$el = $el;
			this.board = board;
			this.stage = this.board.stage;
			this.score = this.board.score;
			this.scoreBoard = $('.scoreboard');
			this.isPaused = true;
			this.time = 0;
			this.output = $('.time');
			this.gameSpeedIndex = 1;
			this.gameSpeeds = {
				1: 3000,
				2: 2750,
				3: 2500,
				4: 2250,
				5: 2150,
				6: 2000,
				7: 1800,
				8: 1600,
				9: 1400,
				10: 1200,
				11: 1000,
				12: 950,
				13: 900,
				14: 850,
				15: 800,
				16: 750,
				17: 700,
				18: 650,
				19: 600,
				20: 550,
				21: 500,
				22: 450,
				23: 400,
				24: 350,
				25: 300,
				26: 250,
				27: 150,
				28: 100,
				29: 50,
				30: 20
			};
	
			this.start = this.start.bind(this);
			this.makeInterval = this.makeInterval.bind(this);
			this.nextGameState = this.nextGameState.bind(this);
			this.nextStage = this.nextStage.bind(this);
			this.drawNextStage = this.drawNextStage.bind(this);
			this.resetGame = this.resetGame.bind(this);
			this.unbindEvents = this.unbindEvents.bind(this);
			this.bindEvents = this.bindEvents.bind(this);
	
			this.drawNextStage();
			this.start();
		}
	
		_createClass(Game, [{
			key: 'start',
			value: function start() {
				var _this = this;
	
				// on interval tell the board to fill a random blank square
				// window.intervalId = setInterval(this.nextGameState, 1000);
				$('.pause').on('click', function (e) {
					e.preventDefault();
					_this.isPaused = true;
					_this.unbindEvents();
				}).bind(this);
	
				$('.start').on('click', function (e) {
					e.preventDefault();
					_this.isPaused = false;
					_this.bindEvents();
				}).bind(this);
	
				$('.restart').on('click', function (e) {
					e.preventDefault();
					_this.resetGame();
				}).bind(this);
	
				this.makeInterval();
			}
		}, {
			key: 'unbindEvents',
			value: function unbindEvents() {
				this.$el.off("click", "li");
			}
		}, {
			key: 'bindEvents',
			value: function bindEvents() {
				var _this2 = this;
	
				this.$el.on("click", "li", function (event) {
					var $square = $(event.currentTarget);
					_this2.makeMove($square);
				});
			}
	
			// makeInterval() {
			// 	const that = this;
			// 	window.intervalId = setInterval( () => {
			// 		if (!this.isPaused) {
			// 			that.time += this.gameSpeed[this.gameSpeedIndex] / 1000; // that.time should be time in seconds
			//
			// 			if (that.time % 5 === 0) { //increment speed if it's been 5 seconds
			// 				clearInterval(window.intervalId);
			// 				if (this.gameSpeedIndex < 30) this.gameSpeedIndex += 1;
			// 				this.makeInterval();
			// 			}
			//
			// 			that.output.text('Game Speed: ' + that.gameSpeedIndex);
			// 			that.scoreBoard.text(`Score: ${that.board.score}`);
			// 			$('.paused').text('Running');
			// 			that.nextGameState();
			// 		} else {
			// 			$('.paused').text('Paused');
			// 		}
			// 	}, that.gameSpeeds[that.gameSpeedIndex]);
			// }
	
		}, {
			key: 'makeInterval',
			value: function makeInterval() {
				var _this3 = this;
	
				var that = this;
				window.intervalId = setInterval(function () {
					if (!_this3.isPaused) {
						that.time += 20; // that.time should be time in milliseconds
						if (that.time % that.gameSpeeds[that.gameSpeedIndex] === 0) {
							that.nextGameState();
						}
	
						if (that.time % 25000 === 0) {
							//increment speed if it's been 25 seconds
							if (that.gameSpeedIndex < 30) that.gameSpeedIndex += 1;
						}
	
						that.output.text('Game Speed: ' + that.gameSpeedIndex);
						that.scoreBoard.text('Score: ' + that.board.score);
						$('.paused').text('Play!');
					} else {
						$('.paused').text('Paused');
					}
				}, 20); // 50 refreshes a second
			}
		}, {
			key: 'nextGameState',
			value: function nextGameState() {
				if (this.board.isFullBoard()) {
					// console.log('game over');
					$('.game-over').text('Game Over!');
					clearInterval(window.intervalId);
				} else {
					this.board.fillRandomSquare();
				}
			}
		}, {
			key: 'makeMove',
			value: function makeMove($square) {
				var pos = $square.data("pos");
				this.playMove(pos);
			}
		}, {
			key: 'nextStage',
			value: function nextStage() {
				clearInterval(window.intervalId);
				this.board.updateStage();
				var newGrid = this.board.setupGrid();
				this.board.setGrid(newGrid);
				this.drawNextStage();
				this.makeInterval();
			}
		}, {
			key: 'drawNextStage',
			value: function drawNextStage() {
				if ($('.game-board')) $('.game-board').remove();
				var grid = this.board.grid;
				var $ul = $("<ul>");
				$ul.addClass("group");
				$ul.addClass("game-board");
	
				for (var i = 0; i < grid.length; i++) {
					for (var j = 0; j < grid[i].length; j++) {
						$ul.append(grid[i][j].render());
					}
				}
	
				this.$el.append($ul);
			}
		}, {
			key: 'resetGame',
			value: function resetGame() {
				if (window.intervalId) clearInterval(window.intervalId);
				$('.game-over').text(' ');
				this.gameSpeedIndex = 1;
				this.board = new _board2.default();
				this.score = this.board.score;
				this.stage = this.board.stage;
				this.board.setupGrid();
				this.drawNextStage();
				this.makeInterval();
			}
		}, {
			key: 'playMove',
			value: function playMove(pos) {
				var move = void 0;
				var anyValids = void 0;
				if (this.board.isValidMove(pos)) {
					// console.log(`move at ${pos}`);
					move = this.board.handleMove(pos);
					if (move === -1) {
						// clearInterval(window.intervalId);
						if (this.gameSpeedIndex < 30) this.gameSpeedIndex += 1;
						// this.makeInterval();
					}
					anyValids = this.board.anyValidMoves();
					if (anyValids === -1) {
						// console.log('NO VALID MOVES LEFT!');
						if (this.board.stage < 7) {
							this.nextStage();
						}
					}
				} else {
					// clearInterval(window.intervalId);
					if (this.gameSpeedIndex < 30) this.gameSpeedIndex += 1;
					// this.makeInterval();
				}
			}
		}]);
	
		return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _square = __webpack_require__(4);
	
	var _square2 = _interopRequireDefault(_square);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = function () {
		function Board() {
			_classCallCheck(this, Board);
	
			this.stage = 1;
			this.score = 0;
			this.deltas = [[-1, 0], [0, -1], [1, 0], [0, 1]];
	
			this.grid = this.setupGrid();
	
			this.fillRandomSquare = this.fillRandomSquare.bind(this);
			this.isFullBoard = this.isFullBoard.bind(this);
			this.anyValidMoves = this.anyValidMoves.bind(this);
			this.setupGrid = this.setupGrid.bind(this);
		}
	
		_createClass(Board, [{
			key: 'setGrid',
			value: function setGrid(grid) {
				this.grid = grid;
			}
		}, {
			key: 'setupGrid',
			value: function setupGrid() {
				var grid = [];
				var $square = void 0;
	
				for (var rowIdx = 0; rowIdx < 11; rowIdx++) {
					grid.push([]);
					for (var colIdx = 0; colIdx < 8; colIdx++) {
						if (getRandomIntInclusive(1, 3) === 1) {
							$square = new _square2.default([rowIdx, colIdx], true, this.stage); //make a third of squares blank
						} else {
							$square = new _square2.default([rowIdx, colIdx], false, this.stage);
						}
						grid[rowIdx].push($square);
					}
				}
				return grid;
			}
		}, {
			key: 'isFullBoard',
			value: function isFullBoard() {
				var full = true;
				for (var i = 0; i < this.grid.length; i++) {
					for (var j = 0; j < this.grid[i].length; j++) {
						if (this.grid[i][j].blank) {
							full = false;
						}
					}
				}
				return full;
			}
		}, {
			key: 'fillRandomSquare',
			value: function fillRandomSquare() {
				var filled = false;
				var randomX = getRandomIntInclusive(0, 10);
				var randomY = getRandomIntInclusive(0, 7);
	
				while (!filled) {
					if (this.grid[randomX][randomY].blank) {
						var randomSquare = new _square2.default([randomX, randomY], false, this.stage);
						this.grid[randomX][randomY] = randomSquare;
						this.grid[randomX][randomY].fillSquare();
						filled = true;
					}
					randomX = getRandomIntInclusive(0, 10);
					randomY = getRandomIntInclusive(0, 7);
				}
			}
		}, {
			key: 'isValidMove',
			value: function isValidMove(pos) {
				if (!pos) return false;
				if (this.grid[pos[0]][pos[1]].blank) {
					return true;
				} else {
					return false;
				}
			}
		}, {
			key: 'handleMove',
			value: function handleMove(pos) {
				var real = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
				var foundMatch = void 0;
				var hitSquares = [];
	
				for (var i = 0; i < this.deltas.length; i++) {
					hitSquares.push(this.nextSolidSquare(pos, this.deltas[i]));
				}
				var colorCount = this.sameColorSquares(hitSquares);
				foundMatch = this.removeSameColorSquares(colorCount, real);
				return foundMatch;
			}
		}, {
			key: 'removeSameColorSquares',
			value: function removeSameColorSquares(colorCount) {
				var real = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
				var colors = Object.keys(colorCount);
				var foundMatch = false;
				// if a given color had 2 or more hits, make each of those squares blank
				for (var i = 0; i < colors.length; i++) {
					if (colorCount[colors[i]].length > 1) {
						for (var j = 0; j < colorCount[colors[i]].length; j++) {
							if (real) {
								colorCount[colors[i]][j].makeBlank();
								this.score += 1 * this.stage;
							}
							// console.log(`found match for ${colors[i]}`);
							foundMatch = true;
						}
					}
				}
				if (foundMatch) {
					return 1;
				} else {
					return -1;
				}
			}
		}, {
			key: 'sameColorSquares',
			value: function sameColorSquares(squares) {
				var colorCount = {};
				for (var i = 0; i < squares.length; i++) {
					if (!squares[i]) continue;
	
					if (colorCount[squares[i].color]) {
						colorCount[squares[i].color].push(squares[i]);
					} else {
						colorCount[squares[i].color] = [squares[i]];
					}
				}
				return colorCount;
			}
		}, {
			key: 'inBounds',
			value: function inBounds(pos) {
				if (pos[0] < 11 && pos[0] >= 0 && pos[1] < 8 && pos[1] >= 0) {
					return true;
				} else {
					return false;
				}
			}
		}, {
			key: 'findAdjacentSquare',
			value: function findAdjacentSquare(pos, delta) {
				var nextX = delta[0] + pos[0];
				var nextY = delta[1] + pos[1];
	
				if (this.inBounds([nextX, nextY])) {
					var target = this.grid[nextX][nextY];
					return target;
				} else {
					return null;
				}
			}
		}, {
			key: 'nextSolidSquare',
			value: function nextSolidSquare(pos, delta) {
				var newDX = delta[0];
				var newDY = delta[1];
				var currentSquare = this.findAdjacentSquare(pos, delta);
	
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
		}, {
			key: 'anyValidMoves',
			value: function anyValidMoves() {
				var move = void 0;
				var matches = [];
				for (var rowIdx = 0; rowIdx < 11; rowIdx++) {
					for (var colIdx = 0; colIdx < 8; colIdx++) {
						if (this.grid[rowIdx][colIdx].blank) {
							move = this.handleMove([rowIdx, colIdx], false);
							if (move === 1) {
								matches.push(true);
							}
						}
					}
				}
				if ($.inArray(true, matches) !== -1) {
					// if any handleMove calls found matches, push a true into array
					return 1; // if there were no match-moves left, there will be no 'trues'
				} else {
					return -1;
				}
			}
		}, {
			key: 'updateStage',
			value: function updateStage() {
				if (this.stage < 6) {
					this.stage += 1;
				}
			}
		}]);
	
		return Board;
	}();
	
	exports.default = Board;
	
	
	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Square = function () {
		function Square(pos) {
			var blank = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
			var stage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	
			_classCallCheck(this, Square);
	
			this.blank = blank;
			this.pos = pos;
			this.stage = stage;
	
			this.color = this.randomColor();
		}
	
		_createClass(Square, [{
			key: 'colors',
			value: function colors() {
				return {
					1: {
						orange: '(244, 100, 5)',
						purple: '(152, 88, 174)',
						dgreen: '(48, 140, 63)',
						magenta: '(238, 0, 106)',
						yellow: '(247, 176, 31)',
						lblue: '(118, 199, 220)',
						blue: '(59, 140, 205)',
						lgreen: '(134, 200, 80)'
					},
	
					2: {
						orange2: '(255, 167, 3)',
						purple2: '(160, 81, 244)',
						dgreen2: '(20, 166, 129)',
						magenta2: '(245, 98, 171)',
						yellow2: '(240, 219, 103)',
						lblue2: '(58, 201, 199)',
						blue2: '(96, 156, 252)',
						lgreen2: '(107, 179, 20)'
					},
	
					3: {
						fallred: '(207, 21, 21)',
						mulberry: '(148, 19, 79)',
						brown: '(105, 43, 29)',
						paleyellow: '(255, 201, 115)',
						lightorange: '(255, 145, 0)',
						orange: '(240, 109, 22)',
						fallred2: '(245, 153, 125)',
						brown2: '(181, 72, 0)'
					},
	
					4: {
						christmas1: '(173, 43, 43)',
						christmas2: '(235, 19, 19)',
						christmas3: '(245, 96, 88)',
						christmas4: '(18, 77, 32)',
						christmas5: '(109, 168, 124)',
						christmas6: '(46, 133, 5)',
						christmas7: '(92, 36, 36)',
						christmas8: '(143, 143, 143)'
					},
	
					5: {
						blue1: '(33, 105, 237)',
						blue2: '(77, 147, 227)',
						blue3: '(116, 190, 242)',
						blue4: '(103, 189, 199)',
						blue5: '(64, 158, 184)',
						blue6: '(50, 114, 153)',
						blue7: '(13, 77, 166)',
						blue8: '(173, 215, 237)'
					},
	
					6: {
						pink1: '(255, 181, 186)',
						pink2: '(224, 121, 176)',
						pink3: '(245, 169, 217)',
						pink4: '(250, 142, 142)',
						pink5: '(232, 161, 139)',
						pink6: '(235, 96, 96)',
						pink7: '(214, 133, 156)',
						pink8: '(250, 135, 173)'
					},
	
					7: {
						neon1: '(235, 50, 21)',
						neon2: '(255, 0, 136)',
						neon3: '(255, 5, 255)',
						neon4: '(131, 21, 235)',
						neon5: '(36, 105, 255)',
						neon6: '(0, 255, 34)',
						neon7: '(0, 242, 255)',
						neon8: '(255, 255, 0)'
					},
	
					8: {
						grey1: '(96, 96, 96)',
						grey2: '(97, 73, 73)',
						grey3: '(78, 87, 110)',
						grey4: '(77, 87, 77)',
						grey5: '(89, 69, 89)',
						grey6: '(122, 105, 120)',
						grey7: '(115, 107, 99)',
						grey8: '(138, 112, 112)'
					}
				};
			}
		}, {
			key: 'randomColor',
			value: function randomColor() {
				if (this.blank) return '(226, 224, 225)'; // gray
				var colors = this.colors()[this.stage];
				var randomKey = shuffle(Object.keys(colors))[0];
				return colors[randomKey];
			}
		}, {
			key: 'fillSquare',
			value: function fillSquare() {
				var $li = $(document.getElementById(this.pos));
				$li.css('background-color', 'rgb' + this.color);
			}
		}, {
			key: 'makeBlank',
			value: function makeBlank() {
				this.blank = true;
				var $li = $(document.getElementById(this.pos));
				$li.css('background-color', 'rgb(226, 224, 225)');
				$li.addClass('blank');
			}
		}, {
			key: 'render',
			value: function render() {
				var $li = $("<li>");
				$li.css('background-color', 'rgb' + this.color);
				if (this.blank) {
					$li.addClass('blank');
				}
				$li.data("pos", this.pos);
				$li.attr('id', this.pos);
				return $li;
			}
		}]);
	
		return Square;
	}();
	
	exports.default = Square;
	
	
	function shuffle(array) {
		var currentIndex = array.length,
		    temporaryValue,
		    randomIndex;
	
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
	
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
	
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
	
		return array;
	}
	
	// Colors:
	// 244	100	5 orange
	// 152	88	174 purple
	// 48	140	63 dgreen
	// 238	0	106	magenta/red
	// 247	176	31	yellow
	// 118	199	220	lblue
	// 59	140	205	blue
	// 134	200	80	lgreen

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map