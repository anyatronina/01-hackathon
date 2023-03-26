import { Module } from "../core/module";
import { getRandomColor } from "../utils.js";

export class BackgroundModule extends Module {
  trigger() {
    const body = document.querySelector("body");
    body.style.background = getRandomColor();
    setTimeout(() => {
      body.style.background = "initial";
    }, 5000);
  }
}
