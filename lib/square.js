export default class Square {
	constructor(pos) {
		this.color = this.randomColor();
		this.pos = pos;
	}

	colors() {
		return (
			{
				orange: '(244, 100, 5)',
				purple: '(152, 88, 174)',
				dgreen: '(48, 140, 63)',
				magenta: '(238, 0, 106)',
				yellow: '(247, 176, 31)',
				lblue: '(118, 199, 220)',
				blue: '(59, 140, 205)',
				lgreen: '(134, 200, 80)'
			}
		);
	}

	randomColor() {
		const colors = this.colors();
		const randomKey = shuffle(Object.keys(colors))[0];
		return colors[randomKey];
	}

	render() {
		const $li = $("<li>");
		$li.css('background-color', `rgb${this.color}`);
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
