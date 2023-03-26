import { Module } from '../core/module'
import { formatTime } from '../utils'

export class ClicksModule extends Module {
    constructor(type, text) {
        super(type, text);
    }

    trigger() {
        if (document.querySelector('h1')) {return {}};

        const body = document.querySelector('body');
        const title = document.createElement('h1');
        body.append(title);

        const startTime = Date.now();
        const time = 3000;
        let total = -1;

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

            setTimeout(() => {
                document.querySelector('h1')?.remove();
            }, 3000);

            clearInterval(interval);
            clearTimeout(timeout);
        }, time)
    };
}