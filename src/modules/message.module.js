import { Module } from "../core/module";

export class MessageModule extends Module {
  constructor(type, text) {
    super(type, text);
  }
  trigger() {
    const body = document.querySelector("body");
    body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="modal-background modal-open">
        <div class='modal'>
        <div class='modal-header'>
          <h3 class='modal-title'>Сообщение</h3>
          <button class='modal-close'>X</button>
        </div>
        <div class='modal-body'>
          <input class='modal-input' type="text" placeholder='Текст...'>
        </div>
        </div>
      </div>
      `
    );
    const modal = document.querySelector(".modal-background");
    const input = document.querySelector(".modal-input");
    const close = document.querySelector(".modal-close");
    close.addEventListener("click", () => {
      modal.classList.toggle("modal-open");
    });
    input.addEventListener("keydown", (event) => {
      if (event.keyCode === 13) {
        modal.remove();
        body.insertAdjacentHTML(
          "beforeend",
          `
            <div class="toast">
              ${event.target.value}
            </div>
          `
        );
        setTimeout(() => {
          const toast = document.querySelector(".toast");
          toast.classList.toggle("toast-close");
        }, 4000);
        setTimeout(() => {
          const toast = document.querySelector(".toast");
          toast.remove();
        }, 4500);
      }
    });
  }
}
