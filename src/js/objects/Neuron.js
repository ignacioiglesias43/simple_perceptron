class Neuron {
  constructor(learningRate) {
    this.weights = [0.5, 0.5, 0.5];
    this.alpha = learningRate;
  }

  classify(x, y) {
    let sum = 0;
    sum += x * this.weights[0] + y * this.weights[1] + this.weights[2];
    return this.f(sum);
  }

  /**
   *
   * @param {number} sum
   * @returns sum <= 0 ? 1 : -1
   */
  f = (sum) => 1 / (1 + Math.exp(-sum));

  /**
   * Para cada punto (x,y) se tiene el resultado correcto los pesos se actualizan considerando el error de la clasificación
   * @param {number} x
   * @param {number} y
   * @param {number} isRight
   */
  train(x, y, isRight) {
    let val = this.classify(x, y);
    let error = isRight - val;
    this.weights[0] = this.weights[0] + this.alpha * error * x;
    this.weights[1] = this.weights[1] + this.alpha * error * y;
    this.weights[2] = this.weights[2] + this.alpha * error;
  }
}
