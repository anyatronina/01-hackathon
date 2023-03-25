import { Module } from '../core/module'

export class ClicksModule extends Module {
    constructor(type, text) {
        super(type, text);
    }

    trigger() {
        function formatTime(ms) {
            return String(Number.parseFloat(ms / 1000).toFixed(1)).slice(-3);
        }

        function startClicker() {
            document.querySelector('h1')?.remove();

            const body = document.querySelector('body');
            const title = document.createElement('h1');
            body.append(title);

            const startTime = Date.now();
            const time = 5000;
            let total = 0;

            title.textContent = formatTime(time);
            document.addEventListener('click', (e) => {
                total += 1;
            });

            const interval = setInterval(() => {
                const delta = Date.now() - startTime;
                title.textContent = formatTime(time - delta);
            }, 100);

            const timeout = setTimeout(() => {
                title.textContent = `TOTAL ${total}`;
                document.removeEventListener('click', (e) => {
                    total += 1;
                });

                clearInterval(interval);
                clearTimeout(timeout);
            }, time)
        };

        document.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            startClicker();
        })
    }

    toHTML() {
        return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`;
    }
}