// @ts-check
/* jslint es6 */
const { Board, Led } = require('johnny-five'),
      chalk = require('chalk'),
      board = new Board(),
      { log } = console,
      clog = (msg, type) => log(chalk.default[type||'green'](msg))

board.on('ready', () => {
    clog('The Board is Ready!..', 'red');
    const led1 = new Led(2);
    led1.blink(1000);
});