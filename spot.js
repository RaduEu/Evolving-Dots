class spot {
  constructor() {
    this.pos = createVector(width / 2, 9 * height / 10);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.br = new brain(400);
    this.moveIndex = 0;
    this.done = false;
    this.dumb = false;
  }

  reset() {
    this.pos = createVector(width / 2, 9 * height / 10);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.moveIndex = 0;
    this.done = false;
    this.dumb = false;
  }

  update(tar) {
    if (this.done) return;
    else this.move(tar);
  }

  show() {
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
  }

  move(tar) {
    this.acc.add(this.br.genes[this.moveIndex]);
    this.moveIndex++;
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    this.acc.mult(0);
    if (this.pos.x < 2 || this.pos.y < 2 || this.pos.x > width - 2 || this.pos.y > height - 2) {
      this.done = true;
      this.dumb = true;
    }
    if (p5.Vector.sub(this.pos, tar.pos).mag() < 5) {
      this.done = true;
    }
    if (this.moveIndex > this.br.geneNo) {
      this.done = true;
      return;
    }
  }

  remainingMoves() {
    return 400 - this.moveIndex;
  }

}