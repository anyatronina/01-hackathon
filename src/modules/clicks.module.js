import { Module } from '../core/module'
import { formatTime, closeModule } from '../utils'

export class ClicksModule extends Module {
    constructor(type, text) {
        super(type, text);
    }

    trigger() {
        if (document.getElementById('clicker')) { return {} };

        const containerToast = document.querySelector('.container-toast');
        const title = document.createElement('div');
        title.id = 'clicker';
        title.className = 'toast';

        containerToast.append(title);

        const startTime = Date.now();
        const time = 3000;
        let total = -1;

        title.textContent = `<h1>${formatTime(time)}</h1>`;
        
        document.addEventListener('click', () => {
            total += 1;    
        });

        const interval = setInterval(() => {
            const delta = Date.now() - startTime;
            title.innerHTML = `<h1>${formatTime(time - delta)}</h1>`;
        }, 100);

        const timeout = setTimeout(() => {
            title.innerHTML = `<h1>TOTAL ${total}</h1>`;
            document.removeEventListener('click', () => {
                total += 1;
            });

            closeModule(title);

            clearInterval(interval);
            clearTimeout(timeout);
        }, time)
    };
}