# TML
Turing machine language. A (somehow) high-level language to describe programs running on Turing machines. The project TML can be seen a sort of C for Turing machines.  The aim is pedagogical. In particular, this tool implements:
- [X] a non-deterministic machine for 3-coloring
- [X] Dijkstra's algorithm
- [ ] a non-deterministic machine for SAT
- [ ] Mathematical function (polynomials, etc.)

PS: For the moment TML is just functions in Javascript, but at some point, TML will become a real language, if it is sufficiently interesting.

## Core language

- `left()` move the head left
- `right()` move the head right
- `read()` returns the content of the current cell
- `write("a")` write "a" in the current cell

## Marks

Cells can be marked! In other words, a letter in a cell is a symbol augmented with a set of marks (the number of marks is finite, the alphabet is finite, do not worry!).
- `mark("x")` mark the current cell
- `unmark("x")`unmark the current cell


## Libraries

Like C, TML is provided with libraries.
- `TMLBlock` provides functionnalities to support blocks of cells. It enables to allocate memory.
- `TMLMath` provides math functions (addition, leq, etc.).

