import { Module } from '../core/module'

export class TimerModule extends Module {
    trigger() {
        if (document.querySelector('.container-timer')) {return {}};

        const container = document.createElement('div');
        container.className = 'container-timer';
        container.classList.add('toast')
        container.innerHTML = `
        <div class="container-timer__form">
        <input type="text">
        <button>Запустить таймер</button>
        </div>
        <div id="timer"></div>
        `
        document.body.append(container);

        let started = false;

        function start(count) {
            if (started) { return };
            started = true;
            const startTime = new Date();
            const stopTime = startTime.setSeconds(startTime.getSeconds() + count);
            document.getElementById("timer").innerHTML = `${Math.trunc(count / 60)}:${count % 60}`;

            const countDown = setInterval(() => {
                const now = new Date().getTime();
                const remain = stopTime - now;
                let min = Math.floor(remain / (1000 * 60));
                let sec = Math.floor((remain % (1000 * 60)) / 1000);
                sec = sec < 10 ? "0" + sec : sec;
                document.getElementById("timer").innerHTML = `${min}:${sec}`;

                if (remain <= 0) {
                    clearInterval(countDown);
                    document.getElementById("timer").innerHTML = "Время вышло!";
                    setTimeout(() => {
                        container.classList.add('toast-close');
                    }, 3000);
                    setTimeout(() => {
                        container.remove();
                    }, 3600);
                    started = false;
                }
            }, 0);
        }

        const button = document.querySelector('button');
        button.addEventListener('click', (e) => {
            const input = document.querySelector('input');
            const count = +input.value;
            input.value = '';
            input.disabled = 'true';
            button.disabled = 'true';
            
            start(count);
        })
    }
}



