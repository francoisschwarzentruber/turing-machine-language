import { markmvleft } from "./tml.js";
import {
    read, write, left, right, reject, accept, choose, leftmost, rightmost,
    mark, unmark, mvtomark, mvtomarkleft, equal, comment,
    isDigit
} from "./tml.js";
import TMLBlock from "./tmlblock.js";




export default class TMLMath {

    /**
     * @property the cursor should be in the block
     * @description it increments the number written there
     */
    static inc() {
        while (isDigit(read())) {
            right();
        }
        left();
        while (isDigit(read())) {
            if (read() == "9")
                write("0");
            else {
                write("" + (parseInt(read()) + 1));
                break;
            }

            left();
        }
        if (!isDigit(read()))
            right();
    }

    static isZero() {
        while (isDigit(read())) {
            if (read() != "0")
                return false;
            right();
        }
        left();
        while (isDigit(read())) {
            if (read() != "0")
                return false;
            left();
        }
        if (!isDigit(read()))
            right();
        return true;
    }



    static dec() {
        while (isDigit(read())) {
            right();
        }
        left();
        //on unit digit
        while (isDigit(read())) {
            if (read() == "0")
                write("9");
            else {
                write("" + (parseInt(read()) - 1));
                break;
            }
            left();
        }
        if (!isDigit(read()))
            right();
    }


    /**
     * test whether the current number is smaller than x
     * @param {*} y
     */
    static leq(y) {
        while (isDigit(read())) right();
        left();
        mark("src");

        mvtomark(y);
        while (isDigit(read())) right();
        left();
        mark("dest");

        let leq = true;

        while (true) {
            if (isDigit(read())) {
                const digity = parseInt(read());
                markmvleft("dest");

                mvtomark("src");

                if (isDigit(read())) {
                    const digitx = parseInt(read());

                    markmvleft("src");

                    if (digitx < digity)
                        leq = true;

                    if (digity < digitx)
                        leq = false;

                    mvtomark("dest");
                }
                else {
                    //x is smaller

                    unmark("src");
                    mvtomark("dest");
                    unmark("dest");
                    return true;
                }

            }
            else {
                unmark("dest");
                mvtomark("src");
                if (isDigit(read())) {
                    //y is smaller
                    unmark("dest");
                    mvtomark("src");
                    unmark("src");
                    return false;
                }
                else {
                    unmark("src");
                    return leq;
                }

            }


        }




        return true;
    }


    /**
     * 
     * @param {*} x 
     * @param {*} y 
     * write the sum of x + y in the current block
     */
    static sum(x, y) {
        while (isDigit(read())) right();
        left();
        mark("result");

        mvtomark(y);
        while (isDigit(read())) right();
        left();
        mark("in_y");


        mvtomark(x);
        while (isDigit(read())) right();
        left();
        mark("in_x");


        let r = 0;
        while (true) {
            mvtomark("in_x");
            const rx = read();
            if (isDigit(rx))
                markmvleft("in_x");


            mvtomark("in_y");
            const ry = read();
            if (isDigit(ry))
                markmvleft("in_y");


            const dx = isDigit(rx) ? parseInt(rx) : 0;
            const dy = isDigit(ry) ? parseInt(ry) : 0;

            const s = (dx + dy + r) % 10;
            r = (s >= 10) ? 1 : 0;

            mvtomark("result");

            if (isDigit(read()) || read() == "")
                write("" + s);
            else {
                //overflow!
                if (!read("$")) throw "overflow with sth different from $";
                mvtomark("in_x");
                unmark("in_x");

                mvtomark("in_y");
                unmark("in_y");

                mvtomark("result");
                unmark("result");
                right();
                return;

            }

            markmvleft("result");

            if (!isDigit(rx) && !isDigit(ry) && r == 0)
                break;

        }


        mvtomark("in_x");
        unmark("in_x");

        mvtomark("in_y");
        unmark("in_y");

        mvtomark("result");
        unmark("result");
        left();
        while (isDigit(read())) {
            write("0");
            left();
        }
        right();

    }

}