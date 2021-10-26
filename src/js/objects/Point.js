class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.type = 0;
  }

  draw() {
    strokeWeight(0);

    if (this.type === 1) {
      fill(255, 0, 0);
    } else {
      fill(0, 255, 0);
    }

    ellipse(x + width / 2, y + height / 2, 0, 0);
  }
}
