import { Module } from "../core/module";

export class SoundModule extends Module {
  constructor(type, text) {
    super(type, text);
  }
  trigger() {
    const body = document.querySelector("body");
    const sound = new Audio();
    sound.src = "/src/sound/announcements-at-the-airport.mp3";
    sound.autoplay = true;
    body.append(sound);
    setTimeout(() => {
      sound.remove();
    }, 3500);
  }
}
