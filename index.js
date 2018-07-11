// @ts-check
/* jslint es6 */
const { Board, Led, Piezo } = require('johnny-five'),
      chalk = require('chalk'),
      board = new Board(),
      { log } = console,
      clog = (msg, type) => log(chalk.default[type||'green'](msg))

board.on('ready', () => {
    clog('The Board is Ready!..', 'red');
    const led1 = new Led(5);
    let buzzer = new Piezo(13);
    let bright = 0;
    let ledBrightness = setInterval(()=>{
        led1.brightness(bright+=10);
        if (bright>=255) {
            clearInterval(ledBrightness);
            led1.on();
            buzzer.play({
                tempo: 150, // Beats per minute, default 150
                song: [ // An array of notes that comprise the tune
                  [ "c4", 1 ], // Each element is an array in which 
                               // [0] is the note to play and 
                               //[1] is the duration in "beats" (tempo, above)
                  [ "e4", 2 ],
                  [ "g4", 3 ],
                  [ null, 4 ] // null indicates "no tone" for the beats indicated
                ]
              },()=>{
                console.log('buzzer sound');
            });
        }
    }, 200);


});