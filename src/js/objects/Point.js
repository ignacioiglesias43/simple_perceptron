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
