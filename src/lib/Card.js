export default class Card {
  constructor(id, shape, color, number, pattern) {
    this.id = id;
    this.shape = shape;
    this.color = color;
    this.number = number;
    this.pattern = pattern;
    this.selected = false;
    this.hint = false;
  }
}
