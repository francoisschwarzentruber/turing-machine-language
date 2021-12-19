import {
    read, write, left, right, rightmost,
    mark, unmark, mvtomark, isDigit, isLeftMost
} from "./tml.js";


export default class TMLBlock {
    static right() {
        while (isDigit(read())) {
            right();
        }
    }



    /*
    export function blockFindAfter(symbol) {
        let i1 = config.cursorPosition;
        let i2 = _getEndOfBlock(i1);
        let length = i2 - i1;
    
        while (config.read() != symbol && config.read() != "")
            pushConfig(config.right());
        const begin = config.cursorPosition;
    
        if (config.read() != symbol)
            throw ("symbol " + symbol + " not found!");
    
        for (let j = begin + 1; j < config.tape.length - length + 1; j++)
            if (!isDigit(config.getChar(j - 1)) && !isDigit(config.getChar(j + length)) && _sameBlock(i1, j, length)) {
                pushConfig(new Configuration(config.tape, j));
                return true;
            }
        return false;
    }*/

    /**
     * 
     * @param {*} symbol 
     * goto the block of a given adress, kind of symbol[x]
     * where x is mark where an adress (indices) is written
     * symbol is a single symbol
     */
    static findAddress(symbol, x) {
        rightmost();
        while (!isLeftMost()) {
            mark("b");
            if (read() == symbol) {
                right();

                mark("dest");

                mvtomark(x);
                mark("src");

                let found = true;
                while (isDigit(read())) {
                    const a = read();
                    mvtomark("dest");
                    if (a != read()) {
                        unmark("dest");
                        mvtomark("src");
                        unmark("src");
                        found = false;
                        break;
                    }
                    unmark("dest");
                    right();
                    mark("dest");
                    mvtomark("src");
                    unmark("src");
                    right();
                    mark("src");
                }

                if (found) {
                    unmark("src");
                    mvtomark("b");
                    unmark("b");
                    mvtomark("dest");
                    unmark("dest");
                    return true;
                }
            }

            mvtomark("b");
            unmark("b");
            left();

        }

        return false;
    }









    /**
 * @param {*} symbol 
 * @param {*} u 
 * @description create symbol[u] and go in that cell
 */
    static allocateWithAddress(symbol, u) {
        rightmost();
        write("$")
        right();

        write(symbol);

        right();
        this.copy(u);
        this.right();
        write(":");
        right();
        write("0");
    }



    static allocate(u) {
        rightmost();

        right();
        mark(u);
        write("0");
    }




    /**
     * 
     * @param {*} x 
     * copy here the block starting at x
     */
    /*export function blockCopy(x) {
        const newTape = [...config.tape];
        for (let i = _getEndOfBlock(markPositions[x]) - 1; i >= markPositions[x]; i--) {
            newTape.splice(config.cursorPosition, 0, [config.getChar(i), ""]);
        }
        pushConfig(new Configuration(newTape, config.cursorPosition));
    }*/



    /**
     * 
     * @param {*} x 
     * copy here the content of block x
     * the cursor will be one cell after the end of the new copy block
     */
    static copy(x) {
        mark("dest");

        mvtomark(x);
        mark("src");

        while (isDigit(read())) {
            const a = read();
            mvtomark("dest");
            write(a);
            unmark("dest");
            right();
            mark("dest");
            mvtomark("src");
            unmark("src");
            right();
            mark("src");
        }

        unmark("src");
        mvtomark("dest");
        unmark("dest");

        /*
            const newTape = [...config.tape];
            for (let i = _getEndOfBlock(markPositions[x]) - 1; i >= markPositions[x]; i--) {
                newTape.splice(config.cursorPosition, 0, [config.getChar(i), ""]);
            }
            pushConfig(new Configuration(newTape, config.cursorPosition));*/
    }

}




function _getEndOfBlock(pos) {
    while (isDigit(config.getChar(pos))) pos++;
    return pos;
}


/** high-level routines for blocks of digits */

function _sameBlock(i1, j, length) {
    for (let k = 0; k < length; k++) {
        if (config.getChar(i1 + k) != config.getChar(j + k))
            return false;
    }
    return true;
}
