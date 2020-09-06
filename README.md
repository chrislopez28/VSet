# VSet

## Overview

VSet is based on the card game [*Set*](https://en.wikipedia.org/wiki/Set_(card_game)). This app was made using Vue and is hosted on Github Pages. 

To play, go here:
https://chrislopez28.github.io/vset/ 

## Objective

The objective of VSet is to find "sets" until there are no more sets possible sets on the game board. Sets are combinations of 3 cards where each of the 4 properties are either all the same or all different.

Each card is characterized by 4 properties:

* Number: 1, 2, or 3
* Shape: Diamond, Oval, or Squiggle
* Shading: Solid, Striped, or Open
* Color: Green, Red, or Purple

Example 1:

![example 1](https://raw.githubusercontent.com/chrislopez28/vset/master/src/assets/example1.PNG)

This is a set since each card has a different number (1, 2, 3); the same shape (dimaond); a different shading (open, solid, striped); and a different color (green, red, purple).

Example 2:

![example 2](https://raw.githubusercontent.com/chrislopez28/vset/master/src/assets/example2.PNG)

This is a set since each card has the same number (2); the same shape (oval); the same color (purple); and a different shading (open, striped, solid).

Example 3:

![example 3](https://raw.githubusercontent.com/chrislopez28/vset/master/src/assets/example3.PNG)

This is a set since each card has a different shape (oval, diamond, squiggle); a different color (red, purple, green); a different number (3, 2, 1); and a different shading (open, striped, solid).