input("#001-11#11-221#001-221");

comment("Assigning colors to each vertex");
right();

while (read() != "$") {
    comment("Mark the next vertex");
    mark("u");

    comment("Does the vertex have a color?");
    if (!TMLBlock.findAddress("c", "u")) {
        comment("The vertex has no color: let choose one");
        TMLBlock.allocateWithAddress("c", "u");
        write(choose(["0", "1", "2"]));
    }
    mvtomarkleft("u");
    unmark();
    TMLBlock.right();

    if (read() == "-" || read() == "#")
        right();
}


comment("Verify that adjacent nodes are of different colors");
leftmost();
right();


while (read() != "$") {
    mark("u");

    TMLBlock.findAddress("c", "u")
    TMLBlock.right();
    right();
    mark("c");

    mvtomarkleft("u");
    unmark();
    TMLBlock.right();
    right();

    mark("v");
    TMLBlock.findAddress("c", "v")
    TMLBlock.right();
    right();

    if (equal("c")) {
        comment("u and v have the same color: reject");
        reject();
    }

    mvtomark("c");
    unmark();

    mvtomarkleft("v");
    unmark();
    TMLBlock.right();

    if (read() == "-" || read() == "#")
        right();
}

accept();