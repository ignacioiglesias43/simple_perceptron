# Perceptrón sencillo para separar dos conjuntos de puntos.

Construir en su lenguaje de preferencia, un perceptrón que aprenda a separar dos conjuntos de puntos en el plano, como se vio en clase.

- Ignacio Iglesias Campoy
- Lunes 25 de octubre de 2021

## Funcionamiento

## Neuron.js

La neurona recibe como parámetro la tasa de aprendizaje asignada, al ser instanciada se asignan sus pesos en un arreglo los cuales son las dos primeras posiciones del arreglo, y el último el bias.

```js
class Neuron {
  constructor(learningRate) {
    this.weights = [0.5, 0.5, 0.5];
    this.alpha = learningRate;
  }
}
```

La función <strong>classify</strong> se encarga de multiplicar los pesos por las entradas (x,y) y a la vez sumarle el bias retornando su valor con la función sigmoide.

```js
classify(x, y) {
    let sum = 0;
    sum += x * this.weights[0] + y * this.weights[1] + this.weights[2];
    return this.f(sum);
}
```

Sigmoide

```js
f = (sum) => 1 / (1 + Math.exp(-sum));
```

Para la función de entrenamiento se utiliza una fórmula en la cual se clasifican los datos en base a los pesos actuales, se resta el valor real al resultado y se ajustan los pesos y el bias en base a ese error multiplicado por la tasa de aprendizaje.

```js
train(x, y, isRight) {
    let val = this.classify(x, y);
    let error = isRight - val;
    this.weights[0] = this.weights[0] + this.alpha * error * x;
    this.weights[1] = this.weights[1] + this.alpha * error * y;
    this.weights[2] = this.weights[2] + this.alpha * error;
}
```

## Point.js

Esta clase es utilizada para pintar los puntos dentro del canvas.

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.type = 1;
  }

  draw() {
    push();
    strokeWeight(15);

    if (this.type === 1) {
      stroke(255, 0, 0);
    } else {
      stroke(0, 255, 0);
    }

    ellipse(this.x, this.y, 0, 0);
    pop();
  }
}
```

## Implementación

Se usa para pintar sobre el canvas la simulación del perceptron realizada.

Hay dos funciones principales, el setup, donde inicializamos nuestro perceptrón, pasandole las siguientes constantes:

```js
// constants.js

// tamaño del canvas
const WIDTH = 600;
const HEIGHT = 600;

const M = 0.3;
const BIAS = 0.05;

// Centro del canvas
const xCenter = WIDTH / 2;
const yCenter = HEIGHT / 2;
```

Aquí como se puede observar, se generan 1000 puntos de forma aleatoria, entre 0 y 300, que vendría siendo la mitad del Canvas.

```js
// sketch.js
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
```

Después tenemos la implementación en el método draw, el cual es un bucle que dura todo el ciclo de vida de la aplicación. Aquí ya clasificamos los puntos y se crean nuevos en base a la fórmula Y = M\*X + B

```js
// sketch.js
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
```

## Salida

URL: https://ignacioiglesias43.github.io/simple_perceptron/

Ejemplo:

![Gif del funcionamiento](/ejemplo.gif)
