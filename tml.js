/**
 * The high-level (hum!) Turing machine language!
 */

import { Configuration, createInitialConfiguration } from "./configuration.js";
import TMLMath from "./tmlmath.js";

export let execution = [];
let config = new Configuration([], 0);




export function init() {
    execution = [];
}
function pushConfig(nextConfig) {
    config = nextConfig;
    execution.push(config);
    config.comment = currentComment;
    slider.max = execution.length - 1;
    if (execution.length > 20000)
        throw "execution too long!";
}


let currentComment = "Execution";
export function comment(newComment) {
    currentComment = newComment;
}






export function isLeftMost() { return config.cursorPosition == 0; }





/**
 * 
 * @param {*} inputText 
 * set the input
 */
export function input(inputText) {
    pushConfig(new createInitialConfiguration(inputText));

}



/**
 * basic operations on Turing machines
 */

export function read(x) { return x ? ((config.read() == x) ? x : false) : config.read(); }
export function isMarked(m) { return config.isMark(m); }
export function write(a) { pushConfig(config.write(a)); };

export function right() { pushConfig(config.right()); }
export function left() { pushConfig(config.left()); }
export function accept() { throw "accept" }
export function reject() { throw "reject" }

/** Going at the left and right most part of the tape */

export function leftmost() { pushConfig(new Configuration(config.tape, 0)); }

export function rightmost() {
    while (config.read() != "")
        pushConfig(config.right());
}


/**
 * A tape cell contains a symbol and a possibly a mark
 */

const markPositions = {};

export function mark(x) { pushConfig(config.writeMark(x)); markPositions[x] = config.cursorPosition; }
export function unmark(x) { pushConfig(config.unmark(x)); }

/**export function mvto(x) {
    pushConfig(new Configuration(config.tape, markPositions[x]));
}*/

export function mvtomark(x) {
    while (config.read() != "" && !config.isMark(x))
        right();

    if (config.isMark(x))
        return;

    while (!config.isMark(x) && config.cursorPosition >= 0)
        left();

    if (config.cursorPosition == 0 && !config.isMark(x))
        throw x + " not found in mvto!"
}

export function mvtounmark(x) {
    rightmost();

    while (config.cursorPosition > 0) {
        for (const m of x) {
            if (isMarked(m))
                unmark(m);
        }
        left();
    }
}



export function markmvleft(x) {
    unmark(x);
    left(x);
    mark(x);
}


export function markmvright(x) {
    unmark(x);
    right(x);
    mark(x);
}


export function mvtomarkleft(x) {
    while (!config.isMark(x) && config.cursorPosition >= 0)
        left();

    if (config.cursorPosition == 0)
        throw x + " not found in mvto!"
}


export function equal(x) { return config.getChar(config.cursorPosition) == config.getChar(markPositions[x]) };



export function isDigit(symbol) { return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].indexOf(symbol) >= 0; }

export function choose(array) {
    const i = Math.floor(Math.random() * array.length);
    return array[i];
}


