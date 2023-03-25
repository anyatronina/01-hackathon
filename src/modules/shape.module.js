import { Module } from "../core/module";
import { random, getRandomColor } from "../utils.js";

export class ShapeModule extends Module {
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
    body.append(shape);
  }

  toHTML() {
    return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`;
  }
}
