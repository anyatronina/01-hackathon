import { Menu } from './core/menu';
import { BackgroundModule } from './modules/background.module';
import { ShapeModule } from './modules/shape.module';
import { ClicksModule } from './modules/clicks.module';
import { TimerModule } from './modules/timer.module';
import { SoundModule } from './modules/sound.module';
import { MessageModule } from './modules/message.module';


export class ContextMenu extends Menu {
	constructor(selector) {
		super(selector);

		this.backgroundModule = new BackgroundModule('backgroundModule', 'Поменять цвет');
		this.shapeModule = new ShapeModule('shapeModule', 'Создать фигуру');
		this.clicksModule = new ClicksModule('clicksModule', 'Считать клики за 3 секунды');
		this.timerModule = new TimerModule('timerModule', 'Включить таймер');
		this.soundModule = new SoundModule('soundModule', 'Проверить звук');
		this.messageModule = new MessageModule('messageModule', 'Отправить сообщение');
	}

	open() {
		this.add();
		const isModulesInMenu = (this.el.children.length);

		document.body.addEventListener('contextmenu', (event) => {
			event.preventDefault();

			if (!isModulesInMenu) return;

			this.el.style.top = `${event.clientY}px`;
			this.el.style.left = `${event.clientX}px`;

			this.el.classList.add('open');
		})


		this.el.addEventListener('click', (event) => {
			const calledModule = event.target.dataset.type;

			const isBackgroundModule = (calledModule === 'backgroundModule');
			const isShapeModule = (calledModule === 'shapeModule');
			const isClicksModule = (calledModule === 'clicksModule');
			const isTimerModule = (calledModule === 'timerModule');
			const isSoundModule = (calledModule === 'soundModule');
			const isMessageModule = (calledModule === 'messageModule');

			if (isBackgroundModule) this.backgroundModule.trigger();
			if (isShapeModule) this.shapeModule.trigger();
			if (isClicksModule) this.clicksModule.trigger();
			if (isTimerModule) this.timerModule.trigger();
			if (isSoundModule) this.soundModule.trigger();
			if (isMessageModule) this.messageModule.trigger();

			this.close();
		})
	}

	close() {
		this.el.classList.remove('open');
	}

	add() {
		const backgroundMenu = this.backgroundModule.toHTML();
		this.el.insertAdjacentHTML('beforeend', backgroundMenu);

		const shapeMenu = this.shapeModule.toHTML();
		this.el.insertAdjacentHTML('beforeend', shapeMenu);

		const clicksMenu = this.clicksModule.toHTML();
		this.el.insertAdjacentHTML('beforeend', clicksMenu);

		const timerMenu = this.timerModule.toHTML();
		this.el.insertAdjacentHTML('beforeend', timerMenu);

		const soundMenu = this.soundModule.toHTML();
		this.el.insertAdjacentHTML('beforeend', soundMenu);

		const messageMenu = this.messageModule.toHTML();
		this.el.insertAdjacentHTML('beforeend', messageMenu);
	}

}