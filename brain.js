let mutationChance = 0.0002;

class brain {
  constructor(n) {
    this.geneNo = n;
    this.genes = [];
    this.randomise();
  }

  randomise() {
    for (let i = 0; i < this.geneNo; i++) this.genes[i] = p5.Vector.random2D();
  }

  copy() {
    let cp = [];
    for (let i = 0; i < this.geneNo; i++) cp[i] = this.genes[i];
    let brainCopy = new brain(this.geneNo);
    brainCopy.genes = cp;
    return brainCopy;
  }

  mutate() {
    for (let i = 0; i < this.geneNo; i++)
      if (random() < mutationChance) this.genes[i] = p5.Vector.random2D();
  }

  crossover(other) {
    let child = new brain(this.geneNo);
    let cut = random(0, this.geneNo);
    for (let i = 0; i < cut; i++) child.genes[i] = this.genes[i];
    for (let i = cut; i < this.geneNo; i++) child.genes[i] = other.genes[i];
    return child;
  }
}