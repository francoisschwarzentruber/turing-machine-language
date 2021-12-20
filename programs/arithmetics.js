import { input, mark, right, write } from "../tml";
import TMLBlock from "../tmlblock";
import TMLMath from "../tmlmath";

input("#01#02#");
right();
mark("x");
TMLBlock.right();
right();
mark("y");
TMLBlock.allocate("z");
write("0");
right();
write("0");
right();
write("0");
right();

TMLMath.sum("x", "y");
