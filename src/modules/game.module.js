import { Module } from "../core/module";
import { random, getRandomColor } from "../utils.js";

export class GameModule extends Module {
  constructor(type, text) {
    super(type, text);
    this.score = 0;
    this.circle = 0;
  }
  trigger() {
    const startTime = Date.now();
    const time = 15;
    const body = document.querySelector("body");
    const shape = this.create();
    body.append(shape);

    const containerToast = document.querySelector(".container-toast");
    containerToast.insertAdjacentHTML(
      "beforeend",
      `
        <div class="game-toast toast">
          <div class="game-timer">Время: 15</div>
          <div class="game-score">Счет: 0</div>
        </div>
      `
    );
    const gameToast = document.querySelector(".game-toast");
    const gameTimer = document.querySelector(".game-timer");
    const gameScore = document.querySelector(".game-score");

    body.addEventListener("click", (event) => {
      console.log(event.target.className);
      if (event.target.className === "shape") {
        this.score += 1;
        gameScore.textContent = `Счет: ${this.score}`;
        event.target.classList.add("opacity");
        setTimeout(() => {
          event.target.remove();
        }, 1000);

        const shapeNew = this.create();
        body.append(shapeNew);
      }
    });

    const interval = setInterval(() => {
      const delta = Date.now() - startTime;
      gameTimer.textContent = `Время: ${String(
        Number.parseFloat(time - delta / 1000).toFixed(1)
      )}`;
    }, 100);

    const timeout = setTimeout(() => {
      const shapes = document.querySelectorAll('.shape')
      shapes.forEach((shape) => {
        shape.remove()
      })
      gameTimer.textContent = "Конец игры!";
      gameScore.textContent = `Ваш результат: ${this.score}.`;
      clearInterval(interval);
      clearTimeout(timeout);

      setTimeout(() => {
        gameToast.classList.toggle("opacity");
      }, 4000);
      setTimeout(() => {
        gameToast.remove();
      }, 5000);
    }, time * 1000);
  }
  create() {
    const body = document.querySelector("body");
    const clientHeight = body.clientHeight;
    const clientWidth = body.clientWidth;
    const shape = document.createElement("div");
    const randomLong = random(50, 10);
    const positionHeight = random(clientHeight - randomLong, 0);
    const positionWidth = random(clientWidth - randomLong, 0);
    shape.classList.add("shape");
    shape.style.height = `${randomLong}px`;
    shape.style.width = `${randomLong}px`;
    shape.style.borderRadius = `50%`;
    shape.style.background = getRandomColor();
    shape.style.border = "1px solid lightgrey";
    shape.style.boxShadow = "1px 2px 10px 0px rgba(122, 122, 122, 0.2)";
    shape.style.position = "absolute";
    shape.style.top = `${positionHeight}px`;
    shape.style.right = `${positionWidth}px`;
    this.circle += 1;
    shape.setAttribute("id", `${this.circle}`);
    return shape;
  }
}
