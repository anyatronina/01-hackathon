import { Module } from "../core/module";
import { random, getRandomColor } from "../utils.js";

export class GameModule extends Module {
  constructor(type, text) {
    super(type, text);
    this.score = 0;
    this.circle = 0;
  }
  trigger() {
    if (document.querySelector('.game-toast')) { return {} };

    const startTime = Date.now();
    const time = 15;
    const body = document.querySelector('body');
    const shape = this.create();
    body.append(shape);

    const containerToast = document.querySelector('.container-toast');
    containerToast.insertAdjacentHTML(
      "beforeend",
      `
        <div class="game-toast toast">
          <div class="game-timer"><h1>Время: 15</h1></div>
          <div class="game-score"><h1>Счет: 0</h1></div>
        </div>
      `
    );
    
    const gameToast = document.querySelector('.game-toast');
    const gameTimer = document.querySelector('.game-timer');
    const gameScore = document.querySelector('.game-score');

    body.addEventListener('click', (event) => {
      if (event.target.className === 'shape') {
        this.score += 1;
        gameScore.innerHTML = `<h1>Счет: ${this.score}</h1>`;
        
        event.target.classList.add('opacity');
        
        setTimeout(() => {
          event.target.remove();
        }, 1000);

        const shapeNew = this.create();
        body.append(shapeNew);
      }
    });

    const interval = setInterval(() => {
      const delta = Date.now() - startTime;
      gameTimer.innerHTML = `<h1>Время: ${String(
        Number.parseFloat(time - delta / 1000).toFixed(1)
      )}</h1>`;
    }, 100);

    const timeout = setTimeout(() => {
      const shapes = document.querySelectorAll('.shape')
      shapes.forEach((shape) => {
        shape.remove()
      })
      gameTimer.innerHTML = '<h1>Конец игры!</h1>';
      gameScore.innerHTML = `<h1>Ваш результат: ${this.score}.</h1>`;
      clearInterval(interval);
      clearTimeout(timeout);

      setTimeout(() => {
        gameToast.classList.toggle('opacity');
      }, 4000);
      setTimeout(() => {
        gameToast.remove();
      }, 5000);
    }, time * 1000);
  }
  create() {
    const body = document.querySelector('body');
    const clientHeight = body.clientHeight;
    const clientWidth = body.clientWidth;
    const randomLong = random(50, 10);
    const positionHeight = random(clientHeight - randomLong, 0);
    const positionWidth = random(clientWidth - randomLong, 0);

    const shape = document.createElement('div');
    
    shape.classList.add('shape');
    shape.style.height = `${randomLong}px`;
    shape.style.width = `${randomLong}px`;
    shape.style.borderRadius = `50%`;
    shape.style.background = getRandomColor();
    shape.style.border = '1px solid lightgrey';
    shape.style.boxShadow = '1px 2px 10px 0px rgba(122, 122, 122, 0.2)';
    shape.style.position = 'absolute';
    shape.style.top = `${positionHeight}px`;
    shape.style.right = `${positionWidth}px`;
    this.circle += 1;
    
    shape.setAttribute('id', `${this.circle}`);
    
    return shape;
  }
}
