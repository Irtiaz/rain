import * as p5 from 'p5';
import Raindrop from './Raindrop';

const Sketch = (sketch: p5) => {
  let raindrops: Raindrop[] = [];
  let time: number;

  let rainSound: HTMLAudioElement;

  let playSound: boolean = false;

  sketch.setup = () => {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);

    rainSound = document.getElementById('rain') as HTMLAudioElement;

    const numberOfRaindrops = sketch.width;

    for (let i = 0; i < numberOfRaindrops; ++i) {
      raindrops.push(new Raindrop(sketch));
    }

    time = sketch.random(0, 100);
  };

  sketch.draw = () => {
    sketch.background(51);

    const windStrength = sketch.width / 100;
    const wind = sketch.map(
      sketch.noise(time),
      0,
      1,
      -windStrength,
      windStrength
    );

    for (let raindrop of raindrops) {
      const crossedScreen = raindrop.update(wind);
      raindrop.display();
      if (!playSound && crossedScreen) {
        rainSound.play();
      }
    }

    time += 0.002;
  };
};

new p5(Sketch);
