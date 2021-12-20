import {
    input, read, write, left, right, leftmost, rightmost, equal, accept, reject,
    mark, unmark, mvtomark, isMarked, mvtounmark, isDigit, isLeftMost, execution, init, comment, choose, mvtomarkleft
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
    catch (e) {
        console.log(e);
    }

    slider.value = 0;
    sliderEvent();
}




async function loadProgram(name) {
    const f = await fetch(`programs/${name}.js`);
    const t = await f.text();
    const t2 = t.split("\n").filter((line) => !line.startsWith("import")).join("\n");
    program.value = t2;
}

window.onload = () => {
    slider.onchange = sliderEvent;
    slider.oninput = sliderEvent;
    slider.max = 0;
    runButton.onclick = run;

    init();
    input("Welcome!");

    sliderEvent();

    loadProgram("dijkstra");


}


function _showConfig(config) {
    const cellsize = 32;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.lineWidth = "1px";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 128; i++) {//config.length + 11
        const nbcolumn = 24;
        let y = (i / nbcolumn) * cellsize*2 + 32;
        let x = i % nbcolumn * cellsize + 16;

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

        const x2 = x + cellsize;
        const y2 = y + cellsize*2 / nbcolumn;

        if (i % nbcolumn == 0 && i > 0) {
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - cellsize/4, y - 1 / 4 * cellsize*2 / nbcolumn);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x, y + cellsize);
            ctx.lineTo(x - cellsize/4, y + cellsize - 1 / 4 * 2*cellsize / nbcolumn);
            ctx.stroke();
        }


        if ((i % nbcolumn) == nbcolumn - 1) {
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x + cellsize, y2);
            ctx.lineTo(x + cellsize + cellsize/4, y2 + 1 / 4 * 2*cellsize / nbcolumn);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x + cellsize, y2 + cellsize);
            ctx.lineTo(x + cellsize + cellsize/4, y2 + cellsize + 1 / 4 * 2*cellsize / nbcolumn);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x2, y2 + cellsize);
        ctx.lineTo(x, y + cellsize);
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
        ctx.fillText(i, x + cellsize/2, y);


        ctx.font = '20px Arial';
        ctx.fillText(config.getChar(i), x + cellsize/2, y + cellsize*0.7);

        ctx.font = '10px Arial';
        ctx.fillText(config.getMarks(i), x + cellsize/2, y + cellsize-4);

    }
}