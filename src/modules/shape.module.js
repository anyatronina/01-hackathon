import { Module } from "../core/module";
import { random, getRandomColor, closeModule } from "../utils.js";

export class ShapeModule extends Module {
  constructor(type, text) {
    super(type, text);
    this.shapes = null
}
  trigger() {
    const body = document.querySelector('body');
    const clientHeight = body.clientHeight;
    const clientWidth = body.clientWidth;
    
    const randomHeight = random(100, 200);
    const randomWidth = random(100, 200);
    const positionHeight = random(0, clientHeight - randomHeight);
    const positionWidth = random(0, clientWidth - randomWidth);
    
    const shape = document.createElement('div');
    shape.style.height = `${randomHeight}px`;
    shape.style.width = `${randomWidth}px`;
    shape.style.borderRadius = `${random(0, 100)}%`;
    shape.style.background = getRandomColor();
    shape.style.boxShadow = '1px 2px 10px 0px rgba(122, 122, 122, 0.2)';
    shape.style.position = 'absolute';
    shape.style.top = `${positionHeight}px`;
    shape.style.right = `${positionWidth}px`;
    
    this.shapes += 1
    shape.setAttribute('id', `${this.shapes}`);
    
    body.append(shape);
    
    closeModule(shape, 4000, 'opacity', 1000);
  }
}
