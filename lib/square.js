export default class Square {
	constructor(pos, blank=false, stage=1) {
		this.blank = blank;
		this.pos = pos;
		this.stage = stage;

		this.color = this.randomColor();
	}

	colors() {
		return ( {
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
		}
		);
	}

	randomColor() {
		if (this.blank) return '(226, 224, 225)'; // gray
		const colors = this.colors()[this.stage];
		const randomKey = shuffle(Object.keys(colors))[0];
		return colors[randomKey];
	}


	fillSquare() {
		const $li = $(document.getElementById(this.pos));
		$li.css('background-color', `rgb${this.color}`);
	}

	makeBlank() {
		this.blank = true;
		const $li = $(document.getElementById(this.pos));
		$li.css('background-color', 'rgb(226, 224, 225)');
		$li.addClass('blank');
	}

	render() {
		const $li = $("<li>");
		$li.css('background-color', `rgb${this.color}`);
		if (this.blank) {
			$li.addClass('blank');
		}
		$li.data("pos", this.pos);
		$li.attr('id', this.pos);
		return (
			$li
		);
	}
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

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
