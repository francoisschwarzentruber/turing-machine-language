import {
    input, read, write, left, right, leftmost, rightmost, equal,accept, reject,
    mark, unmark, mvtomark, isDigit, isLeftMost, execution, init, comment, choose, mvtomarkleft
} from "./tml.js";

import TMLBlock from "./tmlblock.js";
import TMLMath from "./tmlmath.js";

const sliderEvent = () => {
    const config = execution[slider.value];
    _showConfig(config);
    commentElement.innerHTML = config.comment;
    window.config = config;
    t.innerHTML = "t = " + slider.value;
};


function run() {
    console.log("run")
    init();
    try {
        eval(program.value);
    }
    catch(e) {
        console.log(e);
    }
    
    slider.value = 0;
    sliderEvent();
}



window.onload = () => {
    slider.onchange = sliderEvent;
    slider.oninput = sliderEvent;
    slider.max = 0;
    runButton.onclick = run;

    init();
    input("Welcome!");

    sliderEvent();

}


function _showConfig(config) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.lineWidth = "1px";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 128; i++) {//config.length + 11
        const nbcolumn = 24;
        let y = (i / nbcolumn) * 64 + 32;
        let x = i % nbcolumn * 32 + 16;

        const getStyle = (char) => {
            const colors = {};
            colors["#"] = "red";
            colors["$"] = "orange";
            colors["-"] = "yellow";

            if (isDigit(char))
                return "lightcyan";

            if (char.endsWith(":"))
                return "lightgreen";
            return colors[char] ? colors[char] : "white";
        }

        const x2 = x + 32;
        const y2 = y + 64 / nbcolumn;

        if (i % nbcolumn == 0 && i > 0) {
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - 8, y - 1 / 4 * 64 / nbcolumn);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x, y + 32);
            ctx.lineTo(x - 8, y + 32 - 1 / 4 * 64 / nbcolumn);
            ctx.stroke();
        }


        if ((i % nbcolumn) == nbcolumn - 1) {
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x + 32, y2);
            ctx.lineTo(x + 32 + 8, y2 + 1 / 4 * 64 / nbcolumn);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x + 32, y2 + 32);
            ctx.lineTo(x + 32 + 8, y2 + 32 + 1 / 4 * 64 / nbcolumn);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x2, y2 + 32);
        ctx.lineTo(x, y + 32);
        ctx.lineTo(x, y);
        ctx.fillStyle = getStyle(config.getChar(i));
        //ctx.fillRect(x, y, 32, 32);
        ctx.fill();


        ctx.lineWidth = (i == config.cursorPosition) ? 6 : 1;
        ctx.stroke();


        //ctx.strokeRect(x, y, 32, 32);

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.font = '10px Arial';
        ctx.fillText(i, x + 16, y);


        ctx.font = '20px Arial';
        ctx.fillText(config.getChar(i), x + 16, y + 20);

        ctx.font = '10px Arial';
        ctx.fillText(config.getMarks(i), x + 16, y + 30);

    }
}