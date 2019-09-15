let populationSize = 200;
let population = [];
let fitArray = [];
let tg;
let obstacles = [];
let genNo = 1;
let speed = 50;
let time = 0;

function setup() {
  //frameRate(10)
  createCanvas(400, 400);
  tg = new target(width / 2, 20);
  obstacles[0] = new obstacle(width / 2 - 100, height / 2, 200, 10);
  obstacles[1] = new obstacle(width / 2 - 100, 0, 10, 100);
  obstacles[2] = new obstacle(width / 2 + 100, 0, 10, 100);
  obstacles[3] = new obstacle(width/2-50,height/6,100,10)
  for (let i = 0; i < populationSize; i++) {
    population[i] = new spot();
    //population[i].br = population[0].br.copy();
    population[i].br.mutate();
  }
}

function gameLogic() {
  for (let i = 0; i < populationSize; i++) {
    population[i].update(tg);
    for (let j = 0; j < obstacles.length; j++)
      if (obstacles[j].collides(population[i])) {
        population[i].done = true;
        population[i].dumb = true;
      }
  }
  if (allDead()) {
    print(genNo + " " + avgFitness());
    nextGeneration();
  }
}

function show() {
  background(220);
  tg.show();
  for (let i = 0; i < obstacles.length; i++) obstacles[i].show();
  for (let i = 0; i < populationSize; i++) population[i].show();
}

function draw() {
  speed=mouseX/width*100;
  time+=speed;
  while(time>1) {gameLogic(); time--;}
  show();


}

function nextGeneration() {
  //print(population[0].dumb)
  genNo++;
  for (let i = 0; i < populationSize; i++) fitArray[i] = fitness(population[i]);
  purge();
  print(fitArray[0]);
  population[0].reset();
  for (let i = 1; i < populationSize; i++) {
    population[i].br.mutate();
    population[i].reset();
  }
}

function purge() {
  sortArr();
  //print(population[0].dumb)
  for (let i = 0; i < populationSize / 2; i++) {
    let bad = i + populationSize / 2;
    population[bad].br = population[i].br.crossover(population[i + 1].br);
  }
}

function sortArr() {
  for (let i = 0; i < populationSize; i++)
    for (let j = i + 1; j < populationSize; j++) {
      if (fitArray[i] < fitArray[j]) {
        swap(fitArray, i, j);
        swap(population, i, j);
      }
    }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function fitness(individual) {
  if (individual.dumb) return 1 / (p5.Vector.sub(individual.pos, tg.pos).mag());
  else return 1 / (p5.Vector.sub(individual.pos, tg.pos).mag()) + individual.remainingMoves();
}

function avgFitness() {
  let sum = 0;
  for (let i = 0; i < populationSize; i++) sum += fitness(population[i]);
  return sum / populationSize;
}

function allDead() {
  for (let i = 0; i < populationSize; i++)
    if (!population[i].done) return false;
  return true;
}