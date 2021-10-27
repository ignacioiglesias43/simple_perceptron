let perceptron;
const points = [];

function setup() {
  createCanvas(WIDTH, HEIGHT);
  frameRate(2);

  perceptron = new Neuron(BIAS);

  Array.from(new Array(1000)).forEach(() => {
    points.push(
      new Point(
        Math.random() * (2 * xCenter) - xCenter,
        Math.random() * (2 * yCenter) - yCenter
      )
    );
  });
}

function draw() {
  background(200);
  translate(xCenter, yCenter);
  scale(1, -1);

  line(-xCenter, -xCenter * M, xCenter, xCenter * M);

  points.forEach((point) => {
    point.type = perceptron.classify(point.x, point.y);
    point.draw();
  });

  const x = Math.random() * (2 * xCenter) - xCenter;
  const y = Math.random() * (2 * yCenter) - yCenter;
  perceptron.train(x, y, y > M * x + BIAS ? 1 : -1);
}
