class target {
  constructor(x, y) {
    this.pos = createVector(x, y);
  }
  show() {
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, 10, 10);
  }
}