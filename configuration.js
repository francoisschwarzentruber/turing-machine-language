export class Configuration {
    tape = [];
    cursorPosition = 0;

    constructor(tape, cursorPosition) {
        this.tape = tape;
        this.cursorPosition = cursorPosition;

        while (this.cursorPosition >= this.tape.length)
            this.tape.push(["", ""]);
    }


    get length() { return this.tape.length; }

    getChar(i) {
        if (i >= this.tape.length)
            return "";
        return this.tape[i][0];
    }

    getMarks(i) {
        if (i >= this.tape.length)
            return "";
        return this.tape[i][1];
    }

    read() { return this.tape[this.cursorPosition][0]; }
    isMark(m) { return this.tape[this.cursorPosition][1].indexOf(m) >= 0; }

    write(a) {
        const newTape = [...this.tape];
        newTape[this.cursorPosition] = [a, newTape[this.cursorPosition][1]];
        return new Configuration(newTape, this.cursorPosition);
    }

    writeMark(m) {
        const newTape = [...this.tape];
        newTape[this.cursorPosition] = [newTape[this.cursorPosition][0], [...newTape[this.cursorPosition][1], m]];
        return new Configuration(newTape, this.cursorPosition);
    }

    unmark(m) {
        const newTape = [...this.tape];
        const marks = [...newTape[this.cursorPosition][1]];
        newTape[this.cursorPosition] = [newTape[this.cursorPosition][0], marks.filter((mark) => m ? mark != m : false)];
        return new Configuration(newTape, this.cursorPosition);
    }

    left() { const pos = Math.max(0, this.cursorPosition - 1); return new Configuration(this.tape, pos); }
    right() { return new Configuration(this.tape, this.cursorPosition + 1); }


}




export function createInitialConfiguration(inputString) {
    const tape = [];
    for (let i = 0; i < inputString.length; i++) {
        tape.push([inputString[i], ""]);
    }
    return new Configuration(tape, 0);
}