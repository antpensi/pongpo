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
	
	var _view = __webpack_require__(2);
	
	var _view2 = _interopRequireDefault(_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	$(function () {
	  var rootEl = $('.pongpo');
	  new _view2.default(rootEl);
	});
	
	// 29

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
		function Game(board) {
			_classCallCheck(this, Game);
	
			this.board = board;
		}
	
		_createClass(Game, [{
			key: "makeMove",
			value: function makeMove($square) {
				var pos = $square.data("pos");
	
				try {
					this.playMove(pos);
				} catch (e) {
					// NB: What should I do when player makes invalid move?
					// (i.e. clicks ON a square)
					return;
				}
			}
		}, {
			key: "playMove",
			value: function playMove(pos) {
				if (this.board.isValidMove(pos)) {
					console.log("move at " + pos);
					this.board.handleMove(pos);
				} else {
					console.log("invalid!");
				}
			}
		}]);
	
		return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _board = __webpack_require__(3);
	
	var _board2 = _interopRequireDefault(_board);
	
	var _square = __webpack_require__(4);
	
	var _square2 = _interopRequireDefault(_square);
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var View = function () {
	  function View($el) {
	    _classCallCheck(this, View);
	
	    this.$el = $el;
	    this.board = new _board2.default();
	    this.game = new _game2.default(this.board);
	
	    this.setupBoard();
	    this.bindEvents();
	  }
	
	  _createClass(View, [{
	    key: 'bindEvents',
	    value: function bindEvents() {
	      var _this = this;
	
	      // install a handler on the `li` elements inside the board.
	      this.$el.on("click", "li", function (event) {
	        var $square = $(event.currentTarget);
	        _this.game.makeMove($square);
	      });
	    }
	  }, {
	    key: 'setupBoard',
	    value: function setupBoard() {
	      var grid = this.board.grid;
	      var $ul = $("<ul>");
	      $ul.addClass("group");
	
	      for (var i = 0; i < grid.length; i++) {
	        for (var j = 0; j < grid[i].length; j++) {
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
	  }]);
	
	  return View;
	}();
	
	exports.default = View;

/***/ },
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
	
			this.grid = this.setupGrid();
			this.deltas = [[-1, 0], [0, -1], [1, 0], [0, 1]];
		}
	
		_createClass(Board, [{
			key: 'setupGrid',
			value: function setupGrid() {
				var grid = [];
				var $square = void 0;
	
				for (var rowIdx = 0; rowIdx < 11; rowIdx++) {
					grid.push([]);
					for (var colIdx = 0; colIdx < 8; colIdx++) {
						if (getRandomIntInclusive(1, 3) === 1) {
							$square = new _square2.default([rowIdx, colIdx], true); //make a third of squares blank
						} else {
							$square = new _square2.default([rowIdx, colIdx]);
						}
						grid[rowIdx].push($square);
					}
				}
				return grid;
			}
		}, {
			key: 'isValidMove',
			value: function isValidMove(pos) {
				if (this.grid[pos[0]][pos[1]].blank) {
					return true;
				} else {
					return false;
				}
			}
		}, {
			key: 'handleMove',
			value: function handleMove(pos) {
				debugger;
				var testSquare = this.nextSolidSquare(pos, this.deltas[0]);
			}
		}, {
			key: 'inBounds',
			value: function inBounds(pos) {
				if (pos[0] < 8 || pos[0] >= 0 || pos[1] < 11 || pos[1] >= 0) {
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
	
				if (inBounds([nextX, nextY])) {
					var target = this.grid[nextX][nextY];
					return target;
				} else {
					return null;
				}
			}
		}, {
			key: 'nextSolidSquare',
			value: function nextSolidSquare(pos, delta) {
				var currentSquare = findAdjacentSquare(pos, delta);
	
				if (!currentSquare) return null; // findAdjacentSquare returns null if pos+delta was out of bounds
	
				// look one square further in delta's direction until square is not blank
				while (currentSquare.blank) {
					var newDX = delta[0] + delta[0];
					var newDY = delta[1] + delta[1];
					currentSquare = findAdjacentSquare(pos, [newDX, newDY]);
				}
	
				return currentSquare;
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
	
			_classCallCheck(this, Square);
	
			this.blank = blank;
			this.pos = pos;
	
			this.color = this.randomColor();
		}
	
		_createClass(Square, [{
			key: 'colors',
			value: function colors() {
				return {
					orange: '(244, 100, 5)',
					purple: '(152, 88, 174)',
					dgreen: '(48, 140, 63)',
					magenta: '(238, 0, 106)',
					yellow: '(247, 176, 31)',
					lblue: '(118, 199, 220)',
					blue: '(59, 140, 205)',
					lgreen: '(134, 200, 80)'
				};
			}
		}, {
			key: 'randomColor',
			value: function randomColor() {
				if (this.blank) return '(226, 224, 225)'; // gray
	
				var colors = this.colors();
				var randomKey = shuffle(Object.keys(colors))[0];
				return colors[randomKey];
			}
		}, {
			key: 'render',
			value: function render() {
				var $li = $("<li>");
				$li.css('background-color', 'rgb' + this.color);
				$li.data("pos", this.pos);
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