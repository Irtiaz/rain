import * as p5 from 'p5';

export default class Raindrop {
  position: p5.Vector;
  velocity: p5.Vector;

  length: number;
  stroke: number;

  sketch: p5;

  constructor(sketch: p5) {
    this.sketch = sketch;

    this.initiate();
  }

  update(wind: number): boolean {
    this.velocity.x = wind;
    this.position.add(this.velocity);

    let crossedScreen: boolean = false;

    if (this.position.y > this.sketch.height) {
      this.initiate();
      crossedScreen = true;
    }

    return crossedScreen;
  }

  initiate(): void {
    const zMin = 5;
    const zMax = 100;

    const numberOfFramesTakenToGoOutIdeally = 50;

    const velocityMin = this.sketch.height / numberOfFramesTakenToGoOutIdeally;
    const velocityMax =
      (this.sketch.height * 1.5) / numberOfFramesTakenToGoOutIdeally;

    const lengthMin = 8;
    const lengthMax = 12;

    const strokeMin = 1;
    const strokeMax = 3;

    const top = 500;
    const bottom = 30;

    this.position = this.sketch.createVector(
      this.sketch.random(
        -this.sketch.width / 2,
        this.sketch.width + this.sketch.width / 2
      ),
      this.sketch.random(-top, -bottom),
      this.sketch.random(zMin, zMax)
    );

    this.velocity = this.sketch.createVector(
      0,
      this.sketch.map(this.position.z, zMin, zMax, velocityMax, velocityMin)
    );
    this.length = this.sketch.map(
      this.velocity.y,
      velocityMin,
      velocityMax,
      lengthMin,
      lengthMax
    );
    this.stroke = this.sketch.map(
      this.position.z,
      zMax,
      zMin,
      strokeMin,
      strokeMax
    );
  }

  display(): void {
    const angle = this.velocity.heading();

    this.sketch.stroke(220);
    this.sketch.strokeWeight(this.stroke);

    this.sketch.push();
    this.sketch.translate(this.position.x, this.position.y);
    this.sketch.rotate(angle);

    this.sketch.line(0, 0, this.length, 0);

    this.sketch.pop();
  }
}
