## Pongpo

### Background

Pongpo is a simple but addictive game where you compete against time for a high score. To score points, the player must click on an open intersection of two squares of the same color. New squares are added as time goes on, and the rate at which new squares are added also increases. Clicking an incorrect intersection will cause a jump in speed.


### Functionality & MVP  

With Pongpo, users will be able to:

- [ ] Start, pause, and reset the game
- [ ] Select open intersections to clear blocks and score points
- [ ] Cause a difficulty spike when clicking an incorrect square


In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn,
and the About modal.  Game controls will include Start, Pause, and Reset contained in a header, as well as the current score and number of cleared pairs.

Beneath the header the game-grid will be displayed.

![wireframe](https://github.com/antpensi/pongpo/blob/master/docs/Pongpo.jpg)

### Architecture and Technologies


This project will be implemented with the following technologies:

- Vanilla JavaScript and `jQuery` for overall structure and game logic,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `HTML` elements and rendering them to the DOM.

`game.js`: this script will handle the logic behind the scenes. Logic for determining the intersections for squares will live here. Intervals for speeding up, and interval acceleration will be calculated.

`square.js`: this lightweight script will house the constructor and update functions for the `square` objects. Color will be randomized from a preset list.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above. Goals for the day:

- Get a green bundle with `webpack`

**Day 2**: First, build out the `square` object to connect to the `Board` object.  Then, use `board.js` to create and render at least the square grid. Build ability to populate board on interval. Goals for the day:

- Complete the `square.js` module (constructor, update functions)
- Render a square grid. Make squares clickable and trigger callbacks (although logic may not be implemented yet)

**Day 3**: Create the logic backend.  Build out modular functions for handling clicks on the grid. Correct clicks must clear the squares and update the score, incorrect clicks will reduce interval inbetween new blocks.  Incorporate the logic into the `Board.js` rendering.  Goals for the day:

- Have a functional grid on the frontend that correctly handles clearing squares.
- Have functional incrementing score and interval generating squares.


**Day 4**: Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for game pause, start, reset
- Have a styled game, nice looking header and title


### Bonus features

 Some anticipated updates are:

- [ ] Add stages after all possible square pairs are cleared at a given time. New stage would contain a different 'color palette'. Each stage would be harder to distinguish colors.
- [ ] Add multiple difficulties for starting states (perhaps start on a later stage, or at a faster time)
