class obstacle {
  constructor(startX, startY, wid, hei) {
    this.x1 = startX;
    this.w = wid;
    this.y1 = startY;
    this.h = hei;
  }
  show() {
    fill(100);
    rectMode(CORNER);
    rect(this.x1, this.y1, this.w, this.h);
  }
  collides(individual) {
    //return true;
    if (individual.pos.x > this.x1 && individual.pos.x < this.x1 + this.w && individual.pos.y > this.y1 && individual.pos.y < this.y1 + this.h) return true;
    return false;
  }
}