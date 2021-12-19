import {
    read, write, left, right, reject, accept, choose, leftmost, rightmost,
    mark, unmark, mvtomark, mvtomarkleft, equal, comment,
    isDigit
} from "./tml.js";




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




    static sum(x, y) {
        
    }

}