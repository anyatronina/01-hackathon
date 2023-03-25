import { Module } from '../core/module'

export class TimerModule extends Module {
    trigger() {
        const container = document.createElement('div');
        container.className = 'container-timer';
        container.innerHTML = `
        <input type="text">
        <button>Запустить таймер</button>
        <div id="timer"></div>
        `
        document.body.append(container);

        let started = false;

        function start(count) {
            if (started) { return };
            started = true;
            const startTime = new Date();
            const stopTime = startTime.setSeconds(startTime.getSeconds() + count);
            container.getElementById("timer").innerHTML = `${Math.trunc(count / 60)}:${count % 60}`;

            const countDown = setInterval(() => {
                const now = new Date().getTime();
                const remain = stopTime - now;
                let min = Math.floor(remain / (1000 * 60));
                let sec = Math.floor((remain % (1000 * 60)) / 1000);
                sec = sec < 10 ? "0" + sec : sec;
                container.getElementById("timer").innerHTML = `${min}:${sec}`;

                if (remain <= 0) {
                    clearInterval(countDown);
                    container.getElementById("timer").innerHTML = "Время вышло!";
                    setInterval(() => {
                        container.remove();
                    }, 3000);
                    started = false;
                }
            }, 0);
        }

        const button = container.querySelector('button');
        button.addEventListener('click', (e) => {
            const input = container.querySelector('input');
            const count = +input.value;
            start(count);
        })
    }
}



