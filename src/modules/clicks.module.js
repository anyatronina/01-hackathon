import { Module } from '../core/module'
import { formatTime } from '../utils'

export class ClicksModule extends Module {
    constructor(type, text) {
        super(type, text);
    }

    trigger() {
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

        document.querySelector('h1').remove();
    };
}