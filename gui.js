import {
    input, read, write, left, right, leftmost, rightmost, equal, accept, reject,
    mark, unmark, mvtomark, isMarked, mvtounmark, isDigit, isLeftMost, execution, init, comment, choose, mvtomarkleft
} from "./tml.js";

import TMLBlock from "./tmlblock.js";
import TMLMath from "./tmlmath.js";


let lastConfig = undefined;


const sliderEvent = () => {
    const config = execution[slider.value];
    _showConfig(config);
    lastConfig = config;
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
    setup();
    init();
    input("Welcome!");

    sliderEvent();

    loadProgram("dijkstra");


}

const domTape = [];
let domCursor = undefined;

const getDomPosition = (ii) => {
    const cellsize = 35;
    const nbcolumn = 1000;
    const i = ii;//ii - config.cursorPosition + nbcolumn + nbcolumn / 2;
    let y = Math.floor(i / nbcolumn) * cellsize * 2 + 32;
    let x = i % nbcolumn * cellsize + 16;
    return { x: x, y: y };
}



function setup() {
    for (let i = 0; i < 128; i++) {//config.length + 11
        if (domTape[i] == undefined) {
            domTape[i] = document.createElement("div");
            domTape[i].classList.add("cell");
            const pos = getDomPosition(i);
            domTape[i].style.left = pos.x + "px";
            domTape[i].style.top = pos.y + "px";
            graphics.appendChild(domTape[i]);

            const id = document.createElement("div");
            id.innerHTML = i;
            id.classList.add("id");
            id.style.left = pos.x + "px";
            id.style.top = pos.y -13 + "px";
            graphics.appendChild(id);
        }
    }


    if (domCursor == undefined) {
        domCursor = document.createElement("div");
        domCursor.classList.add("cursor");
        graphics.appendChild(domCursor);
    }
}
function _showConfig(config) {
    {
        const domCursorPosition = getDomPosition(config.cursorPosition);
        domCursor.style.left = domCursorPosition.x + "px";
        domCursor.style.top = domCursorPosition.y + "px";
    }
    


    for (let i = 0; i < 128; i++)
        if ((lastConfig == undefined) || config.tape[i] != lastConfig.tape[i]) {//config.length + 11

            domTape[i].classList.remove("write");
            domTape[i].classList.add("write");

            domTape[i].innerHTML = config.getChar(i) + "<br/> <div class='marks'>" + config.getMarks(i) + "<div>";

            const getStyle = (char) => {
                const colors = {};
                colors["#"] = "rgb(255,164,164)";
                colors["$"] = "rgb(255,192,128)";
                colors["-"] = "rgb(255,255,128)";

                if (isDigit(char))
                    return "lightcyan";

                if (char.endsWith(":"))
                    return "lightgreen";
                return colors[char] ? colors[char] : "white";
            }


            domTape[i].style.backgroundColor = getStyle(config.getChar(i))

        }
}