import { comment, isMarked, leftmost, mark, mvtomark, read, right, rightmost, unmark, write, mvtounmark, left } from "../tml";
import TMLBlock from "../tmlblock";
import TMLMath from "../tmlmath";

//Dijkstra algorithm :)
input("#0-1:5#1-2:1#0-2:7");
/**
 * the input is the graph
 * 
 *    0 ---- weight = 5 ----> 1 ----- weight = 1 ----> 2
 *    |                                                ^
 *    -------------------weight = 7 -------------------|
 * 
 */

right();


comment("Create the array d[.] and assign d[0] = 0 and d[u] = 999 for other vertices u");
while (read() != "$") {
    mark("u");

    if (TMLMath.isZero()) {
        if (!TMLBlock.findAddress("d", "u")) {
            TMLBlock.allocateWithAddress("d", "u");
            write("0");
        }
    }
    else {
        if (!TMLBlock.findAddress("d", "u")) {
            TMLBlock.allocateWithAddress("d", "u");
            write("9");
            right();
            write("9");
            right();
            write("9");
            /*right();
            write("9");
            right();
            write("9");*/
        }
    }

    mvtomark("u");
    unmark("u");
    TMLBlock.right();

    if (read() == ":") {
        right();
        TMLBlock.right();
    }

    if (read() == "-" || read() == "#") {
        right();
    }

}

rightmost();
write("!");

function queueIsEmpty() {
    comment("Test whether the queue is empty or not");
    leftmost();
    while (read() != "$") right();

    while (read() != "!") {
        right();
        right();
        if (!isMarked("out")) //the mark is on the vertex after the "d"
            return false;

        TMLBlock.right();
        right();
        TMLBlock.right();
    }

    return true;
}



function queueExtractMin() {
    comment("Extract the min");

    mvtomark("min");
    write("9"); right(); write("9"); right(); write("9"); right();

    leftmost();
    while (read() != "$") right();


    let firstumin = true;
    while (read() != "!") {
        if (!read("$")) throw "should be $";
        right(); //pass the $
        if (!read("d")) throw "should be d";
        right();// pass the d
        if (!isMarked("out")) {

            TMLBlock.right();//pass the address
            if (!read(":")) throw "should be :";
            right(); // pass the :
            mark("val");
            if (TMLMath.leq("min")) {
                comment("oh we found a vertex with a smaller d[.]");
                mvtomark("min");
                TMLBlock.copy("val");
                mvtomark("val");
                unmark("val");
                left();
                if (!read(":")) throw "should be :";
                left();
                TMLBlock.left();
                right();

                if (firstumin) {
                    mark("umin");
                    firstumin = false;
                }
                else {
                    mark("uminnew");
                    unmark("umin");
                    mvtomark("uminnew");
                    unmark("uminnew");
                    mark("umin");
                }


                TMLBlock.right();
                if (!read(":")) throw "should be :";
                right();
                TMLBlock.right(); //pass the value

            }
            else {
                comment("oh that vertex did not have a smaller d[.]");
                mvtomark("val");
                unmark("val");
                TMLBlock.right(); //pass the value
            }



        } else {

            TMLBlock.right();//pass the address
            right(); //pass the :
            TMLBlock.right(); //pass the value
        }


    }

    //mvtomark("umin");
    mvtomarkleft("umin");
    mark("out");
}


TMLBlock.allocate("min");
//write("9"); right(); write("9"); right(); write("9"); right();

while (!queueIsEmpty()) {
    queueExtractMin(); //mark with cmin

    leftmost();

    comment("searching for the successors of umin")
    while (read() != "$") {
        right();//#
        mark("u");

        if (TMLBlock.equal("umin")) {
            comment("we found a successor of umin");
            //mvtomark("u")
            mvtomarkleft("u")
            TMLBlock.right();
            right();
            mark("v");
            TMLBlock.right();
            right();
            mark("weight");

            TMLBlock.findAddress("d", "u");
            TMLBlock.right();
            right();
            mark("du");

            TMLBlock.findAddress("d", "v");
            TMLBlock.right();
            right();
            mark("dv");

            comment("we compute the sum of du + weight");
            TMLBlock.allocate("sum");
            write("0"); right(); write("0"); right(); write("0"); right();
            TMLMath.sum("du", "weight");


            comment("test whether that sum is smaller than dv");
            if (TMLMath.leq("dv")) {
                mvtomark("dv");
                TMLBlock.copy("sum");
                mvtomark("sum");

                TMLBlock.freeRightMostBlock("sum");
            }

            mvtounmark(["sum", "dv", "du", "weight", "v"]);
        }
        //mvtomark("u");
        mvtomark("u");
        unmark("u");
        TMLBlock.right();
        right();//-
        TMLBlock.right();
        right();//:
        TMLBlock.right();

    }

    mvtomark("umin");
    unmark("umin");


}

comment("the queue is empty.");
write("end");





