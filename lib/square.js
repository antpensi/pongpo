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
				orange2: '(242, 169, 121)',
				purple2: '(172, 132, 186)',
				dgreen2: '(132, 179, 140)',
				magenta2: '(237, 135, 181)',
				yellow2: '(245, 210, 140)',
				lblue2: '(146, 200, 214)',
				blue2: '(100, 154, 196)',
				lgreen2: '(163, 186, 143)'
			},

			3: {
				fallred: '(207, 21, 21)',
				mulberry: '(148, 19, 79)',
				brown: '(105, 43, 29)',
				paleyellow: '(255, 201, 115)',
				lightorange: '(255, 145, 0)',
				orange: '(240, 109, 22)',
				brown1: '(179, 83, 64)',
				brown2: '(181, 72, 0)'
			},

			4: {

			},

			5: {

			},

			6: {

			},

			7: {

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
