import { Module } from "../core/module";
import { random, getRandomColor } from "../utils.js";

export class ShapeModule extends Module {
  constructor(type, text) {
    super(type, text);
    this.shapes = null
}
  trigger() {
    const body = document.querySelector("body");
    const clientHeight = body.clientHeight;
    const clientWidth = body.clientWidth;
    const shape = document.createElement("div");
    const randomHeight = random(200, 100);
    const randomWidth = random(200, 100);
    const positionHeight = random(clientHeight - randomHeight, 0);
    const positionWidth = random(clientWidth - randomWidth, 0);
    shape.style.height = `${randomHeight}px`;
    shape.style.width = `${randomWidth}px`;
    shape.style.borderRadius = `${random(100, 0)}%`;
    shape.style.background = getRandomColor();
    shape.style.boxShadow = "1px 2px 10px 0px rgba(122, 122, 122, 0.2)";
    shape.style.position = "absolute";
    shape.style.top = `${positionHeight}px`;
    shape.style.right = `${positionWidth}px`;
    this.shapes += 1
    shape.setAttribute('id', `${this.shapes}`);
    body.append(shape);
    setTimeout(() => {
      shape.classList.toggle("opacity");
    }, 4000);
    setTimeout(() => {
      shape.remove();
    }, 5000);
  }
}
